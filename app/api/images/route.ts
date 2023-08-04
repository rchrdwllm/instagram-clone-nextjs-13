import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
    const { uploadedImgs } = await req.json();

    await prisma.image.createMany({
        data: uploadedImgs.map((img: any) => ({
            publicId: img.public_id,
            secureUrl: img.secure_url,
        })),
    });

    return NextResponse.json({ data: uploadedImgs });
};

export const DELETE = async (req: NextRequest) => {
    const { publicIds } = await req.json();

    const res = await prisma.image.deleteMany({
        where: {
            publicId: {
                in: publicIds,
            },
        },
    });

    return NextResponse.json({ data: res });
};
