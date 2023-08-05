import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import UserPosts from '@/components/UserPosts';
import { getUserById } from '@/lib/auth';
import prisma from '@/lib/prisma';

type UserPageProps = {
    params: {
        id: string;
    };
};

const getAllUserPosts = async (userId: string) => {
    const res = await prisma.post.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return res;
};

const getPostImagePreview = async (publicId: string) => {
    const res = await prisma.image.findMany({
        where: {
            publicId,
        },
    });

    return res[0];
};

const UserPage = async ({ params: { id } }: UserPageProps) => {
    const user = await getUserById(id);
    const userPosts = await getAllUserPosts(id);
    const postsImgPreview = await Promise.all(
        userPosts.map(async post => getPostImagePreview(post.images[0]))
    );
    const posts = userPosts.map((post, index) => ({
        ...post,
        image: postsImgPreview[index].secureUrl,
    }));

    return (
        <div className="pt-8 px-72 pb-20">
            <header className="flex items-center space-x-8">
                <Avatar className="h-[140px] w-[140px]">
                    <AvatarImage src={user.imageUrl} />
                </Avatar>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-slate-400">{user.email}</p>
                    </div>
                    <p className="text-sm text-slate-400">
                        <span className="font-medium text-slate-50">{posts.length}</span>{' '}
                        {posts.length > 1 ? 'posts' : 'post'}
                    </p>
                </div>
            </header>
            <Separator className="my-8" />
            <UserPosts posts={posts} />
        </div>
    );
};

export default UserPage;
