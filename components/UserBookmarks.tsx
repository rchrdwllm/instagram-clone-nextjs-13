'use client';

import type { Bookmark, Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import NoPosts from './NoPosts';
import { useRef, useState, useEffect } from 'react';

const UserBookmarks = ({ bookmarks }: { bookmarks: (Bookmark & { post: Post })[] }) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(bookmarks);
    }, [bookmarks]);

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth - 32;

            setContainerWidth(width);
        }
    }, []);

    if (!bookmarks.length)
        return (
            <div className="mt-12">
                <NoPosts />
            </div>
        );

    return (
        <div ref={containerRef} className="mt-8 grid grid-cols-3 gap-4">
            {bookmarks.map(bookmark => (
                <Link key={bookmark.id} href={`/post/${bookmark.postId}`}>
                    <div
                        className="relative"
                        style={{
                            width: containerWidth / 3,
                            height: containerWidth / 3,
                        }}
                    >
                        <Image
                            src={(bookmark as any).image}
                            className="rounded-lg"
                            alt="preview"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default UserBookmarks;
