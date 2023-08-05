'use client';

import { HeartIcon, ChatBubbleLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bookmarkPost, likePost } from '@/lib/postActions';

const PostControls = ({
    likes,
    bookmarks,
    id,
    userId,
}: {
    likes: string[];
    bookmarks: string[];
    id: string;
    userId: string;
}) => {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(likes.includes(userId));
    const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(userId));

    const handleLike = async () => {
        setIsLiked(!isLiked);

        await likePost(id);

        router.refresh();
    };

    const handleBookmark = async () => {
        setIsBookmarked(!isBookmarked);

        await bookmarkPost(id);
    };

    return (
        <div>
            <div className="flex space-x-1">
                <Button
                    onClick={handleLike}
                    variant="ghost"
                    className={`px-3 ${isLiked ? 'bg-muted text-slate-50' : 'text-slate-400'}`}
                >
                    <HeartIcon className="h-4 w-4 text-inherit" />
                </Button>
                <Link href={`/post/${id}`}>
                    <Button variant="ghost" className="px-3 text-slate-400">
                        <ChatBubbleLeftIcon className="h-4 w-4 text-inherit" />
                    </Button>
                </Link>
                <div className="flex flex-1 justify-end">
                    <Button
                        onClick={handleBookmark}
                        variant="ghost"
                        className={`px-3 ${
                            isBookmarked ? 'bg-muted text-slate-50' : 'text-slate-400'
                        }`}
                    >
                        <BookmarkIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {likes.length ? (
                <p className="mt-4 text-sm font-medium text-slate-50">
                    {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                </p>
            ) : null}
        </div>
    );
};

export default PostControls;
