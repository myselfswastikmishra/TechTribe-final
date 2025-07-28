import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Target, Users, Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Partner with Tech Tribe to connect with top tech talent, enhance your brand visibility, and support the next generation of innovators through our global events and community.",
};

const benefits = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Access Top Talent",
    description:
      "Connect with thousands of skilled and passionate students, developers, and designers from our global community.",
  },
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: "Brand Visibility",
    description:
      "Showcase your brand, products, and APIs to a large, engaged audience through our hackathons, workshops, and online platforms.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Community Engagement",
    description:
      "Position your company as a leader in the tech ecosystem and give back to the community by supporting educational initiatives.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Drive Innovation",
    description:
      "Inspire creative solutions and see innovative applications of your technology by providing challenges and prizes at our events.",
  },
];

export default function SponsorsPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Become a Sponsor
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Partner with Tech Tribe to connect with top tech talent, enhance your
          brand, and support the next generation of innovators.
        </p>
      </header>

      <main>
        <section id="why-sponsor" className="mt-20">
          <h2 className="text-3xl font-bold text-center font-headline">
            Why Sponsor Tech Tribe?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {benefit.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact-cta" className="mt-20 text-center bg-primary/5 p-8 rounded-lg">
          <h2 className="text-3xl font-bold font-headline">Ready to Partner With Us?</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            We offer a variety of sponsorship packages and are happy to create a custom one that fits your company's goals. Let's talk.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/contact?subject=sponsorship">
                Contact Our Partnerships Team
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
