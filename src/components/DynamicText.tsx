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

    const intervalId = setInterval(() => {
      const currentPhrase = phrases[phraseIndex];
      
      setText(prevText => {
        let newText;
        if (isDeleting) {
          newText = currentPhrase.substring(0, prevText.length - 1)
          if (newText.length === 0) {
            setIsDeleting(false)
            setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
          }
        } else {
          newText = currentPhrase.substring(0, prevText.length + 1)
          if (newText.length === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
        return newText;
      });
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(intervalId);
  }, [phraseIndex, isDeleting]);

  return (
    <>
      We are <span className="text-primary">{text}</span>
      <span className="animate-pulse">|</span>
    </>
  )
}
