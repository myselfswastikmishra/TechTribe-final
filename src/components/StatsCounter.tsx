"use client"

import { useEffect, useState, useRef } from "react"

type StatsCounterProps = {
  value: number
  suffix?: string
  duration?: number
}

export function StatsCounter({ value, suffix = "", duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isIntersecting, setIntersecting] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if(ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      let start = 0
      const end = value
      if (start === end) return

      const incrementTime = (duration / end)
      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start === end) clearInterval(timer)
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isIntersecting, value, duration])
  
  const minWidth = `${(value.toLocaleString().length + (suffix ? suffix.length : 0))}ch`

  return (
    <span ref={ref} style={{ minWidth: minWidth, display: 'inline-block', textAlign: 'right' }}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
