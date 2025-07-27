import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, PenTool, Rocket, Users, Milestone, PartyPopper, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
            Ideas into
            <span className="text-primary"> Reality</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a collective of developers, designers, and strategists from the Tech Tribe community, dedicated to building exceptional digital solutions and fostering the next generation of tech talent.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact?subject=schedule_call">Schedule a Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">Our Work</Link>
            </Button>
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
          <div className="mt-12 grid gap-8 md:grid-cols-2">
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
       <section id="community" className="py-20 bg-secondary/50 dark:bg-background">
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
      <section id="testimonials" className="py-20">
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
      <section className="py-16 bg-primary/5">
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
