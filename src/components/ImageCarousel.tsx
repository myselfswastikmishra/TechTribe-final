
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

const SLIDE_INTERVAL = 3000; // 3 seconds

const getImagesPerSlide = () => {
    if (typeof window === 'undefined') {
        return 3; // Default for server-side rendering
    }
    if (window.innerWidth < 640) {
        return 1; // Mobile
    }
    if (window.innerWidth < 1024) {
        return 2; // Tablet
    }
    return 3; // Desktop
};


export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesPerSlide, setImagesPerSlide] = useState(getImagesPerSlide());

     useEffect(() => {
        const handleResize = () => {
            setImagesPerSlide(getImagesPerSlide());
        };

        window.addEventListener('resize', handleResize);
        // Set initial value
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slides = useMemo(() => {
        const result = [];
        if (imagesPerSlide === 0) return [];
        for (let i = 0; i < images.length; i += imagesPerSlide) {
            result.push(images.slice(i, i + imagesPerSlide));
        }
        return result;
    }, [images, imagesPerSlide]);

    useEffect(() => {
        if (slides.length <= 1) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    const gridClasses: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
    }


    return (
        <div className={cn("relative w-full h-[250px] overflow-hidden", className)}>
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className={cn("flex-shrink-0 w-full h-full grid gap-4", gridClasses[imagesPerSlide] || 'grid-cols-3')}>
                        {slide.map((image, imageIndex) => (
                             <div key={imageIndex} className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    data-ai-hint={image.hint}
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
