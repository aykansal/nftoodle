import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Create Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 saves per hour
});

// Helper function: Upload image to Cloudinary
const uploadToCloudinary = async ({
  imageDataUrl,
  accountAddress,
}: {
  imageDataUrl: string;
  accountAddress: string;
}) => {
  try {
    // Validate Base64 image format
    if (!imageDataUrl || !imageDataUrl.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid or empty imageDataUrl');
    }

    const uniquePublicId = `nftoodle_${Date.now()}`;
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: uniquePublicId,
          folder: 'nftoodle',
          format: 'png',
          transformation: {
            quality: 'auto',
            fetch_format: 'auto',
          },
          context: { accountAddress },
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const buffer = Buffer.from(imageDataUrl.split(',')[1], 'base64');
      uploadStream.end(buffer);
    });

    return result as { url: string }; // Adjusted type to ensure compatibility
  } catch (error) {
    console.error('Cloudinary upload failed', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

// Helper function: Add meme to the database
const addMemeToDatabase = async ({
  cloudinaryUrl,
  accountAddress,
}: {
  cloudinaryUrl: string;
  accountAddress: string;
}) => {
  // Ensure the user exists before linking
  const user = await prisma.user.upsert({
    where: { userWallet: accountAddress },
    create: { userWallet: accountAddress },
    update: {}, // Do nothing if user exists
  });

  const meme = await prisma.meme.create({
    data: {
      cloudinaryUrl,
      userAddress: user.userWallet,
    },
  });

  return meme;
};

// POST Handler: Upload image and add meme
export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl, accountAddress, originalImage } = await req.json();

    // Validate inputs
    if (!imageDataUrl || !accountAddress) {
      return NextResponse.json(
        { error: 'Invalid input: imageDataUrl or accountAddress missing' },
        { status: 400 }
      );
    }

    // Check rate limit
    const identifier = accountAddress;
    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds.`,
          remaining,
          resetIn: reset - Date.now()
        },
        { status: 429 }
      );
    }

    // Check for duplicate memes from this user with the same original image
    const existingMeme = await prisma.meme.findFirst({
      where: {
        userAddress: accountAddress,
        originalImage: originalImage,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Within last 24 hours
        }
      }
    });

    if (existingMeme) {
      return NextResponse.json(
        { error: 'You have already created a meme from this image recently' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const { url: cloudinaryUrl } = await uploadToCloudinary({
      imageDataUrl,
      accountAddress,
    });

    // Save meme in the database
    const meme = await prisma.meme.create({
      data: {
        cloudinaryUrl,
        userAddress: accountAddress,
        originalImage, // Store original image URL
        createdAt: new Date(),
      },
    });

    return NextResponse.json(meme, { status: 201 });
  } catch (error) {
    console.error('Error in POST handler', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET Handler: Fetch memes with pagination
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.meme.count();

    // Fetch memes with pagination
    const memes = await prisma.meme.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        User: true
      }
    });

    // Transform the data
    const transformedMemes = memes.map(meme => ({
      id: meme.id,
      imageUrl: meme.cloudinaryUrl,
      creator: meme.User?.userWallet.substring(0, 6) + '...' + meme.User?.userWallet.substring(meme.User?.userWallet.length - 6),
      createdAt: meme.createdAt
    }));

    return NextResponse.json({
      memes: transformedMemes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        hasMore: skip + limit < totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memes' },
      { status: 500 }
    );
  }
}
