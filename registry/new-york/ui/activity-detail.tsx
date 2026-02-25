"use client"

import * as React from "react"
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

export interface ActivityThreadMessage {
  id: string
  sender: string
  time: string
  content: string
  isCurrent?: boolean
  to?: string
  cc?: string
  subject?: string
}

export interface ActivityParticipant {
  name: string
  role?: string
}

export interface ActivityDetailData {
  icon: React.ReactNode
  title: string
  details: string
  content?: string
  time: string
  source: string
  sourceIcon?: React.ReactNode
  type?: "email" | "call" | "meeting" | "signal"
  thread?: ActivityThreadMessage[]
  participants?: ActivityParticipant[]
  tags?: string[]
  externalUrl?: string
}

export interface ActivityDetailProps {
  activity: ActivityDetailData
  onBack?: () => void
  actions?: React.ReactNode
}

function EmailMessage({ msg, defaultExpanded }: { msg: ActivityThreadMessage; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <div className="border-b border-border/20 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-2.5 hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-foreground shrink-0">{msg.sender}</span>
            {!expanded && (
              <span className="text-xs text-muted-foreground truncate">&mdash; {msg.content.slice(0, 80)}{msg.content.length > 80 ? "..." : ""}</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-xs text-muted-foreground/60">{msg.time}</span>
            {expanded ? <ChevronUp className="w-3 h-3 text-muted-foreground/40" /> : <ChevronDown className="w-3 h-3 text-muted-foreground/40" />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="pb-3 animate-in fade-in duration-150">
          {(msg.to || msg.cc) && (
            <div className="text-xs text-muted-foreground/60 space-y-0.5 mb-2">
              {msg.to && <p>To: {msg.to}</p>}
              {msg.cc && <p>Cc: {msg.cc}</p>}
            </div>
          )}
          <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{msg.content}</div>
        </div>
      )}
    </div>
  )
}

export function ActivityDetail({ activity, onBack, actions }: ActivityDetailProps) {
  const [threadExpanded, setThreadExpanded] = React.useState(false)
  const hasThread = activity.thread && activity.thread.length > 0
  const isEmail = activity.type === "email"

  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-right-2 duration-200">
      {/* Back + header */}
      <div className="flex items-center justify-between mb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to activity
          </button>
        )}
        {activity.externalUrl && (
          <a
            href={activity.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Open in {activity.source}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Title block */}
      <div className="flex items-start gap-3 pb-4 border-b border-border/30">
        <div className="mt-0.5 w-8 h-8 rounded-md border border-border/60 bg-muted/30 flex items-center justify-center shrink-0 text-muted-foreground">
          {activity.sourceIcon ?? activity.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-foreground leading-snug">{activity.title}</h3>
          <p className="text-xs text-muted-foreground/60 mt-1">{activity.time} &middot; {activity.source}</p>
        </div>
      </div>

      {/* Tags */}
      {activity.tags && activity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 py-3 border-b border-border/30">
          {activity.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="shadow-none px-2 py-0 text-[11px] font-medium text-muted-foreground border-border"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Participants (non-email only; email shows to/cc per message) */}
      {!isEmail && activity.participants && activity.participants.length > 0 && (
        <div className="py-3 border-b border-border/30">
          <span className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">Participants</span>
          <div className="mt-2 space-y-1">
            {activity.participants.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{p.name}</span>
                {p.role && (
                  <>
                    <span className="text-muted-foreground/40">&middot;</span>
                    <span className="text-muted-foreground">{p.role}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body content (non-email, or email summary) */}
      {(!isEmail || !hasThread) && (
        <div className="py-4 border-b border-border/30">
          <p className="text-sm text-foreground/90 leading-relaxed">{activity.details}</p>
          {activity.content && (
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {activity.content}
            </div>
          )}
        </div>
      )}

      {/* Email context line when thread exists */}
      {isEmail && hasThread && (
        <div className="py-3 border-b border-border/30">
          <p className="text-sm text-muted-foreground leading-snug">{activity.details}</p>
        </div>
      )}

      {/* Thread: email vs generic */}
      {hasThread && isEmail ? (
        <div className="py-3 border-b border-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
              {activity.thread!.length} messages
            </span>
          </div>
          <div className="space-y-0">
            {activity.thread!.map((msg, i) => (
              <EmailMessage
                key={msg.id}
                msg={msg}
                defaultExpanded={i === activity.thread!.length - 1}
              />
            ))}
          </div>
        </div>
      ) : hasThread ? (
        <div className="py-3 border-b border-border/30">
          <button
            onClick={() => setThreadExpanded(!threadExpanded)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider"
          >
            Thread &middot; {activity.thread!.length} messages
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${threadExpanded ? "rotate-180" : ""}`} />
          </button>

          {threadExpanded && (
            <div className="mt-3 space-y-0 animate-in fade-in slide-in-from-top-1 duration-200">
              {activity.thread!.map((msg) => (
                <div
                  key={msg.id}
                  className={`py-2.5 border-b border-border/20 last:border-0 ${msg.isCurrent ? "bg-muted/20 -mx-2 px-2 rounded-sm" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Actions */}
      {actions && (
        <div className="pt-4">
          {actions}
        </div>
      )}
    </div>
  )
}
