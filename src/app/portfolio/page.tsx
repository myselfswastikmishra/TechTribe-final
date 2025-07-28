
import type { Metadata } from "next"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of projects, from website development and branding to business automation. See the quality and creativity we bring to our clients.",
}

export const portfolioItems = [
  {
    slug: "quantumleap-website",
    title: "QuantumLeap Website",
    description: "A complete website redesign and development for a leading AI startup, focusing on performance, user engagement, and a modern aesthetic.",
    image: { src: "https://placehold.co/600x400.png", hint: "tech website" },
    features: ["Next.js & React", "Tailwind CSS", "CMS Integration", "SEO Optimization"],
    tags: ["Web Development", "UI/UX"],
    githubUrl: "https://github.com/techtribe/quantumleap-website",
    liveUrl: "https://quantumleap.example.com",
  },
  {
    slug: "innovate-corp-branding",
    title: "Innovate Corp Branding",
    description: "Developed a new brand identity, including logo, color palette, typography, and marketing materials for a major tech corporation.",
    image: { src: "https://placehold.co/600x400.png", hint: "branding design" },
    features: ["Logo Design", "Style Guide", "Social Media Kit", "Pitch Deck Template"],
    tags: ["Branding", "Design"],
    githubUrl: "https://github.com/techtribe/innovate-corp-branding",
    liveUrl: "https://innovatecorp.example.com",
  },
  {
    slug: "dataweavers-automation",
    title: "DataWeavers Automation",
    description: "Built custom internal tools to automate data processing and reporting, saving hundreds of operational hours per month.",
    image: { src: "https://placehold.co/600x400.png", hint: "data dashboard" },
    features: ["Python & Pandas", "API Integration", "Automated Reporting", "Scheduled Tasks"],
    tags: ["Automation", "Internal Tools"],
    githubUrl: "https://github.com/techtribe/dataweavers-automation",
    liveUrl: "https://dataweavers.example.com",
  },
   {
    slug: "future-systems-ecommerce",
    title: "Future Systems E-commerce",
    description: "Launched a full-featured e-commerce platform with custom checkout flows and advanced inventory management.",
    image: { src: "https://placehold.co/600x400.png", hint: "ecommerce site" },
    features: ["Shopify/WooCommerce", "Payment Gateway", "Product Management", "Customer Accounts"],
    tags: ["E-commerce", "Web Development"],
    githubUrl: "https://github.com/techtribe/future-systems-ecommerce",
    liveUrl: "https://fsecom.example.com",
  },
  {
    slug: "ecobuilders-app",
    title: "EcoBuilders Mobile App",
    description: "A cross-platform mobile app for a green construction company to manage projects, clients, and materials on the go.",
    image: { src: "https://placehold.co/600x400.png", hint: "mobile app" },
    features: ["React Native", "Firebase Backend", "Push Notifications", "Offline Sync"],
    tags: ["Mobile App", "Sustainability"],
    githubUrl: "https://github.com/techtribe/ecobuilders-app",
    liveUrl: "https://play.google.com/store/apps",
  },
  {
    slug: "cloudpioneers-dashboard",
    title: "CloudPioneers Dashboard",
    description: "A real-time analytics dashboard for a cloud infrastructure provider, visualizing server loads, network traffic, and costs.",
    image: { src: "https://placehold.co/600x400.png", hint: "analytics dashboard" },
    features: ["React & D3.js", "WebSocket Integration", "Data Visualization", "User Authentication"],
    tags: ["Dashboard", "Data"],
    githubUrl: "https://github.com/techtribe/cloudpioneers-dashboard",
    liveUrl: "https://dash.cloudpioneers.example.com",
  },
];

export const testimonials = [
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
    },
    {
        name: "Samantha Ray",
        title: "Founder, Future Systems",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "The e-commerce solution they built for us was a game-changer. Our sales have doubled, and the new platform is incredibly easy to manage."
    },
    {
        name: "David Chen",
        title: "COO, DataWeavers",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "The automation tools developed by Tech Tribe have saved us countless hours of manual work. Their impact on our operational efficiency is undeniable."
    },
    {
        name: "Emily Rodriguez",
        title: "Project Manager, EcoBuilders",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "The mobile app is fantastic. Our field team can now manage projects seamlessly, and the offline sync feature is a lifesaver. A truly reliable partner."
    },
    {
        name: "Michael Brown",
        title: "Head of Infra, CloudPioneers",
        avatar: "https://placehold.co/100x100.png",
        testimonial: "The real-time analytics dashboard gives us the visibility we need to manage our infrastructure effectively. The data visualization is top-notch."
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
