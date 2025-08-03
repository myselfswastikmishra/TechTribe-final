
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { HeaderActions } from "./HeaderActions"
import { MobileHeader } from "./MobileHeader"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/partners", label: "Partners" },
  { href: "/events", label: "Events" },
  { href: "/chapters", label: "Chapters" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
]

export function Header() {
  const pathname = usePathname()

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {label}
    </Link>
  )

  const BrandLink = () => (
    <Link
      href="/"
      className="flex items-center space-x-2 font-bold text-lg font-headline hover:text-primary transition-colors whitespace-nowrap"
    >
      Tech TribeX
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Desktop Header */}
        <div className="hidden md:flex flex-1 items-center">
          <div className="mr-6">
            <BrandLink />
          </div>
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="contents md:hidden">
          <MobileHeader navLinks={navLinks} BrandLink={BrandLink} />
        </div>
        
        {/* Actions for Desktop */}
        <div className="hidden md:flex items-center justify-end gap-2">
           <Button asChild size="sm">
              <Link href="/contact">Contact Us</Link>
          </Button>
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
