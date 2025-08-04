
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Bot, Send, X, CornerDownLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
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

const quickQuestions = [
    { text: "What is Tech TribeX?", id: "q1" },
    { text: "Who is the founder of Tech TribeX?", id: "q2" },
    { text: "What is the vision of Tech TribeX?", id: "q3" },
]

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/events", label: "Events" },
    { href: "/chapters", label: "Chapters" },
    { href: "/contact", label: "Contact Us" },
]

function BotMessageContent({ text }: { text: string }) {
    // Simple renderer for now, can be expanded to handle markdown
    return <div>{text}</div>;
}


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
      setMessages([
        { id: "hello", text: "Hi there! I'm the TribeX Navigator. How can I help you today? 👋", sender: "bot" }
      ])
      setActiveAction("ask")
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector("div[data-radix-scroll-area-viewport]");
    if (scrollViewport) {
      setTimeout(() => {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }, 100);
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
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300", isOpen ? "scale-0" : "scale-100")}>
        <Button onClick={() => setIsOpen(true)} size="icon" className="w-16 h-16 rounded-full shadow-lg">
          <Bot className="w-8 h-8" />
        </Button>
      </div>

      <div className={cn("fixed bottom-0 right-0 z-50 w-full h-full md:h-auto md:w-[440px] md:max-h-[85vh] md:bottom-6 md:right-6 transition-transform duration-300 transform-gpu", !isOpen ? "translate-y-full md:translate-y-0 md:scale-0" : "translate-y-0 md:scale-100")}>
        <Card className="flex flex-col h-full rounded-none md:rounded-xl shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
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

          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex items-start gap-2.5", message.sender === "user" ? "justify-end" : "justify-start")}>
                    {message.sender === "bot" && <Avatar className="w-8 h-8"><AvatarFallback>T</AvatarFallback></Avatar>}
                    <div className={cn(
                      "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <BotMessageContent text={message.text} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-2.5 justify-start">
                      <Avatar className="w-8 h-8"><AvatarFallback>T</AvatarFallback></Avatar>
                      <div className="bg-muted px-3.5 py-2.5 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '200ms'}}></span>
                            <span className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '400ms'}}></span>
                          </div>
                      </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="p-4 border-t bg-background">
            {activeAction && (
              <div className="mb-2">
                {activeAction === 'ask' && (
                  <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2">
                      {quickQuestions.map(q => (
                          <Button key={q.id} variant="outline" size="sm" className="justify-start h-auto py-2" onClick={(e) => handleSubmit(e, q.text)}>
                              <span className="text-left whitespace-normal">{q.text}</span>
                          </Button>
                      ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleQuickAction("navigate")}>Navigate Website</Button>
                  </div>
                )}
                 {activeAction === 'navigate' && (
                  <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                          {navLinks.map(link => (
                              <Button key={link.href} variant="outline" size="sm" asChild>
                                  <Link href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
                              </Button>
                          ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveAction('ask')}>
                          <CornerDownLeft className="mr-2 h-4 w-4"/> Back to questions
                      </Button>
                  </div>
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
                    <Send className="w-5 h-5" />
                </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}
