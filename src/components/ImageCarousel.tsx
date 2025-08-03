
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ImageInfo = {
    src: string
    alt: string
    hint: string
}

interface ImageCarouselProps {
    images: ImageInfo[]
    className?: string
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000); // Change image every 1 second

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className={cn("relative w-full h-[250px] overflow-hidden rounded-lg", className)}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    data-ai-hint={image.hint}
                    className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                    priority={index === 0} // Prioritize loading the first image
                />
            ))}
        </div>
    )
}
