"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Skeleton } from "@/components/ui/skeleton"

export function HeaderActions() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex flex-1 items-center justify-end gap-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <Button asChild size="sm">
        <Link href="/contact">Contact Us</Link>
      </Button>
      <ThemeToggle />
    </div>
  )
}
