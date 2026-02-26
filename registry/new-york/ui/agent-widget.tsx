"use client"

import * as React from "react"
import { Mic, PhoneOff, Send, Sparkles } from "lucide-react"
import { cn } from "../../../lib/utils"
import { Message, MessageContent, MessageAvatar } from "./message"

export type AgentWidgetStatus = "idle" | "connecting" | "connected" | "error"
export type AgentWidgetMode = "listening" | "speaking" | null

export interface AgentWidgetMessage {
  from: "user" | "assistant"
  text: string
}

export interface AgentWidgetProps {
  status?: AgentWidgetStatus
  mode?: AgentWidgetMode
  messages?: AgentWidgetMessage[]
  onSendMessage?: (text: string) => void
  onEndSession?: () => void
  inputMode?: "voice" | "text" | "voice+text"
  visualSlot?: React.ReactNode
  assistantAvatarSlot?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function AgentWidget({
  status = "idle",
  mode = null,
  messages = [],
  onSendMessage,
  onEndSession,
  inputMode = "voice+text",
  visualSlot,
  assistantAvatarSlot,
  header,
  footer,
  className,
}: AgentWidgetProps) {
  const [textInput, setTextInput] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!textInput.trim()) return
    onSendMessage?.(textInput)
    setTextInput("")
  }

  const showTextInput = inputMode === "text" || inputMode === "voice+text"
  const isConnected = status === "connected"

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      {header}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2 opacity-50">
            {visualSlot ?? (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            <p className="text-sm">
              {status === "connecting" ? "Connecting..." : "Conversation started..."}
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <Message key={idx} from={msg.from}>
                {msg.from === "assistant" && assistantAvatarSlot ? (
                  <MessageAvatar>{assistantAvatarSlot}</MessageAvatar>
                ) : null}
                <MessageContent>{msg.text.replace(/^["']|["']$/g, "")}</MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Voice status indicator */}
      {inputMode !== "text" && isConnected && (
        <div className="flex justify-center py-2 bg-background">
          {mode === "listening" ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">Listening</span>
            </div>
          ) : mode === "speaking" ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border hover:border-primary transition-colors"
            >
              <Mic className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Talk to interrupt</span>
            </button>
          ) : null}
        </div>
      )}

      {/* Input area */}
      <div className="flex-none p-4 bg-background border-t border-border">
        {showTextInput ? (
          <div className="relative border-2 border-foreground rounded-2xl p-4 bg-background shadow-sm transition-all focus-within:shadow-md">
            <textarea
              className="w-full resize-none border-none focus:ring-0 p-0 text-sm placeholder:text-muted-foreground min-h-[60px] bg-transparent outline-none focus:outline-none pr-24"
              placeholder="Send a message..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              {onEndSession && (
                <button
                  type="button"
                  onClick={onEndSession}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors group"
                  title="End session"
                >
                  <PhoneOff className="w-5 h-5 text-foreground group-hover:text-destructive transition-colors" />
                </button>
              )}
              <button
                type="button"
                onClick={handleSend}
                disabled={!textInput.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted-foreground hover:bg-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-background shadow-sm"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
        ) : onEndSession ? (
          <button
            type="button"
            onClick={onEndSession}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-destructive/5 hover:bg-destructive/10 text-destructive border border-destructive/20 rounded-full font-medium transition-all"
          >
            <span className="w-2 h-2 bg-destructive rounded-full" />
            End Session
          </button>
        ) : null}
      </div>

      {footer}
    </div>
  )
}
