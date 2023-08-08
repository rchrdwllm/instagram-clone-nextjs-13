'use client';

import type { Post, Like, Bookmark } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import UserPosts from './UserPosts';
import UserLikes from './UserLikes';
import UserBookmarks from './UserBookmarks';
import { Separator } from './ui/separator';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserTabs = ({
    isAuthor,
    posts,
    likes,
    bookmarks,
}: {
    isAuthor: boolean;
    posts: Post[];
    likes: (Like & { post: Post })[];
    bookmarks: (Bookmark & { post: Post })[];
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [currentTab, setCurrentTab] = useState(tab || 'posts');

    useEffect(() => {
        setCurrentTab(tab || 'posts');
    }, [tab]);

    useEffect(() => {
        router.refresh();
    }, [currentTab]);

    return isAuthor ? (
        <Tabs defaultValue={currentTab || 'posts'} className="mt-4 w-full">
            <TabsList className="w-full">
                <TabsTrigger
                    onClick={() => router.push(pathname + '?tab=posts')}
                    className="w-full"
                    value="posts"
                >
                    Posts
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push(pathname + '?tab=likes')}
                    className="w-full"
                    value="likes"
                >
                    Likes
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push(pathname + '?tab=bookmarks')}
                    className="w-full"
                    value="bookmarks"
                >
                    Bookmarks
                </TabsTrigger>
            </TabsList>
            <Separator className="my-4" />
            <TabsContent value="posts">
                <UserPosts posts={posts} />
            </TabsContent>
            <TabsContent value="likes">
                <UserLikes likes={likes} />
            </TabsContent>
            <TabsContent value="bookmarks">
                <UserBookmarks bookmarks={bookmarks} />
            </TabsContent>
        </Tabs>
    ) : (
        <div>
            <Separator className="mt-8" />
            <UserPosts posts={posts} />
        </div>
    );
};

export default UserTabs;
