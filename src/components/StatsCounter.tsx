"use client"

import { useEffect, useState, useRef } from "react"

type StatsCounterProps = {
  value: number
  suffix?: string
  duration?: number
}

export function StatsCounter({ value, suffix = "", duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = value
          if (start === end) {
            setCount(end);
            return
          }

          const incrementTime = (duration / end)
          const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start === end) {
              clearInterval(timer)
              if (observerRef.current) {
                observerRef.current.disconnect()
              }
            }
          }, incrementTime)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observerRef.current.observe(ref.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [value, duration])
  
  return (
    <div ref={ref}>
      <span>{count.toLocaleString()}</span>
      {suffix}
    </div>
  )
}
