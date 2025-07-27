import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Rocket, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const galleryImages = [
    { src: "https://placehold.co/600x400.png", alt: "Workshop in progress", hint: "workshop tech" },
    { src: "https://placehold.co/600x400.png", alt: "Team members collaborating", hint: "team collaboration" },
    { src: "https://placehold.co/600x400.png", alt: "Hackathon final presentations", hint: "hackathon event" },
    { src: "https://placehold.co/600x400.png", alt: "Community networking event", hint: "community event" },
  ]

  const services = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Business Online Presence",
      description: "We help businesses establish a strong online presence through modern websites and digital strategies.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Custom Automations",
      description: "Streamline your workflow with custom automations tailored to your specific business needs.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Freelance Agency",
      description: "Leverage our community's talent for your projects. We connect you with skilled freelance developers and designers.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl font-headline">
            Where Tech Minds
            <span className="text-primary"> Unite & Innovate</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Tech Tribe is a thriving community for developers, designers, and tech enthusiasts to learn, grow, and build the future together.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/events">Upcoming Events</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/chapters">Join a Chapter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center font-headline">
            Moments from Our Community
          </h2>
          <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
            Glimpses from our hackathons, workshops, and team activities that define our vibrant culture.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  data-ai-hint={image.hint}
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelance Showcase Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center font-headline">
            Innovate with Our Freelance Agency
          </h2>
          <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
            Our community is a powerhouse of talent. We build powerful automations and help businesses thrive online.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="text-center transition-transform transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Chapter CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline">
            Start a Tech Tribe Chapter
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Bring the Tech Tribe community to your university. Lead, inspire, and grow with us. Discover the perks of starting a local chapter.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/chapters">
                Become a Chapter Lead <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
