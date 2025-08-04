"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavLink = {
  href: string
  label: string
}

interface MobileHeaderProps {
  navLinks: NavLink[]
  BrandLink: React.FC
  children: React.ReactNode
}

export function MobileHeader({ navLinks, BrandLink, children }: MobileHeaderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  if (!isMounted) {
    return (
        <div className="flex w-full items-center justify-between">
            <div className="h-10 w-10" />
            <div className="h-6 w-24" />
            <div className="h-10 w-10" />
        </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <div className="mb-8" onClick={() => setIsMenuOpen(false)}>
            <BrandLink />
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} className="text-lg" />
            ))}
             <Button asChild size="lg" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="absolute left-1/2 -translate-x-1/2" onClick={() => setIsMenuOpen(false)}>
        <BrandLink />
      </div>

      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  )
}
