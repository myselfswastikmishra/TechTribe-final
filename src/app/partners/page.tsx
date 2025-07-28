import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Partners & Chapters | Tech Tribe",
  description: "We are proud to collaborate with leading companies and have active chapters at universities worldwide. See who supports our mission.",
}

const companyPartners = [
  { name: "Innovate Corp", logo: "https://placehold.co/150x80.png", hint: "company logo" },
  { name: "Tech Solutions Ltd.", logo: "https://placehold.co/150x80.png", hint: "corporate logo" },
  { name: "Future Systems", logo: "https://placehold.co/150x80.png", hint: "business logo" },
  { name: "QuantumLeap", logo: "https://placehold.co/150x80.png", hint: "tech logo" },
  { name: "NextGen AI", logo: "https://placehold.co/150x80.png", hint: "startup logo" },
  { name: "DataWeavers", logo: "https://placehold.co/150x80.png", hint: "data logo" },
]

const universityChapters = [
  { name: "Metropolis University", logo: "https://placehold.co/100x100.png", hint: "university seal" },
  { name: "Gotham State University", logo: "https://placehold.co/100x100.png", hint: "college crest" },
  { name: "Starling City College", logo: "https://placehold.co/100x100.png", hint: "campus logo" },
  { name: "National City University", logo: "https://placehold.co/100x100.png", hint: "university icon" },
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Our Partners & Chapters
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We are proud to collaborate with leading companies and have active chapters at universities worldwide.
        </p>
      </div>

      <section id="company-partners" className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline">
          Company Partners
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
          Our hackathons and events are made possible by the generous support of our industry partners.
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {companyPartners.map((partner) => (
            <Card key={partner.name} className="flex items-center justify-center p-6 transition-transform transform hover:-translate-y-2">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={150}
                height={80}
                data-ai-hint={partner.hint}
                className="object-contain"
              />
            </Card>
          ))}
        </div>
      </section>

      <section id="university-chapters" className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline">
          University Chapters
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
          Our community is growing on campuses around the globe, led by passionate students.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {universityChapters.map((chapter) => (
            <Card key={chapter.name} className="text-center transition-transform transform hover:-translate-y-2">
              <CardHeader className="items-center">
                <Image
                  src={chapter.logo}
                  alt={`${chapter.name} logo`}
                  width={100}
                  height={100}
                  data-ai-hint={chapter.hint}
                  className="rounded-full object-cover"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-headline">{chapter.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
