
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, LayoutTemplate, PenTool, Rocket, Bot } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Leverage our community's talent. We offer website development, branding, business automation, and end-to-end online business solutions.",
}

const services = [
  {
    icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
    title: "Website Development",
    description: "From simple landing pages to complex web applications, we build fast, scalable, and secure websites using the latest technologies like Next.js and React.",
    features: ["Responsive Design", "E-commerce Solutions", "Content Management Systems (CMS)", "Web Hosting & Deployment"],
    tags: ["Web", "Development"],
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "Logo, Poster & Banner Design",
    description: "Crafting a unique visual identity is key. Our designers create memorable logos, engaging posters, and professional banners that capture your brand's essence.",
    features: ["Brand Identity Kits", "Vector Logo Design", "Marketing & Event Materials", "Social Media Graphics"],
    tags: ["Design", "Branding"],
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Business Automation",
    description: "We identify bottlenecks in your workflow and build custom automation solutions to save you time and reduce manual effort, using APIs and modern scripting.",
    features: ["Workflow Automation", "API Integration", "Custom Scripts & Tools", "Data Processing"],
    tags: ["Automation", "Productivity"],
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Online Business Solutions",
    description: "Launching a new online venture? We provide end-to-end solutions, from initial strategy and MVP development to scaling your platform for a growing user base.",
    features: ["MVP Development", "SaaS Solutions", "Platform Strategy", "Scalability Consulting"],
    tags: ["Startup", "Business"],
  },
];


export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Leverage the talent of our community to build your next big thing. We offer a range of services designed to bring your ideas to life.
        </p>
      </header>

      <main className="mt-12 grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                {service.icon}
                <div>
                    <div className="flex items-center gap-2">
                    {service.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  <CardTitle className="text-2xl font-headline mt-2">{service.title}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="space-y-2">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/contact?subject=other&customSubject=Inquiry about ${service.title}`}>
                  Inquire about {service.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      <aside className="mt-20 text-center bg-primary/5 p-8 rounded-lg">
        <h2 className="text-3xl font-bold font-headline">Ready to Start a Project?</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Let's talk about your ideas. Schedule a free, no-obligation call with our team to discuss how we can help you achieve your goals.
        </p>
        <div className="mt-6">
            <Button size="lg" asChild>
                <Link href="/contact?subject=schedule_call">
                    Schedule Your Free Consultation
                </Link>
            </Button>
        </div>
      </aside>
    </div>
  );
}
