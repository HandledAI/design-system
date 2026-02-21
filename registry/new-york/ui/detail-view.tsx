"use client"

import * as React from "react"
import { ArrowLeft, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Badge } from "./badge"

export function DetailViewHeader({
  title,
  breadcrumbs,
  badges,
  onBack,
}: {
  title: string
  breadcrumbs: React.ReactNode
  badges: React.ReactNode
  onBack?: () => void
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-muted-foreground hover:text-foreground -ml-2"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        <span className="text-muted-foreground/50">&middot;</span>
        {breadcrumbs}
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <div className="flex flex-wrap items-center gap-2">{badges}</div>
    </div>
  )
}

export function DetailViewSummary({
  title = "Here's what I found",
  children,
  sources,
}: {
  title?: string
  children: React.ReactNode
  sources?: React.ReactNode
}) {
  const [showSources, setShowSources] = React.useState(false)

  return (
    <div className="relative pl-4 mb-8">
      {/* Blue left border */}
      <div className="absolute left-0 top-1 bottom-1 w-1 bg-brand-purple rounded-full" />
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <ThumbsUp className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <ThumbsDown className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 text-sm text-foreground/90">
        {children}
      </div>

      {sources && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSources(!showSources)}
            className="h-6 px-0 text-xs font-semibold text-muted-foreground hover:text-foreground uppercase tracking-wider bg-transparent"
          >
            SOURCES
            {showSources ? (
              <ChevronUp className="w-3.5 h-3.5 ml-1" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            )}
          </Button>
          {showSources && <div className="mt-2 text-sm text-muted-foreground">{sources}</div>}
        </div>
      )}
    </div>
  )
}

export function Citation({ number }: { number: number | string }) {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted border border-border text-[9px] font-medium text-muted-foreground ml-1 align-middle cursor-pointer hover:bg-muted/80">
      {number}
    </span>
  )
}

export function DetailViewThread({
  title,
  actionCount,
  children,
}: {
  title: string
  actionCount?: number
  children: React.ReactNode
}) {
  return (
    <div className="mt-8 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</h3>
        {actionCount !== undefined && (
          <span className="text-sm text-muted-foreground">{actionCount} actions</span>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  )
}

export function ThreadMessage({
  icon,
  subject,
  time,
  messageCount,
  threadLink,
  sender,
  senderTime,
  children,
  isExpanded = true,
}: {
  icon?: React.ReactNode
  subject: string
  time: string
  messageCount?: number
  threadLink?: string
  sender?: string
  senderTime?: string
  children: React.ReactNode
  isExpanded?: boolean
}) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card hover:bg-muted/30 cursor-pointer">
        <div className="flex items-center gap-3">
          {icon || <MessageSquare className="w-4 h-4 text-muted-foreground" />}
          <span className="font-semibold text-sm">{subject}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {time}
          <ChevronUp className="w-4 h-4" />
        </div>
      </div>
      
      {/* Context info */}
      {messageCount !== undefined && (
        <div className="px-4 py-2 bg-muted/20 border-b border-border text-xs text-muted-foreground flex items-center gap-2">
          {messageCount} messages in this thread &middot;
          {threadLink && <a href={threadLink} className="underline hover:text-foreground">View thread</a>}
        </div>
      )}

      {/* Message Body */}
      {isExpanded && (
        <div className="p-4">
          {sender && (
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{sender}</span>
              {senderTime && <span className="text-xs text-muted-foreground">{senderTime}</span>}
            </div>
          )}
          <div className="text-sm text-foreground/90 space-y-4 leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
