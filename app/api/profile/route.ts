import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const userWithMemes = await prisma.user.findUnique({
      where: {
        userWallet: address,
      },
      include: {
        memes: true, // Include related memes
      },
    });

    if (!userWithMemes) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userWithMemes, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { address, hasMinted } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    // Find the user first
    const user = await prisma.user.findUnique({
      where: { userWallet: address },
      include: { memes: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updatedMemes = await prisma.meme.updateMany({
      where: { userAddress: address },
      data: { minted: hasMinted },
    });

    return NextResponse.json({ success: true, updatedMemes }, { status: 200 });
  } catch (error) {
    console.error("Error updating memes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
