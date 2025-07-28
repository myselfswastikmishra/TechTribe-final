"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

export function HeaderActions() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="hidden md:block">
        <Button asChild size="sm">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
      <ThemeToggle />
    </div>
  )
}
