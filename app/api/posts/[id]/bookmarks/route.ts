import { NextResponse, type NextRequest } from 'next/server';
import type { RequestParams } from '@/types';
import { getDbUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const POST = async (_: NextRequest, { params }: { params: RequestParams }) => {
    const { id } = params;
    const user = await getDbUser();
    const existingBookmark = await prisma.bookmark.findUnique({
        where: {
            userId_postId: {
                userId: user.id,
                postId: id,
            },
        },
    });

    if (existingBookmark) {
        const res = await prisma.bookmark.delete({
            where: {
                id: existingBookmark.id,
            },
        });

        return NextResponse.json({ data: res });
    }

    const res = await prisma.bookmark.create({
        data: {
            userId: user.id,
            postId: id,
        },
    });

    return NextResponse.json({ data: res });
};
