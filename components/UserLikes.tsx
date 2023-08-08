'use client';

import type { Like, Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import NoPosts from './NoPosts';
import { useRef, useState, useEffect, useMemo } from 'react';

const UserLikes = ({ likes }: { likes: (Like & { post: Post })[] }) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(likes);
    }, [likes]);

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth - 32;

            setContainerWidth(width);
        }
    }, []);

    if (!likes.length)
        return (
            <div className="mt-12">
                <NoPosts />
            </div>
        );

    return (
        <div ref={containerRef} className="mt-8 grid grid-cols-3 gap-4">
            {likes.map(like => (
                <Link key={like.id} href={`/post/${like.postId}`}>
                    <div
                        className="relative"
                        style={{
                            width: containerWidth / 3,
                            height: containerWidth / 3,
                        }}
                    >
                        <Image
                            src={(like as any).image}
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

export default UserLikes;
