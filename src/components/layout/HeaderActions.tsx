
"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function HeaderActions() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Render a placeholder or null on the server
    return <div className="h-10 w-10" />
  }

  return <ThemeToggle />
}
