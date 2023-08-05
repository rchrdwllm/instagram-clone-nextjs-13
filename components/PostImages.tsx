'use client';

import type { Image as ImageType } from '@prisma/client';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PostImages = ({ images, className }: { images: ImageType[]; className?: string }) => {
    const [selectedImg, setSelectedImg] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const calculateDimensions = () => {
        if (containerRef.current && sliderRef.current) {
            const width = containerRef.current.getBoundingClientRect().width;

            return width;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        if (containerRef.current && sliderRef.current) {
            setWidth(calculateDimensions());

            sliderRef.current.style.transform = `translateX(-${selectedImg * width}px)`;
        }
    }, [selectedImg]);

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={containerRef}
            className={`relative overflow-x-hidden rounded-lg ${className}`}
        >
            <AnimatePresence>
                {isHovering && images.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 left-0 h-full w-full z-10 px-2 flex items-center justify-between"
                    >
                        <Button
                            onClick={() => {
                                if (selectedImg > 0) {
                                    setSelectedImg(selectedImg - 1);
                                } else {
                                    setSelectedImg(images.length - 1);
                                }
                            }}
                            className="px-3 rounded-full"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => {
                                if (selectedImg < images.length - 1) {
                                    setSelectedImg(selectedImg + 1);
                                } else {
                                    setSelectedImg(0);
                                }
                            }}
                            className="px-3 rounded-full"
                        >
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                ref={sliderRef}
                className="h-full flex items-stretch"
                style={{
                    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {images.map(img => (
                    <Image
                        key={img.id}
                        src={img.secureUrl}
                        alt="img"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                        }}
                    />
                ))}
                {/* <Image
                    src={images[selectedImg].secureUrl}
                    alt="img"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                /> */}
            </div>
        </div>
    );
};

export default PostImages;
