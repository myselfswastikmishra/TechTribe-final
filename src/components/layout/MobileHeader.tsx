
"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { HeaderActions } from "./HeaderActions"

type NavLink = {
  href: string
  label: string
}

interface MobileHeaderProps {
  navLinks: NavLink[]
  BrandLink: React.FC
}

export function MobileHeader({ navLinks, BrandLink }: MobileHeaderProps) {
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
              <NavLink key={link.href} {...link} className="text-base" />
            ))}
            <NavLink href="/contact" label="Contact Us" className="text-base" />
          </nav>
        </SheetContent>
      </Sheet>

      <div onClick={() => setIsMenuOpen(false)}>
        <BrandLink />
      </div>

      <HeaderActions />
    </div>
  )
}
