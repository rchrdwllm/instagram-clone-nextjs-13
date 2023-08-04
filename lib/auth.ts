import type { User } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs';
import prisma from './prisma';

export const getClerkUser = async () => {
    const user = await currentUser();

    return user;
};

export const getDbUser = async () => {
    const { userId } = auth() as { userId: string };
    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
    });

    return dbUser as User;
};

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return user as User;
};
