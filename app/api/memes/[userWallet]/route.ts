import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest,
  { params }: { params: { userWallet: string } }
) {
  try {
    const { userWallet } = params;
    if (!userWallet) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const userWithMemes = await prisma.user.findUnique({
      where: {
        userWallet,
      },
      include: {
        memes: true,
      },
    });

    if (!userWithMemes) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userWithMemes, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userWallet, hasMinted } = body;

    if (!userWallet) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const updatedMemes =
      await prisma.user.findUnique({
        where: { userWallet },
        include: { memes: true },
      }).then(async (user) => {
        await prisma.meme.updateMany({
          where: { userWallet: user?.userWallet },
          data: { minted: hasMinted },
        });
      }).catch((error) => {
        return NextResponse.json({ message: 'User not found', error }, { status: 404 });
      })

    return NextResponse.json({ success: true, updatedMemes }, { status: 200 });
  } catch (error) {
    console.error('Error updating memes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
