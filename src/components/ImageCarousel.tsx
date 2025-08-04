
"use client"

import React, { useState, useEffect, useMemo } from 'react'
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

const IMAGES_PER_SLIDE = 3;
const SLIDE_INTERVAL = 3000; // 3 seconds

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = useMemo(() => {
        const result = [];
        for (let i = 0; i < images.length; i += IMAGES_PER_SLIDE) {
            result.push(images.slice(i, i + IMAGES_PER_SLIDE));
        }
        return result;
    }, [images]);

    useEffect(() => {
        if (slides.length <= 1) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [slides.length]);


    return (
        <div className={cn("relative w-full h-[250px] overflow-hidden", className)}>
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className="flex-shrink-0 w-full h-full grid grid-cols-3 gap-4">
                        {slide.map((image, imageIndex) => (
                             <div key={imageIndex} className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    data-ai-hint={image.hint}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={slideIndex === 0}
                                />
                             </div>
                        ))}
                    </div>
                ))}
            </div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            currentIndex === index ? "bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
