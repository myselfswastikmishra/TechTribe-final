import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Find answers to common questions about our community, events, freelance services, and how to get involved with Tech Tribe.",
}

const faqs = [
  {
    question: "What is Tech Tribe?",
    answer: "Tech Tribe is a global community of tech enthusiasts, students, and professionals who come together to learn, collaborate on projects, and grow their skills. We host events, workshops, and run a freelance agency composed of our top community talent.",
  },
  {
    question: "Who can join the community?",
    answer: "Anyone with a passion for technology is welcome! Whether you're a beginner developer, a seasoned professional, a designer, or just curious about tech, you'll find a place in our tribe.",
  },
  {
    question: "How do I hire the Tech Tribe agency for a project?",
    answer: "You can hire our freelance agency by visiting the 'Services' page to see what we offer and then filling out the contact form to schedule a free consultation call. We'd love to hear about your project.",
  },
  {
    question: "How much does it cost to join or attend events?",
    answer: "Joining the Tech Tribe community is completely free. Most of our events and workshops are also free to ensure accessibility, though some special, large-scale events may have a nominal fee to cover costs.",
  },
  {
    question: "How can my company partner with or sponsor Tech Tribe?",
    answer: "We are always looking for partners and sponsors to collaborate with on events, hackathons, and community initiatives. Please visit our 'Sponsors' page or contact us directly to discuss opportunities.",
  },
  {
    question: "How do I start a Tech Tribe chapter at my university?",
    answer: "We're thrilled you want to bring Tech Tribe to your campus! Please visit our 'Chapters' page for more information on the benefits and the application process to lead a chapter.",
  },
]

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find answers to common questions about our community, freelance agency, events, and mission.
        </p>
      </header>

      <main className="mt-12 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left font-headline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  )
}
