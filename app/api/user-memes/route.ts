import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const userMemes = await prisma.userMemes.findMany();
        return NextResponse.json(userMemes);
    } catch (error) {
        console.error("Error fetching user memes:", error);
        return NextResponse.json({ error: "Failed to fetch user memes" }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data = await request.json();
        const userMeme = await prisma.userMemes.create({ data });
        return NextResponse.json(userMeme, { status: 201 });
    } catch (error) {
        console.error("Error creating user meme:", error);
        return NextResponse.json({ error: "Failed to create user meme" }, { status: 500 });
    }
}