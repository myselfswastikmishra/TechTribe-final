
import type { Metadata } from "next"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { portfolioItems, testimonials } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Our Work",
  description: "We take pride in the solutions we've built. Explore some of our favorite projects that showcase our commitment to quality and innovation.",
};

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
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="block group">
                <Card className="overflow-hidden flex flex-col h-full transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20">
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
                  <CardContent className="p-4 flex-grow">
                      <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                      </div>
                      <CardTitle className="text-xl font-headline mt-4">{item.title}</CardTitle>
                      <p className="mt-2 text-muted-foreground line-clamp-3 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            </div>
        </section>

        <section id="testimonials" className="mt-20">
          <h2 className="text-3xl font-bold text-center font-headline">
            What Our Clients Say
          </h2>
          <div className="mt-12">
              <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      </main>
    </div>
  );
}
