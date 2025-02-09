import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const nfts = await prisma.nfts.findMany({});
  if(!nfts){
    
  }
  return NextResponse.json({ data: nfts })
}