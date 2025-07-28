import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { DiscordIcon } from "@/components/icons/DiscordIcon"
import { WhatsappIcon } from "@/components/icons/WhatsappIcon"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold font-headline">Tech Tribe</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A global community of creators and a freelance agency dedicated to building the future.
            </p>
          </div>
          <div className="md:col-span-3">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="font-semibold">Agency</h4>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
                    <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
                    <li><Link href="/contact?subject=schedule_call" className="text-muted-foreground hover:text-primary">Schedule a Call</Link></li>
                  </ul>
                </div>
                 <div>
                  <h4 className="font-semibold">Community</h4>
                  <ul className="mt-4 space-y-2 text-sm">
                     <li><Link href="/events" className="text-muted-foreground hover:text-primary">Events</Link></li>
                    <li><Link href="/chapters" className="text-muted-foreground hover:text-primary">Chapters</Link></li>
                    <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Partners</h4>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="/sponsors" className="text-muted-foreground hover:text-primary">Become a Sponsor</Link></li>
                     <li><Link href="/partners" className="text-muted-foreground hover:text-primary">Our Partners</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Company</h4>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
         <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              &copy; {year} Tech Tribe. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
                <Link href="https://wa.me/15551234567" aria-label="WhatsApp" target="_blank">
                    <WhatsappIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                <Link href="https://discord.gg/example" aria-label="Discord" target="_blank">
                    <DiscordIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                <Link href="https://twitter.com/example" aria-label="Twitter" target="_blank">
                    <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                <Link href="https://github.com/example" aria-label="GitHub" target="_blank">
                    <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
                <Link href="https://linkedin.com/company/example" aria-label="LinkedIn" target="_blank">
                    <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                </Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
