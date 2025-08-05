
"use client"

import React, { useState, useRef, useEffect, memo } from "react"
import Link from "next/link"
import { Bot, Send, X, CornerDownLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { chat } from "@/ai/flows/chatbot-flow"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
}

type QuickAction = "ask" | "navigate"

const predefinedQuestions: Record<string, string> = {
    "What is Tech TribeX?": "🚀 Tech TribeX is India's emerging tech-driven student community connecting, educating, and empowering tech enthusiasts nationwide!",
    "Who is the founder of Tech TribeX?": "👨‍💻 Swastik Mishra - a visionary leader who started this movement at K.R. Mangalam University, aiming to transform student tech engagement! Connect with him on LinkedIn: https://www.linkedin.com/in/myselfswastikmishra/",
    "What is the vision of Tech TribeX?": "🌍 To build the largest student tech ecosystem offering training, opportunities, and a platform for innovation and growth!"
}

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/events", label: "Events" },
    { href: "/chapters", label: "Chapters" },
    { href: "/contact", label: "Contact Us" },
]

const BotMessageContent = memo(function BotMessageContent({ text }: { text: string }) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const renderTextWithLinks = (part: string, key: React.Key) => {
        const segments = part.split(urlRegex);
        return (
            <React.Fragment key={key}>
                {segments.map((segment, i) =>
                    urlRegex.test(segment) ? (
                        <a
                            key={i}
                            href={segment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary/80"
                        >
                            {segment}
                        </a>
                    ) : (
                        <span key={i}>{segment}</span>
                    )
                )}
            </React.Fragment>
        );
    };

    const blocks = text.split('\n\n');

    return (
        <div className="flex flex-col gap-2 text-sm">
            {blocks.map((block, blockIndex) => {
                const lines = block.split('\n').filter(line => line.trim() !== '');
                if (lines.every(line => line.trim().startsWith('- '))) {
                    return (
                        <ul key={blockIndex} className="list-disc pl-5 space-y-1">
                            {lines.map((line, lineIndex) => (
                                <li key={lineIndex}>
                                    {renderTextWithLinks(line.trim().substring(2), lineIndex)}
                                </li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={blockIndex} className="whitespace-pre-wrap">
                         {lines.map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                                {renderTextWithLinks(line, lineIndex)}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                );
            })}
        </div>
    );
});


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<QuickAction | null>(null)
  const { toast } = useToast()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        const timer = setTimeout(() => {
           setMessages([
              { id: "hello", text: "Hi there! I'm the TribeX Navigator. How can I help you today? 👋", sender: "bot" }
           ]);
           setActiveAction("ask");
       }, 100);
       return () => clearTimeout(timer)
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollEl = scrollAreaRef.current;
        setTimeout(() => {
           scrollEl.scrollTop = scrollEl.scrollHeight;
        }, 50)
    }
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent, question?: string) => {
    e.preventDefault()
    const userMessage = question || input
    if (!userMessage.trim()) return

    const newUserMessage: Message = { id: Date.now().toString(), text: userMessage, sender: "user" }
    setMessages(prev => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)
    setActiveAction(null)

    if (predefinedQuestions[userMessage]) {
        setTimeout(() => {
            const botMessage: Message = { id: (Date.now() + 1).toString(), text: predefinedQuestions[userMessage], sender: "bot" }
            setMessages(prev => [...prev, botMessage])
            setIsLoading(false)
            setActiveAction("ask")
        }, 500);
        return;
    }

    try {
      const result = await chat({ message: userMessage })
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.answer, sender: "bot" }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error("Chatbot error:", error)
      const errorMessageText = "Sorry, I couldn't connect to my brain right now. 🧠 Please try again later.";
      toast({
        title: "Chatbot Error",
        description: errorMessageText,
        variant: "destructive",
      })
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: "bot" }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setActiveAction("ask")
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    setActiveAction(action)
    if (action === "navigate") {
       setMessages(prev => [...prev, { id: "nav-prompt", text: "Great! Where would you like to go? 🚀", sender: "bot" }])
    }
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        size="icon" 
        className={cn("fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-transform duration-300", isOpen ? "scale-0" : "scale-100")}
        aria-label="Open chat"
      >
        <Bot className="w-8 h-8" />
      </Button>

       <div className={cn(
        "fixed bottom-0 right-0 z-50 w-full h-full transition-transform duration-300 origin-bottom-right md:bottom-6 md:right-6 md:w-[440px] md:h-auto md:max-h-[calc(100dvh-4.5rem)] md:rounded-xl",
        !isOpen ? "scale-0" : "scale-100"
      )}>
        <Card className="flex flex-col h-full rounded-none md:rounded-xl shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar>
                 <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="bot avatar" />
                <AvatarFallback>TN</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline">TribeX Navigator</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-grow p-0 overflow-y-auto">
             <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
                <div className="space-y-4 p-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex items-start gap-3", message.sender === "user" ? "justify-end" : "justify-start")}>
                      {message.sender === "bot" && <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback>T</AvatarFallback></Avatar>}
                      <div className={cn(
                        "max-w-[85%] rounded-lg px-3.5 py-2.5 shadow-sm",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        <BotMessageContent text={message.text} />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback>T</AvatarFallback></Avatar>
                        <div className="bg-muted px-3.5 py-2.5 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
                              <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></span>
                              <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></span>
                            </div>
                        </div>
                    </div>
                  )}
                </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t bg-background flex-shrink-0">
            <div className="w-full">
                {activeAction && !isLoading && (
                <div className="mb-3 space-y-2.5 transition-all duration-300">
                    {activeAction === 'ask' && (
                    <>
                        <p className="text-sm text-muted-foreground text-center">Or ask one of these questions:</p>
                        <div className="space-y-2">
                            {Object.keys(predefinedQuestions).map(q => (
                                <Button key={q} variant="outline" size="sm" className="w-full justify-start h-auto text-left py-2 whitespace-normal" onClick={(e) => handleSubmit(e, q)}>
                                    {q}
                                </Button>
                            ))}
                            <Button variant="outline" size="sm" className="w-full" onClick={() => handleQuickAction("navigate")}>Navigate Website</Button>
                        </div>
                    </>
                    )}
                    {activeAction === 'navigate' && (
                    <>
                        <p className="text-sm text-muted-foreground text-center">Where would you like to go?</p>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map(link => (
                                <Button key={link.href} variant="outline" size="sm" asChild>
                                    <Link href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>

                                </Button>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setActiveAction('ask')}>
                            <CornerDownLeft className="mr-2 h-4 w-4"/> Back to questions
                        </Button>
                    </>
                    )}
                </div>
                )}
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </Button>
                </form>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
