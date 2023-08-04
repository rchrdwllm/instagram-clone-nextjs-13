'use client';

import type { FormEvent } from 'react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { commentPost } from '@/lib/postActions';

const CommentForm = ({ id }: { id: string }) => {
    const [comment, setComment] = useState('');
    const router = useRouter();

    const handleComment = async (e: FormEvent) => {
        e.preventDefault();

        await commentPost(id, comment);

        router.refresh();
    };

    return (
        <form className="mt-4" onSubmit={handleComment}>
            <Input
                placeholder="Add a comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
        </form>
    );
};

export default CommentForm;
