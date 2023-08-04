import { type NextRequest, NextResponse } from 'next/server';
import type { RequestParams } from '@/types';
import prisma from '@/lib/prisma';
import { getDbUser } from '@/lib/auth';

export const POST = async (req: NextRequest, { params }: { params: RequestParams }) => {
    const { comment } = await req.json();
    const { id } = params;
    const user = await getDbUser();

    const res = await prisma.comment.create({
        data: {
            content: comment,
            postId: id,
            userId: user.id,
        },
    });

    return NextResponse.json({ data: res });
};
