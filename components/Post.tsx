import type { FeedItem } from '@/types';
import type { Comment } from '@prisma/client';
import { Avatar, AvatarImage } from './ui/avatar';
import { Card, CardHeader, CardContent } from './ui/card';
import PostActions from './PostActions';
import PostControls from './PostControls';
import PostImages from './PostImages';
import PostComments from './PostComments';
import CommentForm from './CommentForm';
import Link from 'next/link';
import { getUserById, getDbUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const getPostDetails = async (id: string) => {
    const res = await prisma.post.findUnique({
        where: {
            id,
        },
        select: {
            likes: true,
            bookmarks: true,
            comments: true,
        },
    });

    return [
        res!.likes.map(like => like.userId),
        res!.bookmarks.map(bookmark => bookmark.userId),
        res!.comments,
    ];
};

const Post = async ({ imageItems, caption, id, userId }: FeedItem) => {
    const user = await getUserById(userId);
    const dbUser = await getDbUser();
    const isAuthor = user.id === dbUser.id;
    const [likes, bookmarks, comments] = (await getPostDetails(id)) as [
        string[],
        string[],
        Comment[]
    ];

    return (
        <Card>
            <CardHeader>
                <header className="flex items-center justify-between">
                    <Link href={`/user/${user.id}`}>
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={user.imageUrl} />
                            </Avatar>
                            <p className="font-medium text-sm">{user.firstName}</p>
                        </div>
                    </Link>
                    {isAuthor && <PostActions id={id} caption={caption} />}
                </header>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                <div className="relative overflow-hidden rounded-lg">
                    <PostImages images={imageItems} />
                </div>
                <PostControls likes={likes} bookmarks={bookmarks} id={id} userId={dbUser.id} />
                {caption && (
                    <p className="text-slate-400 text-sm">
                        <span className="font-medium text-slate-50">{user.firstName}</span>{' '}
                        {caption}
                    </p>
                )}
                <PostComments comments={comments} />
                <CommentForm id={id} />
            </CardContent>
        </Card>
    );
};

export default Post;
