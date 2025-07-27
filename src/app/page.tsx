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
      <section className="min-h-screen flex items-center py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl font-headline">
             <DynamicText />
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a collective of developers, designers, and strategists from the Tech Tribe community, dedicated to building exceptional digital solutions and fostering the next generation of tech talent.
          </p>
          <div className="mt-10 flex justify-center gap-4">
             <Button asChild size="lg" className="text-lg py-6 px-8">
              <Link href="/contact?subject=schedule_call">Schedule a Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg py-6 px-8">
              <Link href="#community">Join Community</Link>
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
