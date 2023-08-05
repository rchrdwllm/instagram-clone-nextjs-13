'use client';

import type { FormEvent } from 'react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import { commentPost } from '@/lib/postActions';

const CommentForm = ({ id }: { id: string }) => {
    const [comment, setComment] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleComment = async (e: FormEvent) => {
        e.preventDefault();

        toast({
            title: 'Commenting on post',
            description: 'Please wait while we comment on the post.',
        });

        await commentPost(id, comment);

        router.refresh();

        toast({
            title: 'Commented on post',
            description: 'You have successfully commented on the post.',
        });

        setComment('');
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
