
"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, PartyPopper, Award, UsersRound, FolderGit2, HeartHandshake, Bot, LayoutTemplate, PenTool } from "lucide-react"
import dynamic from 'next/dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestimonialCarousel } from "./TestimonialCarousel"
import { testimonials } from "@/lib/portfolio-data"

const DynamicText = dynamic(() => import('@/components/DynamicText').then(mod => mod.DynamicText), {
  ssr: false,
  loading: () => <>We are a Tech Community.<span className="animate-pulse">|</span></>
})

const StatsCounter = dynamic(() => import('@/components/StatsCounter').then(mod => mod.StatsCounter), {
  ssr: false,
  loading: () => <>0</>
})

export function HomePageContent() {
  const galleryImages = [
    { src: "https://placehold.co/600x400.png", alt: "Students collaborating at a Tech Tribe workshop", hint: "workshop tech" },
    { src: "https://placehold.co/600x400.png", alt: "A team presenting their project at a hackathon", hint: "team collaboration" },
    { src: "https://placehold.co/600x400.png", alt: "Keynote speaker at a Tech Tribe conference", hint: "hackathon event" },
    { src: "https://placehold.co/600x400.png", alt: "Members networking at a community event", hint: "community event" },
    { src: "https://placehold.co/600x400.png", alt: "A university chapter group photo", hint: "team photo" },
    { src: "https://placehold.co/600x400.png", alt: "A focused coding session during a workshop", hint: "coding session" },
  ]

  const services = [
    {
      icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
      title: "Website Development",
      description: "We build modern, responsive, and high-performing websites to establish your online presence.",
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: "Brand & Logo Design",
      description: "Crafting unique logos, banners, and posters that tell your brand's story.",
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Business Automation",
      description: "Streamline your workflow with custom automations tailored to your specific business needs.",
    },
  ]
  
  const featuredProjects = [
    {
      title: "QuantumLeap Website",
      description: "A complete website redesign for a leading AI startup, focusing on a futuristic aesthetic and user engagement.",
      image: { src: "https://placehold.co/600x400.png", hint: "tech website" },
      tags: ["Web Development", "UI/UX", "Next.js"],
    },
    {
      title: "Innovate Corp Branding",
      description: "Developed a new brand identity, including logo, color palette, and marketing materials to reflect their innovative spirit.",
      image: { src: "https://placehold.co/600x400.png", hint: "branding design" },
      tags: ["Branding", "Logo Design"],
    },
  ]

  const communityPillars = [
    {
      icon: <PartyPopper className="h-8 w-8 text-primary" />,
      title: "Global Events",
      description: "From hackathons to workshops, we host events that bring the community together to learn and innovate.",
      href: "/events"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "University Chapters",
      description: "Our university chapters are the heart of our community, led by passionate students on a local level.",
      href: "/chapters"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Industry Sponsors",
      description: "We partner with leading companies to create unique opportunities and experiences for our members.",
      href: "/sponsors"
    }
  ]

  const stats = [
    {
      icon: <UsersRound className="h-10 w-10 text-primary" />,
      value: 1500,
      label: "Active Members",
      suffix: "+",
    },
    {
      icon: <FolderGit2 className="h-10 w-10 text-primary" />,
      value: 50,
      label: "Projects Completed",
      suffix: "+",
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary" />,
      value: 20,
      label: "Community Partners",
      suffix: "+",
    }
  ]


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-theme(height.14))] flex items-center py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
             <DynamicText />
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a collective of developers, designers, and strategists from the Tech Tribe community, dedicated to building exceptional digital solutions and fostering the next generation of tech talent.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button asChild size="lg" className="text-lg py-6 px-8 w-full sm:w-auto">
              <Link href="/contact?subject=schedule_call">Schedule a Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg py-6 px-8 w-full sm:w-auto">
              <Link href="#community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Our Impact in Numbers</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We're proud of the community we've built and the work we've delivered. Our strength lies in our numbers and our shared passion.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center p-6">
                <div className="flex flex-col items-center gap-4">
                  {stat.icon}
                   <div className="text-5xl font-bold font-headline text-primary">
                    <StatsCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Our Community in Action</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A glimpse into our vibrant events, workshops, and collaborative moments that define the Tech Tribe spirit.
            </p>
          </div>
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    priority={index < 3}
                    data-ai-hint={image.hint}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">
              Freelance Agency Services
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From stunning websites to powerful automations, we bring your vision to life with skill, passion, and creativity sourced from our talented community.
            </p>
          </div>
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
           <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/services">
                Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section id="featured-work" className="py-16">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Featured Projects</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A glimpse into the quality and creativity we bring to our clients, turning ambitious ideas into reality.
            </p>
          </div>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((item) => (
                <Card key={item.title} className="overflow-hidden group">
                  <Link href={`/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardHeader className="p-0">
                      <div className="overflow-hidden rounded-t-lg">
                        <Image
                          src={item.image.src}
                          alt={item.title}
                          width={600}
                          height={400}
                          priority
                          data-ai-hint={item.image.hint}
                          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl font-headline mt-4">{item.title}</CardTitle>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
           <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/portfolio">
                View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center font-headline">
            What Our Clients Say
          </h2>
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-16">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">
              Join Our Thriving Community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Connect, learn, and grow with a network of passionate tech enthusiasts. Become part of something bigger.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {communityPillars.map((pillar) => (
              <Card key={pillar.title} className="text-center transition-transform transform hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {pillar.icon}
                  </div>
                  <CardTitle className="mt-4">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pillar.description}</p>
                  <Button variant="link" asChild className="mt-4">
                    <Link href={pillar.href}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Sponsor CTA */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline">
            Become a Sponsor
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Connect with emerging tech talent and showcase your brand to our vibrant community. Partner with us to inspire the next wave of innovation and gain visibility.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/sponsors">
                Sponsorship Opportunities <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
