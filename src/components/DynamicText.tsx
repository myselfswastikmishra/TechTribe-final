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
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseDuration = 1000

    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        if (text.length > 0) {
          setText(prev => prev.substring(0, prev.length - 1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        }
      } else {
        if (text.length < currentPhrase.length) {
          setText(prev => currentPhrase.substring(0, prev.length + 1))
        } else {
          timer = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      }
    }

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, phraseIndex])

  return (
    <>
      We are <span className="text-primary">{text}</span>
      <span className="animate-pulse">|</span>
    </>
  )
}
