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

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}k`
    }
    return Math.round(val).toString()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = value
          if (start === end) return

          const incrementTime = (duration / end)
          const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start === end) clearInterval(timer)
          }, incrementTime)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [value, duration])
  
  const displayValue = value >= 1000 ? `${(count/1000).toFixed(1)}K` : count;

  return (
    <div ref={ref}>
      <span>{count.toLocaleString()}</span>
      {suffix}
    </div>
  )
}
