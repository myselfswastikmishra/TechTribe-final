import { GraduationCap, Lightbulb, Network, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChapterApplicationForm } from "./ChapterApplicationForm"

const perks = [
  {
    icon: <Network className="h-8 w-8 text-primary" />,
    title: "Community Network",
    description: "Gain access to our global network of tech professionals, mentors, and fellow students.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Exclusive Events",
    description: "Get priority access and discounts to our flagship hackathons, workshops, and conferences.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Leadership Experience",
    description: "Develop valuable leadership, management, and organizational skills by leading a chapter.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Sponsorship Support",
    description: "Receive guidance and resources to secure sponsorships for your local chapter events.",
  },
]

export default function ChaptersPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Lead a Tech Tribe Chapter
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Bring our community to your university. Inspire change, foster innovation, and build your leadership skills.
        </p>
      </div>

      <section id="perks" className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline">
          Perks & Benefits
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <Card key={perk.title} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {perk.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{perk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{perk.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="apply" className="mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center font-headline">
            Apply to Start a Chapter
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Fill out the form below to start the process. We will review your application and get in touch with the next steps.
          </p>
          <Card className="mt-8">
            <CardContent className="p-6">
              <ChapterApplicationForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
