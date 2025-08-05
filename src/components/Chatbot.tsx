
"use client"

import React, { useState, useRef, useEffect, memo } from "react"
import Link from "next/link"
import { Bot, Send, X, CornerDownLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { chat } from "@/ai/flows/chatbot-flow"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
}

type QuickActionType = "ask" | "navigate"

const predefinedQuestions: Record<string, string> = {
    "What is Tech Tribe?": "🚀 Tech Tribe is India's emerging tech-driven student community connecting, educating, and empowering tech enthusiasts nationwide!",
    "Who is the founder of Tech Tribe?": "👨‍💻 Swastik Mishra - a visionary leader who started this movement at K.R. Mangalam University, aiming to transform student tech engagement! Connect with him on LinkedIn: https://www.linkedin.com/in/myselfswastikmishra/",
    "What is the vision of Tech Tribe?": "🌍 To build the largest student tech ecosystem offering training, opportunities, and a platform for innovation and growth!"
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

    const renderTextWithLinks = (line: string, key: number) => {
        const parts = line.split(urlRegex);
        return (
            <React.Fragment key={key}>
                {parts.map((part, i) =>
                    urlRegex.test(part) ? (
                        <a
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary/80"
                        >
                            {part}
                        </a>
                    ) : (
                        part
                    )
                )}
            </React.Fragment>
        );
    };
    
    const blocks = text.split('\n').filter(line => line.trim() !== '');

    const groupedBlocks = blocks.reduce((acc, line) => {
        const isListItem = /^\s*[-•*]\s/.test(line);
        const lastGroup = acc[acc.length - 1];
        
        if (isListItem) {
            const cleanLine = line.replace(/^\s*[-•*]\s/, '');
            if (lastGroup && lastGroup.type === 'list') {
                lastGroup.items.push(cleanLine);
            } else {
                acc.push({ type: 'list', items: [cleanLine] });
            }
        } else {
            acc.push({ type: 'paragraph', lines: [line] });
        }
        return acc;
    }, [] as Array<{ type: 'paragraph'; lines: string[] } | { type: 'list'; items: string[] }>);


    return (
        <div className="text-sm" style={{ overflowWrap: 'break-word', maxWidth: '100%' }}>
            {groupedBlocks.map((block, blockIndex) => {
                if (block.type === 'list') {
                    return (
                        <ul key={blockIndex} className="list-disc pl-5 space-y-1">
                            {block.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    {renderTextWithLinks(item, itemIndex)}
                                </li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={blockIndex}>
                        {block.lines.map((line, lineIndex) => renderTextWithLinks(line, lineIndex))}
                    </p>
                );
            })}
        </div>
    );
});


export function Chatbot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<QuickActionType | null>(null)
  const { toast } = useToast()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setActiveAction(null);
  };

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      document.body.style.overflow = '';
      resetChat();
    } else {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0 && isMounted) {
        const timer = setTimeout(() => {
           setMessages([
              { id: "hello", text: "Hi there! I'm the TribeX Navigator. How can I help you today? 👋", sender: "bot" }
           ]);
           setActiveAction("ask");
       }, 100);
       return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, isMounted]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeAction]);

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

  const handleQuickAction = (action: QuickActionType) => {
    setActiveAction(action);
    if (action === "navigate") {
      const newNavMessage: Message = {
          id: `nav-prompt-${Date.now().toString()}-${Math.random().toString()}`,
          text: "Great! Where would you like to go? 🚀",
          sender: "bot"
      };
      setMessages(prev => [...prev, newNavMessage]);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button 
        onClick={() => handleSetIsOpen(true)} 
        size="icon" 
        className={cn(
            "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-transform duration-300",
            isOpen ? "scale-0" : "scale-100"
        )}
        aria-label="Open chat"
      >
        <Bot className="w-8 h-8" />
      </Button>

       <div className={cn(
        "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
        !isOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
       )}>
        <Card className={cn(
          "fixed flex flex-col h-full w-full overflow-hidden shadow-xl", // Mobile: full screen
          "md:h-[70vh] md:max-h-[700px] md:w-[440px] md:rounded-xl md:bottom-6 md:right-6 md:inset-auto" // Desktop: floating window
        )}>
          <CardHeader className="flex flex-row items-center justify-between flex-shrink-0 p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                 <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="bot avatar" />
                <AvatarFallback>TN</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-lg">TribeX Navigator</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleSetIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent ref={scrollAreaRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div 
                    key={message.id} 
                    className={cn(
                        "flex w-full items-start gap-3",
                         message.sender === 'user' && 'justify-end'
                    )}
                >
                  {message.sender === "bot" && <Avatar className="flex-shrink-0 w-8 h-8"><AvatarFallback>T</AvatarFallback></Avatar>}
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
                    <Avatar className="flex-shrink-0 w-8 h-8"><AvatarFallback>T</AvatarFallback></Avatar>
                    <div className="p-2.5 rounded-lg shadow-sm bg-muted">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></span>
                        </div>
                    </div>
                </div>
              )}
               {activeAction && !isLoading && (
                <div className="pt-4 space-y-2.5 transition-all duration-300">
                    {activeAction === 'ask' && (
                    <>
                        <p className="text-sm text-center text-muted-foreground">Or ask one of these questions:</p>
                        <div className="space-y-2">
                            {Object.keys(predefinedQuestions).map(q => (
                                <Button key={q} variant="outline" size="sm" className="w-full h-auto text-center justify-center py-2 whitespace-normal" onClick={(e) => handleSubmit(e, q)}>
                                    {q}
                                </Button>
                            ))}
                            <Button variant="outline" size="sm" className="w-full" onClick={() => handleQuickAction("navigate")}>Navigate Website</Button>
                        </div>
                    </>
                    )}
                    {activeAction === 'navigate' && (
                    <>
                        <p className="text-sm text-center text-muted-foreground">Where would you like to go?</p>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map(link => (
                                <Button key={link.href} variant="outline" size="sm" asChild>
                                    <Link href={link.href} onClick={() => handleSetIsOpen(false)}>{link.label}</Link>
                                </Button>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setActiveAction('ask')}>
                            <CornerDownLeft className="w-4 h-4 mr-2"/> Back to questions
                        </Button>
                    </>
                    )}
                </div>
                )}
          </CardContent>

          <CardFooter className="flex-shrink-0 p-4 border-t bg-background">
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    autoComplete="off"
                    className="text-base"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      {isLoading ? (
                          <div className="w-5 h-5 border-2 rounded-full border-primary-foreground/20 border-t-primary-foreground animate-spin"></div>
                      ) : (
                          <Send className="w-5 h-5" />
                      )}
                  </Button>
              </form>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

    