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
        setText(currentPhrase.substring(0, text.length - 1))
      } else {
        setText(currentPhrase.substring(0, text.length + 1))
      }
    }

    const typingTimeout = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED)

    if (!isDeleting && text === phrases[phraseIndex]) {
      clearTimeout(typingTimeout)
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true)
      }, PAUSE_DURATION)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    }

    return () => {
      clearTimeout(typingTimeout)
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
