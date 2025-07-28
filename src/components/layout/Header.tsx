"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { HeaderActions } from "./HeaderActions"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/partners", label: "Partners" },
  { href: "/events", label: "Events" },
  { href: "/chapters", label: "Chapters" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        className
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  )

  const BrandLink = () => (
    <Link
      href="/"
      className="flex items-center space-x-2 font-bold text-lg font-headline hover:text-primary transition-colors whitespace-nowrap"
      onClick={() => setIsMenuOpen(false)}
    >
      Tech Tribe
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6">
            <BrandLink />
          </div>
          <nav className="flex items-center space-x-6">
            {navLinks.filter(l => l.href !== '/contact').map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between md:justify-end">
           <div className="flex-1 md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isMenuOpen ? <X /> : <Menu />}
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                   <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <div className="mb-8">
                    <BrandLink />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} className="text-base" />
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

          <div className="flex-1 flex justify-center md:hidden">
             <BrandLink />
          </div>
          
          <HeaderActions />
          
        </div>
      </div>
    </header>
  )
}
