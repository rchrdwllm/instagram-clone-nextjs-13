import { NextResponse, type NextRequest } from 'next/server';
import type { RequestParams } from '@/types';
import prisma from '@/lib/prisma';

export const DELETE = async (_: NextRequest, { params }: { params: RequestParams }) => {
    const { id } = params;
    const post = await prisma.post.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({ data: post });
};

export const PATCH = async (req: NextRequest, { params }: { params: RequestParams }) => {
    const { caption } = await req.json();
    const { id } = params;

    const updatedPost = await prisma.post.update({
        where: {
            id,
        },
        data: {
            caption,
        },
    });

    return NextResponse.json({ data: updatedPost });
};
