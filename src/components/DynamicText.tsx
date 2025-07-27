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

      if (isDeleting) {
        // Deleting logic
        if (text.length > 0) {
          setText((prev) => prev.substring(0, prev.length - 1))
          timeoutRef.current = setTimeout(handleTyping, DELETING_SPEED)
        } else {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      } else {
        // Typing logic
        if (text.length < currentPhrase.length) {
          setText((prev) => currentPhrase.substring(0, prev.length + 1))
          timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED)
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
          }, PAUSE_DURATION)
        }
      }
    }

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED)

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
