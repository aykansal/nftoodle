// app/api/profile/route.ts

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("profile route");

}
