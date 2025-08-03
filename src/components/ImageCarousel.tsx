"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Image = {
    src: string
    alt: string
    hint: string
}

interface ImageCarouselProps {
    images: Image[]
    className?: string
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
    // Duplicate the images to create a seamless loop
    const extendedImages = [...images, ...images];

    return (
        <div
            className={cn(
                "w-full overflow-hidden relative",
                "[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
                className
            )}
        >
            <div className="flex animate-scroll-slow hover:[animation-play-state:paused]">
                {extendedImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-[400px] h-[267px] mx-2 overflow-hidden rounded-lg">
                         <Image
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={267}
                            data-ai-hint={image.hint}
                            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
