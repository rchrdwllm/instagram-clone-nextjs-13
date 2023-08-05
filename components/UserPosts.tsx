'use client';

import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import NoPosts from './NoPosts';
import { useRef, useState, useEffect } from 'react';

const UserPosts = ({ posts }: { posts: Post[] }) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth - 32;

            setContainerWidth(width);
        }
    }, []);

    if (!posts.length)
        return (
            <div className="mt-12">
                <NoPosts />
            </div>
        );

    return (
        <div ref={containerRef} className="mt-8 grid grid-cols-3 gap-4">
            {posts.map(post => (
                <Link key={post.id} href={`/post/${post.id}`}>
                    <div
                        className="relative"
                        style={{
                            width: containerWidth / 3,
                            height: containerWidth / 3,
                        }}
                    >
                        <Image
                            src={(post as any).image}
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

export default UserPosts;
