"use client"

import * as React from "react"
import { ArrowLeft, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"
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
          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider"
          >
            Sources
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", showSources && "rotate-180")} />
          </button>
          {showSources && <div className="mt-3">{sources}</div>}
        </div>
      )}
    </div>
  )
}

export type SourceDef = {
  id: number | string
  summary: string
  meta: string
}

export function Citation({
  number,
  source,
}: {
  number: number | string
  source?: SourceDef
}) {
  const badge = (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted border border-border text-[9px] font-medium text-muted-foreground ml-1 align-middle cursor-pointer select-none hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-150">
      {number}
    </span>
  )

  if (!source) return badge

  return (
    <HoverCardPrimitive.Root openDelay={200} closeDelay={100}>
      <HoverCardPrimitive.Trigger asChild>{badge}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          align="start"
          sideOffset={6}
          className="z-50 w-72 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <div className="p-3 cursor-pointer hover:bg-muted/40 rounded-md transition-colors">
            <div className="text-xs text-foreground leading-relaxed">{source.summary}</div>
            <div className="text-[11px] text-muted-foreground/60 mt-1.5">{source.meta}</div>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

export function SourceList({ sources }: { sources: SourceDef[] }) {
  return (
    <div className="space-y-0.5">
      {sources.map((source) => (
        <SourceItem key={source.id} source={source} />
      ))}
    </div>
  )
}

function SourceItem({ source }: { source: SourceDef }) {
  return (
    <div className="group flex items-start gap-3 cursor-pointer py-2.5 px-2 -mx-2 rounded-lg text-sm transition-colors hover:bg-muted/40">
      <span className="flex-shrink-0 mt-0.5 w-5 text-right text-xs font-medium text-muted-foreground/50 group-hover:text-foreground/70 transition-colors">
        {source.id}
      </span>
      <div className="text-muted-foreground leading-relaxed min-w-0">
        <span>{source.summary}</span>
        <span className="mx-1.5 text-muted-foreground/30">|</span>
        <span className="text-xs text-muted-foreground/50">{source.meta}</span>
      </div>
    </div>
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
