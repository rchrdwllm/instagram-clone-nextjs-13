'use client';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { deletePost } from '@/lib/postActions';
import { useRouter } from 'next/navigation';

const PostActions = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        await deletePost(id);

        router.refresh();
    };

    return (
        <Dialog>
            <Popover>
                <PopoverTrigger>
                    <Button variant="ghost" className="px-3">
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col space-y-1">
                        <Button variant="ghost" className="block text-left">
                            Edit post
                        </Button>
                        <DialogTrigger className="block w-full">
                            <Button variant="ghost" className="block w-full text-left">
                                Delete post
                            </Button>
                        </DialogTrigger>
                    </div>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <DialogTrigger>
                        <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PostActions;
