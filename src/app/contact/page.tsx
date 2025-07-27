import { Mail, MessageSquare } from "lucide-react"
import { ContactForm } from "./ContactForm"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question or a proposal? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-center gap-4">
            <Mail className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold font-headline">Email Us</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            For partnerships, sponsorships, or general inquiries, please email us directly.
          </p>
          <a
            href="mailto:hello@techtribe.com"
            className="mt-4 inline-block font-semibold text-primary hover:underline"
          >
            hello@techtribe.com
          </a>
        </div>
        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-center gap-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold font-headline">Send a Message</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Use the form to send us a message and we'll get back to you soon.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
