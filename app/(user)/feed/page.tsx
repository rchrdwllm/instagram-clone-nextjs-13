import type { Post as PostType } from '@prisma/client';
import type { FeedItem } from '@/types';
import Post from '@/components/Post';
import NoData from '@/components/NoData';
import prisma from '@/lib/prisma';

const fetchImages = async (post: PostType) => {
    const images = await prisma.image.findMany({
        where: {
            publicId: {
                in: post.images,
            },
        },
    });

    return {
        ...post,
        imageItems: images,
    } as FeedItem;
};

const fetchPosts = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    const feedItems = (await Promise.all(
        posts.map(async post => {
            const feedItem = await fetchImages(post);

            return feedItem;
        })
    )) as any;

    return feedItems;
};

const FeedPage = async () => {
    const feedItems: FeedItem[] = await fetchPosts();

    if (!feedItems.length) return <NoData />;

    return (
        <div className="flex items-stretch">
            <div className="flex flex-1 flex-col space-y-8 pt-8 px-72 pb-20 2xl:px-[28rem] xl:px-80 lg:px-56">
                {feedItems.map((feedItem: FeedItem) => (
                    <Post key={feedItem.id} {...feedItem} />
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
