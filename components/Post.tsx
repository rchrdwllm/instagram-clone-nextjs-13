import type { FeedItem } from '@/types';
import { Avatar, AvatarImage } from './ui/avatar';
import { Card, CardHeader, CardContent } from './ui/card';
import PostActions from './PostActions';
import PostControls from './PostControls';
import Image from 'next/image';
import { getDbUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const getLikesBookmarks = async (id: string) => {
    const res = await prisma.post.findUnique({
        where: {
            id,
        },
        select: {
            likes: true,
            bookmarks: true,
        },
    });

    return [res!.likes.map(like => like.userId), res!.bookmarks.map(bookmark => bookmark.userId)];
};

const Post = async ({ imageItems, caption, id }: FeedItem) => {
    const user = await getDbUser();
    const [likes, bookmarks] = await getLikesBookmarks(id);

    return (
        <Card>
            <CardHeader>
                <header className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src={user.imageUrl} />
                        </Avatar>
                        <p className="font-medium text-sm">{user.firstName}</p>
                    </div>
                    <PostActions id={id} />
                </header>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                    <Image
                        src={imageItems[0].secureUrl}
                        alt="image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                </div>
                <PostControls likes={likes} bookmarks={bookmarks} id={id} userId={user.id} />
                {caption && (
                    <p className="text-slate-400 text-sm">
                        <span className="font-medium text-slate-50">{user.firstName}</span>{' '}
                        {caption}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default Post;
