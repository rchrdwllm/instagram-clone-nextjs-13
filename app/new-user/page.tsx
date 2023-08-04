import type { User } from '@clerk/nextjs/server';
import { getClerkUser, getDbUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const createNewUser = async () => {
    const clerkUser = (await getClerkUser()) as User;
    const existingDbUser = await getDbUser();

    if (existingDbUser) {
        return redirect('/feed');
    }

    await prisma.user.create({
        data: {
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
            imageUrl: clerkUser.imageUrl,
            firstName: clerkUser.firstName || '',
            lastName: clerkUser.lastName || '',
        },
    });

    redirect('/feed');
};

const NewUserPage = async () => {
    await createNewUser();

    return (
        <div className="h-screen flex justify-center items-center">
            <p>Loading...</p>
        </div>
    );
};

export default NewUserPage;
