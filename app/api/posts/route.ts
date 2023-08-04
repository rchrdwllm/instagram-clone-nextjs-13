import { type NextRequest, NextResponse } from 'next/server';
import type { RequestParams } from '@/types';
import prisma from '@/lib/prisma';
import { getDbUser } from '@/lib/auth';

export const POST = async (req: NextRequest) => {
    const user = await getDbUser();
    const { imgs, caption }: { imgs: string[]; caption: string } = await req.json();
    const post = await prisma.post.create({
        data: {
            images: imgs,
            caption,
            userId: user.id,
        },
    });

    return NextResponse.json({ data: post });
};
