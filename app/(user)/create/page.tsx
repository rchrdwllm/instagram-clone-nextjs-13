'use client';

import type { ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { submitPost } from '@/lib/postActions';

const Create = () => {
    const [caption, setCaption] = useState<string>('');
    const [imgs, setImgs] = useState<File[] | null>();
    const [previews, setPreviews] = useState<string[]>([]);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;

        if (!selected) return;

        const selectedFiles = Array.from(selected);
        const previews = selectedFiles.map(file => URL.createObjectURL(file));

        setImgs(selectedFiles);
        setPreviews(previews);
    };

    const handleSubmit = async () => {
        if (imgs) {
            toast({
                title: 'Uploading post',
                description: 'Please wait while we upload your post',
            });

            await submitPost(imgs, caption);

            router.refresh();
            router.push('/feed');

            toast({
                title: 'Post uploaded',
                description: 'Your post has been uploaded',
            });
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.clientWidth - 608;

            setContainerWidth(width);
        }
    }, []);

    return (
        <div ref={containerRef} className="pt-8 px-72 pb-20">
            <h1 className="text-3xl font-bold">Create a post</h1>
            <form action="" className="mt-8">
                <div>
                    <p className="text-slate-400">Write a caption for your post</p>
                    <Textarea
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        className="mt-2"
                        id="caption"
                        placeholder="Caption"
                    />
                </div>
                <div className="mt-8">
                    <p className="text-slate-400">Select images</p>
                    <Input
                        onChange={handleChange}
                        type="file"
                        id="images"
                        className="mt-2"
                        multiple
                    />
                </div>
            </form>
            {previews.length ? (
                <div className="mt-8 grid grid-cols-3 gap-4">
                    {previews.map(preview => (
                        <div
                            key={preview}
                            className="relative"
                            style={{
                                width: containerWidth / 3,
                                height: containerWidth / 3,
                            }}
                        >
                            <Image
                                src={preview}
                                className="rounded-lg"
                                alt="preview"
                                fill
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="mt-8 flex space-x-4">
                <Button variant="secondary" className="block w-full" onClick={() => router.back()}>
                    Back
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={imgs ? false : true}
                    className="block w-full"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Create;
