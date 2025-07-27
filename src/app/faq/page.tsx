import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Tech Tribe?",
    answer: "Tech Tribe is a community of tech enthusiasts, students, and professionals who come together to learn, collaborate on projects, and grow their skills. We host events, workshops, and run a freelance agency.",
  },
  {
    question: "Who can join the community?",
    answer: "Anyone with a passion for technology is welcome! Whether you're a beginner developer, a seasoned professional, or just curious about tech, you'll find a place in our tribe.",
  },
  {
    question: "How much does it cost to join?",
    answer: "Joining the Tech Tribe community is completely free. Most of our events and workshops are also free, though some special events may have a nominal fee to cover costs.",
  },
  {
    question: "What kind of events do you host?",
    answer: "We host a variety of events including hackathons, coding workshops, design sprints, guest speaker sessions from industry experts, and networking meetups.",
  },
  {
    question: "How can my company partner with Tech Tribe?",
    answer: "We are always looking for partners to collaborate with on events and initiatives. Please visit our Partners page or contact us directly through our Contact page to discuss partnership opportunities.",
  },
  {
    question: "How do I start a Tech Tribe chapter at my university?",
    answer: "We're thrilled you want to bring Tech Tribe to your campus! Please visit our 'Become a Chapter' page for more information on the benefits and the application process.",
  },
]

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find answers to common questions about our community, events, and mission.
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
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
      </div>
    </div>
  )
}
