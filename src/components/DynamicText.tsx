"use client"

import { useState, useEffect } from "react"

const phrases = [
    "a Tech Community.",
    "a Freelance Agency.",
    "turning Ideas into Reality.",
]

export function DynamicText() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typingSpeed = 120
    const deletingSpeed = 75
    const pauseDuration = 1200

    const handleTyping = () => {
      if (isDeleting) {
        // Deleting text
        if (text.length > 0) {
          setText(text.substring(0, text.length - 1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      } else {
        // Typing text
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.substring(0, text.length + 1))
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      }
    }

    const typingInterval = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(typingInterval)
  }, [text, isDeleting, phraseIndex])

  return (
    <>
      We are <span className="text-primary">{text}</span>
      <span className="animate-pulse">|</span>
    </>
  )
}
