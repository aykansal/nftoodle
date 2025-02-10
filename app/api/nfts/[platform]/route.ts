import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Platforms } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const { platform } = params;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '12');

  try {
    // Convert platform string to enum value
    const platformEnum = platform.toLowerCase() as keyof typeof Platforms;

    // Validate platform
    if (!Object.keys(Platforms).includes(platformEnum)) {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    const [total, paginatedUrls] = await Promise.all([
      prisma.nfts.count({
        where: { platform: Platforms[platformEnum] }
      }),
      prisma.nfts.findMany({
        where: { platform: Platforms[platformEnum] },
        select: { sourceUrl: true },
        skip: (page - 1) * limit,
        take: limit,
      })
    ]);

    return NextResponse.json({
      urls: paginatedUrls.map(entry => entry.sourceUrl),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(`Error fetching ${platform} NFTs:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}
