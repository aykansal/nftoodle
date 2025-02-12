import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { userWallet } = await req.json();

        if (!userWallet) {
            return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                userWallet
            },
        });

        if (existingUser) {
            return NextResponse.json({
                user: existingUser,
                isNewUser: false,
                userExists: true,
            });
        }

        // Create new user if doesn't exist
        const user = await prisma.user.create({
            data: {
                userWallet,
                username: `${userWallet.substring(0, 4)}...${userWallet.substring(userWallet.length - 4)}`,
            },
        });

        return NextResponse.json({
            user,
            isNewUser: true,
            userExists: true,
        });
    } catch (error) {
        console.error('Error in profile API:', error);
        return NextResponse.json({
            error: 'Server error'
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const address = searchParams.get('address');

        if (!address) {
            return NextResponse.json({ error: 'Address is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                userWallet: address,
            },
            include: {
                memes: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}