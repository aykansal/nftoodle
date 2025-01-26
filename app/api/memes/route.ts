import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
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
    if (!imageDataUrl || !imageDataUrl.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid or empty imageDataUrl");
    }

    const uniquePublicId = `nftoodle_${Date.now()}`;
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: uniquePublicId,
          folder: "nftoodle",
          format: "png",
          transformation: {
            quality: "auto",
            fetch_format: "auto",
          },
          context: { accountAddress },
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const buffer = Buffer.from(imageDataUrl.split(",")[1], "base64");
      uploadStream.end(buffer);
    });

    return result as { url: string }; // Adjusted type to ensure compatibility
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    throw new Error("Failed to upload image to Cloudinary");
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
    const { imageDataUrl, accountAddress } = await req.json();

    // Validate inputs
    if (!imageDataUrl || !accountAddress) {
      return NextResponse.json(
        { error: "Invalid input: imageDataUrl or accountAddress missing" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const { url: cloudinaryUrl } = await uploadToCloudinary({ imageDataUrl, accountAddress });

    // Save meme in the database
    const meme = await addMemeToDatabase({ cloudinaryUrl, accountAddress });

    return NextResponse.json(meme, { status: 201 });
  } catch (error) {
    console.error("Error in POST handler", error);
    //@ts-expect-error ignore
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

// GET Handler: Fetch all memes
export async function GET() {
  try {
    const memes = await prisma.meme.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(memes, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler", error);
    //@ts-expect-error ignore
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
