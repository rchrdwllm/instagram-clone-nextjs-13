import type { Post, Comment } from '@prisma/client';
import PostImages from '@/components/PostImages';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PostActions from '@/components/PostActions';
import PostControls from '@/components/PostControls';
import PostComments from '@/components/PostComments';
import CommentForm from '@/components/CommentForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import prisma from '@/lib/prisma';
import { getAuthorStatus, getDbUser, getUserById } from '@/lib/auth';

type PostPageProps = {
    params: {
        id: string;
    };
};

const getPost = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            likes: true,
            bookmarks: true,
            comments: true,
        },
    });
    const postImages = await prisma.image.findMany({
        where: {
            publicId: {
                in: (post as Post).images,
            },
        },
    });

    return {
        ...post,
        imageItems: postImages,
    };
};

const PostPage = async ({ params: { id } }: PostPageProps) => {
    const post = await getPost(id);
    const user = await getUserById((post as Post).userId);
    const dbUser = await getDbUser();
    const isAuthor = await getAuthorStatus(user.id);

    return (
        <div className="h-screen flex py-28 px-48 space-x-4">
            <PostImages className="flex-1 h-full rounded-lg" images={post.imageItems} />
            <ScrollArea className="h-full w-[300px] rounded-md border p-4">
                <header className="flex items-center justify-between">
                    <Link href={`/user/${user.id}`}>
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage className="h-12 w-12" src={user.imageUrl} />
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm">{user.firstName}</p>
                                <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                        </div>
                    </Link>
                    {isAuthor && (
                        <PostActions redirectOnDelete id={id} caption={(post as Post).caption} />
                    )}
                </header>
                <Separator className="my-4" />

                <div className={`flex flex-col ${post.caption ? 'mt-4' : ''}`}>
                    <PostControls
                        likes={post.likes?.map(like => like.userId) as string[]}
                        bookmarks={post.bookmarks?.map(bookmark => bookmark.userId) as string[]}
                        id={id}
                        userId={dbUser.id}
                    />
                    {post.caption && (
                        <p className="text-sm text-slate-400 my-2">
                            <span className="font-medium text-slate-50">{user.firstName}</span>{' '}
                            {post.caption}
                        </p>
                    )}
                    <PostComments comments={post.comments as Comment[]} />
                    <CommentForm id={id} />
                </div>
            </ScrollArea>
        </div>
    );
};

export default PostPage;
