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
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Textarea } from './ui/textarea';
import { deletePost, updatePost } from '@/lib/postActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const PostActions = ({ id, caption }: { id: string; caption: string }) => {
    const [currentCaption, setCurrentCaption] = useState(caption);
    const router = useRouter();
    const { toast } = useToast();

    const handleDelete = async () => {
        toast({
            title: 'Deleting post',
            description: 'Your post is being deleted.',
        });

        await deletePost(id);

        router.refresh();

        toast({
            title: 'Post deleted',
            description: 'Your post has been deleted.',
        });
    };

    const handleUpdate = async () => {
        toast({
            title: 'Updating post',
            description: 'Your post is being updated.',
        });

        await updatePost(id, currentCaption);

        router.refresh();

        toast({
            title: 'Post updated',
            description: 'Your post has been updated.',
        });
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" className="px-3">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col space-y-1">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="block text-left">
                                Edit post
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit post</SheetTitle>
                                <SheetDescription>
                                    Make changes to your post here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <form className="mt-4">
                                <Textarea
                                    placeholder="Write your post caption..."
                                    value={currentCaption}
                                    onChange={e => setCurrentCaption(e.target.value)}
                                />
                            </form>
                            <SheetFooter className="mt-4">
                                <SheetClose asChild>
                                    <Button onClick={handleUpdate}>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    <Dialog>
                        <DialogTrigger className="block w-full">
                            <Button variant="ghost" className="block w-full text-left">
                                Delete post
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete this post?
                                </DialogTitle>
                                <DialogDescription>This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end space-x-2">
                                <DialogTrigger>
                                    <Button variant="outline">Cancel</Button>
                                </DialogTrigger>
                                <DialogTrigger>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </DialogTrigger>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PostActions;
