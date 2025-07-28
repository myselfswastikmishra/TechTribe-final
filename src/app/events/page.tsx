import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Events",
  description: "Join our upcoming hackathons, workshops, and networking events. Learn new skills, build innovative projects, and connect with the tech community.",
}

const events = [
  {
    title: "InnovateAI Hackathon 2024",
    date: "October 26-27, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Online & In-Person (Silicon Valley)",
    description: "A 2-day intensive hackathon focused on creating innovative solutions using Artificial Intelligence. Prizes for top 3 teams!",
  },
  {
    title: "Web 3.0 & Blockchain Workshop",
    date: "November 9, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Online (Global)",
    description: "A hands-on workshop covering the fundamentals of Web 3.0, smart contracts, and decentralized applications.",
  },
  {
    title: "UI/UX Design for Developers",
    date: "November 23, 2024",
    time: "1:00 PM - 4:00 PM",
    location: "Online (Global)",
    description: "Learn the core principles of UI/UX design that can help you build more intuitive and user-friendly applications.",
  },
]

export default function EventsPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Upcoming Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our hackathons, workshops, and networking events to learn, build, and connect with a global community.
        </p>
      </header>

      <main className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
              <CardDescription className="text-base pt-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{event.time}</span>
              </div>
               <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Register Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-headline">Register for {event.title}</DialogTitle>
                    <DialogDescription>
                      Fill in your details below to secure your spot. An email with event details will be sent to you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="Ada Lovelace" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="ada@example.com" className="col-span-3" />
                    </div>
                  </div>
                  <Button type="submit">Confirm Registration</Button>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  )
}
