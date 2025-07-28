
import type { Metadata } from "next"
import { Suspense } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ContactFormWrapper } from "./ContactFormWrapper"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Tech Tribe. Whether you have a project in mind, a question about our community, or a sponsorship proposal, we'd love to hear from you.",
}

function ContactFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
       <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  )
}


export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a project in mind, a question about our services, or a partnership proposal? We're here to help.
        </p>
      </header>

      <main className="mt-12 max-w-2xl mx-auto">
        <Card>
           <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-center">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ContactFormSkeleton />}>
              <ContactFormWrapper />
            </Suspense>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
