"use client"

import { useState, useEffect, useRef } from "react"

const phrases = [
  "a Tech Community.",
  "a Freelance Agency.",
  "turning Ideas into Reality.",
]

const TYPING_SPEED = 100
const DELETING_SPEED = 50
const PAUSE_DURATION = 2000

export function DynamicText() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex]
      const fullText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1)

      setText(fullText)

      if (!isDeleting && fullText === currentPhrase) {
        // Pause at the end of typing
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, PAUSE_DURATION)
      } else if (isDeleting && fullText === "") {
        // Move to the next phrase after deleting
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      } else {
        // Continue typing or deleting
        timeoutRef.current = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED)
      }
    }

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED)

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, isDeleting, phraseIndex])

  return (
    <>
      We are <span className="text-primary">{text}</span>
      <span className="animate-pulse">|</span>
    </>
  )
}
