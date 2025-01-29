// app/api/profile/route.ts

import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const userWithMemes = await prisma.user.findUnique({
      where: {
        userWallet: address,
      },
      include: {
        memes: true // Include the related memes
      }
    });

    if (!userWithMemes) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userWithMemes, { status: 200 });
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
