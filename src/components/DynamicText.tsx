"use client"

import { useState, useEffect, useRef } from "react"

const phrases = [
    "a Tech Community.",
    "a Freelance Agency.",
    "turning Ideas into Reality.",
]

export function DynamicText() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setReverse(true);
      // Add a pause at the end of the phrase
      timeoutRef.current = setTimeout(() => {
         setSubIndex(prev => prev -1)
      }, 1200);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 120);

    timeoutRef.current = timeout

    return () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    };
  }, [subIndex, index, reverse]);

  return (
    <>
      We are <span className="text-primary">{phrases[index].substring(0, subIndex)}</span>
    </>
  )
}
