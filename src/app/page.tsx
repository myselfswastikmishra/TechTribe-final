import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, PenTool, Rocket, Users, Milestone, PartyPopper, Award, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DynamicText } from "@/components/DynamicText"

// Corrected Discord icon as an inline SVG component
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 15.79 4.43 18.97 7.61 20.39C7.61 20.39 7.61 20.39 7.61 20.39L9.66 18.34C9.43 18.11 9.21 17.87 9 17.61C8.79 17.35 8.58 17.08 8.39 16.79C8.2 16.5 8.03 16.19 7.88 15.87C7.73 15.55 7.61 15.21 7.5 14.87C6.83 13.88 6.5 12.75 6.5 11.5C6.5 8.46 8.96 6 12 6C15.04 6 17.5 8.46 17.5 11.5C17.5 12.75 17.17 13.88 16.5 14.87C16.39 15.21 16.27 15.55 16.12 15.87C15.97 16.19 15.8 16.5 15.61 16.79C15.42 17.08 15.21 17.35 15 17.61C14.79 17.87 14.57 18.11 14.34 18.34L16.39 20.39C19.57 18.97 22 15.79 22 12C22 6.48 17.52 2 12 2Z" />
      <path d="M8.5 14C9.33 14.83 10.5 15.5 12 15.5C13.5 15.5 14.67 14.83 15.5 14" />
      <path d="M9.5 9.5C10.05 9.5 10.5 9.05 10.5 8.5C10.5 7.95 10.05 7.5 9.5 7.5C8.95 7.5 8.5 7.95 8.5 8.5C8.5 9.05 8.95 9.5 9.5 9.5Z" />
      <path d="M14.5 9.5C15.05 9.5 15.5 9.05 15.5 8.5C15.5 7.95 15.05 7.5 14.5 7.5C13.95 7.5 13.5 7.95 13.5 8.5C13.5 9.05 13.95 9.5 14.5 9.5Z" />
    </svg>
  );

export default function Home() {
  const galleryImages = [
    { src: "https://placehold.co/600x400.png", alt: "Workshop in progress", hint: "workshop tech" },
    { src: "https://placehold.co/600x400.png", alt: "Team members collaborating", hint: "team collaboration" },
    { src: "https://placehold.co/600x400.png", alt: "Hackathon final presentations", hint: "hackathon event" },
    { src: "https://placehold.co/600x400.png", alt: "Community networking event", hint: "community event" },
    { src: "https://placehold.co/600x400.png", alt: "Team photo", hint: "team photo" },
    { src: "https://placehold.co/600x400.png", alt: "Coding session", hint: "coding session" },

  ]

  const services = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Website Development",
      description: "We build modern, responsive, and high-performing websites to establish your online presence.",
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: "Brand & Logo Design",
      description: "Crafting unique logos, banners, and posters that tell your brand's story.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Business Automation",
      description: "Streamline your workflow with custom automations tailored to your specific business needs.",
    },
  ]
  
  const featuredProjects = [
    {
      title: "QuantumLeap Website",
      description: "A complete website redesign for a leading AI startup.",
      image: { src: "https://placehold.co/600x400.png", hint: "tech website" },
      tags: ["Web Development", "UI/UX"],
    },
    {
      title: "Innovate Corp Branding",
      description: "Developed a new brand identity, including logo and marketing materials.",
      image: { src: "https://placehold.co/600x400.png", hint: "branding design" },
      tags: ["Logo Design", "Branding"],
    },
  ]

  const testimonials = [
      {
          name: "Jane Doe",
          title: "CEO, Innovate Corp",
          avatar: "https://placehold.co/100x100.png",
          testimonial: "Tech Tribe delivered results that exceeded our expectations. Their professionalism and technical expertise were instrumental in our project's success."
      },
      {
          name: "John Smith",
          title: "CTO, QuantumLeap",
          avatar: "https://placehold.co/100x100.png",
          testimonial: "Working with the Tech Tribe agency was a fantastic experience. They are passionate, skilled, and brought a fresh perspective to our website."
      }
  ]

  const communityPillars = [
    {
      icon: <PartyPopper className="h-8 w-8 text-primary" />,
      title: "Events",
      description: "From hackathons to workshops, we host events that bring the community together to learn and innovate.",
      href: "/events"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Chapters",
      description: "Our university chapters are the heart of our community, led by passionate students.",
      href: "/chapters"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Sponsors",
      description: "We partner with leading companies to create opportunities for our members.",
      href: "/sponsors"
    }
  ]


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl font-headline">
             <DynamicText />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a collective of developers, designers, and strategists from the Tech Tribe community, dedicated to building exceptional digital solutions and fostering the next generation of tech talent.
          </p>
          <div className="mt-8 flex justify-center gap-4">
             <Button asChild size="lg">
              <Link href="/contact?subject=schedule_call">Schedule a Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#join-community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Our Community in Action</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A glimpse into our vibrant events, workshops, and collaborative moments.
            </p>
          </div>
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
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
      <section id="services" className="py-20 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">
              Freelance Agency Services
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From stunning websites to powerful automations, we bring your vision to life with skill and passion.
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
      <section id="featured-work" className="py-20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Featured Projects</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A glimpse into the quality and creativity we bring to our clients.
            </p>
          </div>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((item) => (
                <Card key={item.title} className="overflow-hidden group">
                  <CardHeader className="p-0">
                    <div className="overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        width={600}
                        height={400}
                        data-ai-hint={item.image.hint}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl font-headline">{item.title}</CardTitle>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                     <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
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

       {/* Community CTA Section */}
       <section id="join-community" className="py-20 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-headline">Join our Community</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Connect with fellow tech enthusiasts, share your knowledge, and collaborate on exciting projects.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="#" target="_blank">
                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.31 3.44 16.78L2.06 22L7.32 20.64C8.75 21.41 10.36 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.83 19.05 4.95C17.17 3.08 14.73 2.04 12.04 2.04M12.04 3.67C14.24 3.67 16.31 4.5 17.87 6.06C19.43 7.62 20.28 9.69 20.28 11.88C20.28 16.47 16.65 20.1 12.04 20.1C10.5 20.1 9.04 19.68 7.78 18.96L7.5 18.82L4.42 19.7L5.33 16.71L5.17 16.42C4.34 15.03 3.81 13.47 3.81 11.88C3.81 7.29 7.44 3.67 12.04 3.67M17.27 14.25C17.07 14.74 16.12 15.21 15.5 15.31C15.03 15.36 14.41 15.41 14.11 15.26C13.82 15.11 13.06 14.86 12.13 13.98C10.96 12.89 10.22 11.59 10.02 11.3C9.82 11.01 9.68 10.86 9.53 10.66C9.39 10.47 9.25 10.29 9.12 10.14C9 9.99 8.87 9.87 8.74 9.74C8.61 9.61 8.46 9.51 8.32 9.41C8.17 9.31 8.01 9.25 7.85 9.12C7.54 8.87 7.22 8.92 7 9.17C6.78 9.42 6.13 10.07 5.93 10.27C5.73 10.47 5.54 10.52 5.34 10.42C5.14 10.32 4.67 10.17 4.11 9.59C3.41 8.87 2.93 8.01 2.78 7.67C2.63 7.33 2.76 7.07 2.91 6.92C3.04 6.79 3.21 6.67 3.36 6.52C3.51 6.37 3.59 6.27 3.71 6.1C3.83 5.93 3.78 5.78 3.71 5.63C3.63 5.48 3.16 4.31 2.96 3.82C2.76 3.33 2.57 3.41 2.44 3.41C2.32 3.41 2.19 3.41 2.06 3.41C1.94 3.41 1.74 3.46 1.57 3.71C1.39 3.96 0.88 4.58 0.88 5.76C0.88 6.94 1.59 8.03 1.74 8.23C1.89 8.43 3.16 10.42 5.12 11.33C6.46 11.96 7.23 12.28 7.76 12.48C8.48 12.76 9.05 12.71 9.48 12.61C9.99 12.48 11.13 11.85 11.38 11.21C11.63 10.57 11.63 10.04 11.55 9.89C11.48 9.74 11.33 9.69 11.13 9.59C10.93 9.49 10.12 9.12 9.92 9.04C9.72 8.97 9.59 8.94 9.47 9.09C9.34 9.24 8.88 9.79 8.73 9.94C8.58 10.09 8.43 10.14 8.28 10.04C8.13 9.94 7.72 9.79 7.37 9.44C6.95 9.04 6.62 8.53 6.52 8.35C6.42 8.18 6.52 8.03 6.67 7.88C6.8 7.76 6.95 7.6 7.13 7.45C7.31 7.3 7.39 7.23 7.51 7.1C7.63 6.98 7.68 6.88 7.66 6.73C7.63 6.58 7.58 6.46 7.53 6.33C7.48 6.21 7.43 6.11 7.38 6C7.34 5.89 7.29 5.82 7.24 5.75C7.2 5.68 7.15 5.61 7.11 5.55C7.06 5.48 7.02 5.41 6.97 5.34L6.97 5.33C7.54 4.76 8.28 4.38 9.11 4.19C9.56 4.08 10.02 4.04 10.48 4.04C10.9 4.04 11.31 4.09 11.71 4.18C12.46 4.35 13.16 4.68 13.78 5.13C14.03 5.32 14.26 5.53 14.48 5.75C14.71 6 14.91 6.25 15.1 6.51C15.28 6.77 15.45 7.05 15.59 7.34C15.75 7.66 15.86 8 15.93 8.35C15.99 8.65 16.02 8.96 16.02 9.26C16.02 9.57 16 9.87 15.93 10.17C15.86 10.5 15.75 10.82 15.61 11.13C15.47 11.42 15.3 11.7 15.12 11.96C14.93 12.22 14.73 12.46 14.5 12.69C14.27 12.92 14.02 13.13 13.76 13.32C13.51 13.52 13.25 13.7 12.98 13.86C12.72 14.03 12.45 14.18 12.18 14.31C12.07 14.36 11.96 14.41 11.85 14.45C12.55 14.88 13.38 15.11 14.26 15.11C14.71 15.11 15.15 15.04 15.58 14.89C16.01 14.74 16.41 14.51 16.75 14.22C16.89 14.09 17.03 13.96 17.15 13.82C17.28 13.68 17.41 13.54 17.52 13.39L17.52 13.39C17.27 13.61 17.01 13.81 16.73 13.99C16.46 14.17 16.17 14.32 15.88 14.45C15.58 14.58 15.28 14.69 14.96 14.77C14.65 14.85 14.33 14.89 14.01 14.89C13.56 14.89 13.12 14.82 12.7 14.67C12.28 14.52 11.89 14.3 11.55 14.03C11.21 13.76 10.92 13.44 10.68 13.08C10.45 12.72 10.27 12.33 10.15 11.91C10.03 11.49 9.97 11.05 9.97 10.61C9.97 10.17 10.03 9.73 10.15 9.31C10.27 8.89 10.45 8.5 10.68 8.14C10.92 7.78 11.21 7.46 11.55 7.19C11.89 6.92 12.28 6.7 12.7 6.55C13.12 6.4 13.56 6.33 14.01 6.33C14.33 6.33 14.65 6.37 14.96 6.45C15.27 6.53 15.58 6.64 15.87 6.77C16.16 6.9 16.45 7.05 16.72 7.23C17.01 7.43 17.27 7.65 17.5 7.9C17.63 8.03 17.74 8.17 17.84 8.32C17.94 8.47 18.02 8.63 18.07 8.8C18.12 8.97 18.15 9.14 18.15 9.32C18.15 9.55 18.09 9.78 17.97 9.99C17.85 10.2 17.69 10.39 17.5 10.56C17.31 10.73 17.09 10.87 16.85 10.98C16.61 11.09 16.35 11.17 16.08 11.21C15.81 11.25 15.54 11.26 15.27 11.24C14.99 11.22 14.72 11.16 14.46 11.08C14.19 11 13.93 10.89 13.68 10.77C13.43 10.65 13.19 10.51 12.97 10.35C12.75 10.19 12.54 10.01 12.35 9.82C12.16 9.63 11.99 9.42 11.83 9.2C11.67 8.98 11.53 8.75 11.41 8.51C11.29 8.27 11.2 8.02 11.13 7.76C11.06 7.5 11.02 7.24 11.02 6.97C11.02 6.7 11.06 6.44 11.13 6.18C11.2 5.92 11.29 5.67 11.41 5.43C11.53 5.19 11.67 4.96 11.83 4.74C12.06 4.42 12.34 4.15 12.67 3.93C13 3.71 13.37 3.54 13.77 3.42C14.17 3.3 14.59 3.24 15.03 3.24C15.99 3.24 16.9 3.6 17.61 4.25C17.52 4.44 17.45 4.63 17.39 4.81C17.33 5 17.28 5.18 17.24 5.37C17.2 5.56 17.17 5.75 17.17 5.94C17.17 6.17 17.22 6.38 17.33 6.58C17.44 6.78 17.59 6.95 17.79 7.09C17.99 7.23 18.22 7.33 18.47 7.39C18.72 7.45 18.98 7.46 19.24 7.44C19.5 7.42 19.76 7.36 20.01 7.27C20.26 7.18 20.5 7.06 20.72 6.91C20.94 6.76 21.14 6.58 21.32 6.38C21.5 6.18 21.66 5.96 21.8 5.72L21.82 5.7C21.2 4.79 20.28 4.07 19.18 3.6C18.08 3.13 16.86 2.92 15.61 2.99C14.36 3.06 13.15 3.42 12.07 4.02C10.99 4.62 10.07 5.45 9.41 6.45C8.75 7.45 8.36 8.6 8.27 9.8C8.18 11 8.39 12.18 8.89 13.25C9.39 14.32 10.16 15.25 11.13 15.96C12.1 16.67 13.24 17.14 14.44 17.31C15.64 17.48 16.87 17.36 17.98 16.96C19.09 16.56 20.06 15.89 20.8 15.02C21.54 14.15 22.04 13.11 22.24 11.98C22.23 11.96 17.27 14.25 17.27 14.25Z"/></svg>
                        Join on WhatsApp
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="#" target="_blank">
                        <DiscordIcon className="mr-2 h-5 w-5" />
                        Join on Discord
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Community Section */}
       <section id="community" className="py-20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">
              More Than an Agency
            </h2>
            <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
              We are a vibrant community dedicated to learning, growth, and making a positive impact in the tech world.
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-secondary/50 dark:bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center font-headline">
            What Our Clients Say
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map(t => (
                  <Card key={t.name}>
                      <CardContent className="p-6">
                          <blockquote className="text-lg text-muted-foreground">"{t.testimonial}"</blockquote>
                      </CardContent>
                      <CardHeader className="flex-row items-center gap-4 pt-0">
                           <Avatar>
                              <AvatarImage src={t.avatar} alt={t.name} />
                              <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-semibold">{t.name}</p>
                              <p className="text-sm text-muted-foreground">{t.title}</p>
                          </div>
                      </CardHeader>
                  </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline">
            Sponsor Our Next Hackathon
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Connect with emerging tech talent and showcase your brand to our vibrant community. Partner with us to inspire the next wave of innovation.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/sponsors">
                Become a Sponsor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
