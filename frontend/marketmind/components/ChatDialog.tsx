import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextAnimate } from "@/components/magicui/text-animate"

interface Message {
  role: string
  content: string
  isNew?: boolean
}

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  personaName: string
  systemPrompt: string
  messages: Message[]
  onMessagesUpdate: (messages: Message[]) => void
}

export function ChatDialog({
  open,
  onOpenChange,
  personaName,
  systemPrompt,
  messages,
  onMessagesUpdate,
}: ChatDialogProps) {
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Set isNew to false after animation completes
  useEffect(() => {
    const newMessages = messages.filter(m => m.isNew)
    if (newMessages.length > 0) {
      const timer = setTimeout(() => {
        const updatedMessages = messages.map(m => 
          m.isNew ? { ...m, isNew: false } : m
        )
        onMessagesUpdate(updatedMessages)
      }, 1000) // Match this with the animation duration
      
      return () => clearTimeout(timer)
    }
  }, [messages, onMessagesUpdate])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: "User", content: input }
    const newMessages = [...messages, userMessage]
    
    // Update with user message immediately
    onMessagesUpdate(newMessages)
    setInput("")
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate persona response with delay
    setTimeout(() => {
      const assistantMessage = {
        role: personaName,
        content: `This is a simulated response from ${personaName}. In a real implementation, this would be generated based on the system prompt and chat history.`,
        isNew: true
      }
      
      onMessagesUpdate([...newMessages, assistantMessage])
      setIsTyping(false)
    }, 1500) // 1.5 second delay
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Chat with {personaName}</DialogTitle>
        </DialogHeader>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-4"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col",
                  message.role === "User" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.role === "User"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-xs font-medium mb-1 text-muted-foreground">{message.role}</p>
                  {message.role === personaName && message.isNew ? (
                    <TextAnimate once={true} animation="blurIn" by="character" as="p" className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </TextAnimate>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start my-8">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm font-medium mb-1">{personaName}</p>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              disabled={isTyping}
            />
            <Button 
              onClick={handleSend} 
              size="icon"
              disabled={isTyping || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 