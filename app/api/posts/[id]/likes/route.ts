import type { RequestParams } from '@/types';
import { NextResponse, type NextRequest } from 'next/server';
import { getDbUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const POST = async (_: NextRequest, { params }: { params: RequestParams }) => {
    const { id } = params;
    const user = await getDbUser();
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: user.id,
                postId: id,
            },
        },
    });

    if (existingLike) {
        const res = await prisma.like.delete({
            where: {
                id: existingLike.id,
            },
        });

        return NextResponse.json({ data: res });
    }

    const res = await prisma.like.create({
        data: {
            userId: user.id,
            postId: id,
        },
    });

    return NextResponse.json({ data: res });
};
