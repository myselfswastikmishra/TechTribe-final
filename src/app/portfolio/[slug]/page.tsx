import { portfolioItems } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Github, ExternalLink } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const project = portfolioItems.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
        title: `${project.title} | Portfolio`,
        description: project.description,
        images: [
            {
                url: project.image.src,
                width: 1200,
                height: 600,
                alt: project.title,
            },
        ],
    },
  };
}


export default function PortfolioDetailPage({ params }: Props) {
  const project = portfolioItems.find((p) => p.slug === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          {project.title}
        </h1>
      </header>

      <main className="mt-12 max-w-5xl mx-auto">
        <Card className="overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.title}
            width={1200}
            height={600}
            priority
            data-ai-hint={project.image.hint}
            className="w-full object-cover"
          />
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-headline">About the Project</h2>
            <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

          </div>
          <div>
            <h2 className="text-2xl font-bold font-headline">Key Features</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            {project.liveUrl && (
                <Button asChild size="lg">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        View Live Demo
                    </Link>
                </Button>
            )}
            {project.githubUrl && (
                 <Button asChild size="lg" variant="outline">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        View on GitHub
                    </Link>
                </Button>
            )}
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
    return portfolioItems.map((project) => ({
        slug: project.slug,
    }));
}
