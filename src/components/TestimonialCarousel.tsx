
"use client"

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Testimonial = {
    name: string
    title: string
    avatar: string
    testimonial: string
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[]
    className?: string
}

export const TestimonialCarousel = ({ testimonials, className }: TestimonialCarouselProps) => {
    // Duplicate the testimonials to create a seamless loop
    const extendedTestimonials = [...testimonials, ...testimonials];

    return (
        <div
            className={cn(
                "w-full overflow-hidden relative",
                "[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
                className
            )}
        >
            <div className="flex animate-scroll hover:[animation-play-state:paused]">
                {extendedTestimonials.map((t, index) => (
                    <Card key={index} className="flex-shrink-0 w-[350px] md:w-[450px] mx-4 flex flex-col">
                        <CardContent className="p-6 flex-grow">
                            <blockquote className="text-lg text-muted-foreground">"{t.testimonial}"</blockquote>
                        </CardContent>
                        <CardFooter className="items-center gap-4">
                            <Avatar>
                                <AvatarImage src={t.avatar} alt={t.name} />
                                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{t.name}</p>
                                <p className="text-sm text-muted-foreground">{t.title}</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
