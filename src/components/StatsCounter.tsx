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
  const [minWidth, setMinWidth] = useState("auto")

  useEffect(() => {
    // Estimate the final width based on the number of digits.
    // This is an approximation but is effective for preventing layout shifts.
    const finalWidth = `${value.toLocaleString().length * 0.6}em`
    setMinWidth(finalWidth)
    
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
    <div ref={ref} className="flex items-center justify-center">
      <span style={{ minWidth }} className="inline-block text-right">
        {count.toLocaleString()}
      </span>
      <span>{suffix}</span>
    </div>
  )
}
