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

    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText(prevText => prevText.substring(0, prevText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        if (text.length < currentPhrase.length) {
          setText(prevText => currentPhrase.substring(0, prevText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, isDeleting, phraseIndex]);

  return (
    <>
      We are <span className="text-primary">{text}</span>
      <span className="animate-pulse">|</span>
    </>
  )
}
