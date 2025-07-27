"use client"

import { useState, useEffect } from "react"

const phrases = [
    "a Tech Community.",
    "a Freelance Agency.",
    "turning Ideas into Reality.",
]

export function DynamicText() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    if (index === phrases.length) {
      setIndex(0)
      return
    }

    if ( subIndex === phrases[index].length + 1 && !reverse ) {
      setReverse(true);
      // pause before reversing
      setTimeout(() => {}, 1000)
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setCurrentText(phrases[index].substring(0, subIndex))
    }, 100);

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse])


  return (
    <>
      We are <span className="text-primary">{currentText}</span>
    </>
  )
}
