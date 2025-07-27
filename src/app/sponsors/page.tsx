import type { Metadata } from "next"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BrainCircuit, Handshake, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Become a Sponsor | Tech Tribe",
  description: "Partner with Tech Tribe to inspire the next generation of innovators, connect with exceptional tech talent, and showcase your brand to our community.",
}

const benefits = [
    {
        icon: <BadgeCheck className="w-8 h-8 text-primary" />,
        title: "Brand Exposure",
        description: "Showcase your brand to hundreds of talented and passionate developers, designers, and future tech leaders."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Recruitment Opportunities",
        description: "Connect with top-tier student talent. Find your next intern or full-time hire at our events."
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-primary" />,
        title: "Drive Innovation",
        description: "Position your company at the forefront of technology by supporting challenges that tackle real-world problems."
    },
    {
        icon: <Handshake className="w-8 h-8 text-primary" />,
        title: "Community Engagement",
        description: "Demonstrate your commitment to the tech ecosystem and give back to the community."
    }
]

const pastSponsors = [
  { name: "Innovate Corp", logo: "https://placehold.co/150x80.png", hint: "company logo" },
  { name: "Tech Solutions Ltd.", logo: "https://placehold.co/150x80.png", hint: "corporate logo" },
  { name: "Future Systems", logo: "https://placehold.co/150x80.png", hint: "business logo" },
  { name: "QuantumLeap", logo: "https://placehold.co/150x80.png", hint: "tech logo" },
]

export default function SponsorsPage() {
    return (
        <div className="container mx-auto py-12 md:py-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
                    Become a Sponsor
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Partner with Tech Tribe to inspire the next generation of innovators and connect with exceptional tech talent.
                </p>
            </div>

            <section id="benefits" className="mt-20">
                <h2 className="text-3xl font-bold text-center font-headline">
                    Why Sponsor Us?
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <Card key={benefit.title} className="text-center">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            {benefit.icon}
                            </div>
                            <CardTitle className="mt-4 font-headline">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            
            <section id="past-sponsors" className="mt-20">
                <h2 className="text-3xl font-bold text-center font-headline">
                Trusted by Industry Leaders
                </h2>
                <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 items-center">
                    {pastSponsors.map((sponsor) => (
                        <div key={sponsor.name} className="flex justify-center">
                        <Image
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            width={150}
                            height={80}
                            data-ai-hint={sponsor.hint}
                            className="object-contain grayscale hover:grayscale-0 transition-all"
                        />
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact-sponsorship" className="mt-20 text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-3xl font-bold font-headline">Ready to Make an Impact?</h2>
                <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                    We offer various sponsorship packages and are happy to create custom opportunities to meet your goals. Let's connect.
                </p>
                <div className="mt-6">
                    <Button size="lg" asChild>
                        <Link href="/contact?subject=sponsorship">
                            Contact our Sponsorship Team
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
