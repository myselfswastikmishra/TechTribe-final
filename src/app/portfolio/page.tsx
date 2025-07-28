import type { Metadata } from "next"
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of projects, from website development and branding to business automation. See the quality and creativity we bring to our clients.",
}

const portfolioItems = [
  {
    title: "QuantumLeap Website",
    description: "A complete website redesign and development for a leading AI startup, focusing on performance, user engagement, and a modern aesthetic.",
    image: { src: "https://placehold.co/600x400.png", hint: "tech website" },
    features: ["Next.js & React", "Tailwind CSS", "CMS Integration", "SEO Optimization"],
    tags: ["Web Development", "UI/UX"],
  },
  {
    title: "Innovate Corp Branding",
    description: "Developed a new brand identity, including logo, color palette, typography, and marketing materials for a major tech corporation.",
    image: { src: "https://placehold.co/600x400.png", hint: "branding design" },
    features: ["Logo Design", "Style Guide", "Social Media Kit", "Pitch Deck Template"],
    tags: ["Branding", "Design"],
  },
  {
    title: "DataWeavers Automation",
    description: "Built custom internal tools to automate data processing and reporting, saving hundreds of operational hours per month.",
    image: { src: "https://placehold.co/600x400.png", hint: "data dashboard" },
    features: ["Python & Pandas", "API Integration", "Automated Reporting", "Scheduled Tasks"],
    tags: ["Automation", "Internal Tools"],
  },
   {
    title: "Future Systems E-commerce",
    description: "Launched a full-featured e-commerce platform with custom checkout flows and advanced inventory management.",
    image: { src: "https://placehold.co/600x400.png", hint: "ecommerce site" },
    features: ["Shopify/WooCommerce", "Payment Gateway", "Product Management", "Customer Accounts"],
    tags: ["E-commerce", "Web Development"],
  },
];

const testimonials = [
    {
        name: "Jane Doe",
        title: "CEO, Innovate Corp",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "Tech Tribe delivered results that exceeded our expectations. Their professionalism and technical expertise were instrumental in our project's success. Highly recommended!"
    },
    {
        name: "John Smith",
        title: "CTO, QuantumLeap",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "Working with the Tech Tribe agency was a fantastic experience. They are passionate, skilled, and brought a fresh perspective to our website. The final product is simply outstanding."
    }
]

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Our Work
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We take pride in the solutions we've built. Explore some of our favorite projects that showcase our commitment to quality and innovation.
        </p>
      </header>

      <main>
        <section id="projects" className="mt-12">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {portfolioItems.map((item) => (
                <Card key={item.title} className="overflow-hidden group flex flex-col">
                <CardHeader className="p-0">
                    <div className="overflow-hidden rounded-t-lg">
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
                <CardContent className="p-6 flex-grow">
                    <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    </div>
                    <CardTitle className="text-2xl font-headline mt-4">{item.title}</CardTitle>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <ul className="space-y-2 text-sm w-full">
                    {item.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>

        <section id="testimonials" className="mt-20">
          <h2 className="text-3xl font-bold text-center font-headline">
            What Our Clients Say
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {testimonials.map(t => (
                  <Card key={t.name}>
                      <CardContent className="p-6">
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
        </section>
      </main>
    </div>
  );
}
