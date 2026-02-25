"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

export interface TimelineEvent {
  id: string
  icon: React.ReactNode
  title: React.ReactNode
  time: string
  preview?: React.ReactNode
  email?: {
    from: string
    fromEmail?: string
    to: string
    cc?: string
    bcc?: string
    date?: string
    subject?: string
    body: React.ReactNode
  }
  content?: React.ReactNode
  source?: {
    label: string
    url: string
  }
  defaultExpanded?: boolean
  isInteractive?: boolean
}

export interface TimelineActivityProps {
  events: TimelineEvent[]
  className?: string
}

export function TimelineActivity({ events, className }: TimelineActivityProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          isLast={index === events.length - 1}
        />
      ))}
    </div>
  )
}

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  const [expanded, setExpanded] = React.useState(event.defaultExpanded ?? false)
  const [showAllRecipients, setShowAllRecipients] = React.useState(false)
  const hasContent = !!event.content
  const hasEmail = !!event.email

  return (
    <div className="group relative flex gap-3.5">
      {!isLast && (
        <div className="absolute left-[9px] top-5 bottom-[-6px] w-px bg-border/60" />
      )}

      <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background">
        <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground ring-2 ring-background">
          {event.icon}
        </div>
      </div>

      <div className="flex-1 pb-5 pt-0.5">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="pr-4 text-[13px] leading-relaxed text-foreground">
            {event.title}
          </div>
          <span className="mt-0.5 shrink-0 whitespace-nowrap text-[11px] text-muted-foreground/70">
            {event.time}
          </span>
        </div>

        {(hasContent || hasEmail) && (
          <div className="mt-2">
            {event.isInteractive ? (
              hasEmail ? (
                <div className="overflow-hidden rounded-md border border-border/80 bg-muted/20">
                  <div
                    className={cn(
                      "px-3 py-2.5 text-sm",
                      !expanded && "cursor-pointer hover:bg-muted/30 transition-colors"
                    )}
                    onClick={() => !expanded && setExpanded(true)}
                  >
                    {expanded && event.email ? (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex min-w-0 items-baseline gap-1.5">
                              <span className="font-semibold text-foreground text-[13px] whitespace-nowrap">{event.email.from}</span>
                              {event.email.fromEmail && (
                                <span className="text-muted-foreground/60 text-xs truncate">{event.email.fromEmail}</span>
                              )}
                            </div>
                            {event.email.date && (
                              <span className="shrink-0 text-xs text-muted-foreground/50 whitespace-nowrap">{event.email.date}</span>
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="truncate">
                              To {event.email.to}
                              {!showAllRecipients && (event.email.cc || event.email.bcc) ? (
                                <>, ...</>
                              ) : null}
                              {showAllRecipients && event.email.cc ? (
                                <>, {event.email.cc}</>
                              ) : null}
                              {showAllRecipients && event.email.bcc ? (
                                <> <span className="text-muted-foreground/40">bcc</span> {event.email.bcc}</>
                              ) : null}
                            </span>
                            {(event.email.cc || event.email.bcc) && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowAllRecipients((prev) => !prev)
                                }}
                                className="shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                              >
                                <ChevronDown className={cn("h-3 w-3 transition-transform", showAllRecipients && "rotate-180")} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                          {event.email.body}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpanded(false)
                          }}
                          className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Show less <ChevronUp className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 text-muted-foreground">
                        <span className="line-clamp-1 pr-3 text-[13px]">
                          <span className="text-muted-foreground">{event.email?.from}</span>
                          <span className="mx-1.5 text-muted-foreground/40">&middot;</span>
                          {event.email?.subject ? (
                            <>
                              <span className="text-muted-foreground">{event.email.subject}</span>
                              <span className="mx-1.5 text-muted-foreground/40">&middot;</span>
                            </>
                          ) : null}
                          <span className="text-muted-foreground">{event.preview}</span>
                        </span>
                        <button className="flex shrink-0 items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors hover:text-foreground">
                          Expand <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md border border-border/80 bg-muted/20">
                  <div
                    className={cn(
                      "px-3 py-2.5 text-sm",
                      !expanded && "cursor-pointer hover:bg-muted/30 transition-colors"
                    )}
                    onClick={() => !expanded && setExpanded(true)}
                  >
                    {expanded ? (
                      <div className="space-y-2">
                        {event.content}
                        <div className="mt-2 flex items-center gap-3">
                          {event.source ? (
                            <a
                              href={event.source.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="mr-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                            >
                              Open in {event.source.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : null}
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                          >
                            Show less <ChevronUp className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 text-muted-foreground">
                        <span className="line-clamp-1 pr-3">
                          {event.preview ?? event.content}
                        </span>
                        <button className="flex shrink-0 items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors hover:text-foreground">
                          Expand <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="pr-2 text-sm leading-relaxed text-muted-foreground">
                {event.content}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
