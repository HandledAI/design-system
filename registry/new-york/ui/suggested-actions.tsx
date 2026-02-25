"use client"

import * as React from "react"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MessageSquare,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  Trash,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Check,
  RefreshCw,
  ArrowLeft,
  Mail,
  Phone,
  X,
  Users,
  ExternalLink,
  Copy,
  PenLine,
} from "lucide-react"
import { Button } from "./button"
import { BRAND_ICONS } from "@/lib/icons"

// ---------------------------------------------------------------------------
// Brand Icons (image-based from registry)
// ---------------------------------------------------------------------------

function BrandIcon({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ""} object-contain`}
      draggable={false}
    />
  )
}

function getActionTypeIcon(type: string, className?: string) {
  switch (type) {
    case "email":
      return <BrandIcon src={BRAND_ICONS.gmail.icon} alt="Gmail" className={className} />
    case "slack":
      return <BrandIcon src={BRAND_ICONS.slack} alt="Slack" className={className} />
    case "ticket":
      return <BrandIcon src={BRAND_ICONS.zendesk} alt="Zendesk" className={className} />
    case "call":
      return <Phone className={className} />
    default:
      return <Mail className={className} />
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SuggestedContact {
  name: string
  role: string
  email?: string
  emails?: string[]
  phone?: string
  phones?: string[]
  confirmed: boolean
  salesforceUrl?: string
  lastActivity?: {
    date: string
    type: string
  }
}

export interface SuggestedActionThreadMessage {
  id: string
  from: string
  initials: string
  time: string
  preview: string
  content: string
}

export interface SuggestedActionReplyTo {
  from: string
  time: string
  content: string
  channel?: string
}

export interface SuggestedActionTicket {
  system: string
  priority: string
  type: string
  subject: string
  description: string
  assignee?: string
  tags?: string[]
}

export interface SuggestedActionFollowUp {
  enabled: boolean
  days: number
}

export interface SuggestedActionEmailMeta {
  from: string
  fromEmail: string
  to?: SuggestedContact
  cc?: SuggestedContact[]
  bcc?: string
  subject?: string
}

export interface SuggestedActionCallMeta {
  contact?: SuggestedContact
  talkTrack: string
  allowDispatchAgent?: boolean
}

export interface SuggestedAction {
  id: number | string
  type: "email" | "ticket" | "slack" | "call"
  label: string
  status: "pending" | "sent" | "dismissed"
  content?: string
  replyTo?: SuggestedActionReplyTo
  threadMessages?: SuggestedActionThreadMessage[]
  ticket?: SuggestedActionTicket
  followUp?: SuggestedActionFollowUp
  emailMeta?: SuggestedActionEmailMeta
  callMeta?: SuggestedActionCallMeta
}

// ---------------------------------------------------------------------------
// AiEditPanel
// ---------------------------------------------------------------------------

const aiEditPills = ["Shorten it", "Make sound more like me", "Make longer", "Other"]

function AiEditPanel({ onApply }: { onApply?: (pills: string[], description: string) => void }) {
  const [selectedPills, setSelectedPills] = React.useState<string[]>([])
  const [description, setDescription] = React.useState("")
  const [applying, setApplying] = React.useState(false)

  const togglePill = React.useCallback((pill: string) => {
    setSelectedPills((prev) => (prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]))
  }, [])

  const handleApply = React.useCallback(() => {
    if (selectedPills.length === 0 && description.trim().length === 0) return
    setApplying(true)
    onApply?.(selectedPills, description)
    setTimeout(() => {
      setApplying(false)
      setSelectedPills([])
      setDescription("")
    }, 2000)
  }, [selectedPills, description, onApply])

  const hasInput = selectedPills.length > 0 || description.trim().length > 0

  return (
    <div className="mb-4 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex flex-wrap gap-1.5">
        {aiEditPills.map((pill) => (
          <button
            key={pill}
            onClick={() => togglePill(pill)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
              selectedPills.includes(pill)
                ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                : "bg-background text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {pill}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-muted-foreground/50"
          placeholder="Describe changes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hasInput) handleApply()
          }}
        />
        <button
          onClick={handleApply}
          disabled={!hasInput || applying}
          className={`px-4 h-9 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
            hasInput && !applying
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {applying ? (
            <>
              <Sparkles className="w-3 h-3 animate-pulse" />
              Applying...
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DraftFeedbackInline
// ---------------------------------------------------------------------------

const positivePills = ["Tone", "Personalization", "Length", "CTA", "Other"]
const negativePills = ["Too formal", "Too casual", "Too long", "Missing context", "Wrong angle", "Factual error", "Other"]

function DraftFeedbackInline({
  onRegenerateRequest,
  onSubmitFeedback,
  onDiscardRequest,
}: {
  onRegenerateRequest?: (pills: string[], detail: string) => void
  onSubmitFeedback?: (type: "up" | "down", pills: string[], detail: string) => void
  onDiscardRequest?: (pills: string[], detail: string) => void
}) {
  const [thumbState, setThumbState] = React.useState<"up" | "down" | null>(null)
  const [selectedPills, setSelectedPills] = React.useState<string[]>([])
  const [detailText, setDetailText] = React.useState("")
  const [noted, setNoted] = React.useState(false)
  const [regenerated, setRegenerated] = React.useState(false)

  const togglePill = React.useCallback((pill: string) => {
    setSelectedPills((prev) => (prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]))
  }, [])

  const handleSubmit = React.useCallback(() => {
    if (!thumbState) return
    onSubmitFeedback?.(thumbState, selectedPills, detailText)
    setNoted(true)
    setTimeout(() => {
      setThumbState(null)
      setSelectedPills([])
      setDetailText("")
      setNoted(false)
    }, 3000)
  }, [thumbState, selectedPills, detailText, onSubmitFeedback])

  const handleRegenerate = React.useCallback(() => {
    if (!thumbState) return
    onRegenerateRequest?.(selectedPills, detailText)
    setRegenerated(true)
    setTimeout(() => {
      setThumbState(null)
      setSelectedPills([])
      setDetailText("")
      setRegenerated(false)
    }, 3000)
  }, [thumbState, selectedPills, detailText, onRegenerateRequest])

  const handleDiscard = React.useCallback(() => {
    if (!thumbState) return
    onDiscardRequest?.(selectedPills, detailText)
  }, [thumbState, selectedPills, detailText, onDiscardRequest])

  if (noted) {
    return (
      <div className="flex items-center gap-1.5 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
        <Check className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-xs text-muted-foreground">Feedback recorded</span>
      </div>
    )
  }

  if (regenerated) {
    return (
      <div className="py-2 animate-in fade-in slide-in-from-top-1 duration-200">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
          <RefreshCw className="w-3 h-3 text-indigo-500 animate-spin" />
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Regenerating draft...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground font-medium">How&apos;s this draft?</span>
        <div className="flex gap-1">
          <button
            onClick={() => {
              setThumbState(thumbState === "up" ? null : "up")
              setSelectedPills([])
              setDetailText("")
            }}
            className={`p-1.5 rounded transition-colors ${
              thumbState === "up"
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className="w-4 h-4" fill={thumbState === "up" ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => {
              setThumbState(thumbState === "down" ? null : "down")
              setSelectedPills([])
              setDetailText("")
            }}
            className={`p-1.5 rounded transition-colors ${
              thumbState === "down"
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsDown className="w-4 h-4" fill={thumbState === "down" ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {thumbState && (
        <div className="pt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <span className="text-xs text-muted-foreground mb-2 block font-medium">
              {thumbState === "up" ? "What worked well?" : "What needs improvement?"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(thumbState === "up" ? positivePills : negativePills).map((pill) => (
                <button
                  key={pill}
                  onClick={() => togglePill(pill)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    selectedPills.includes(pill)
                      ? thumbState === "up"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                      : "bg-background text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={detailText}
            onChange={(e) => setDetailText(e.target.value)}
            placeholder={thumbState === "up" ? "Add specific praise (optional)..." : "Provide specific instructions (optional)..."}
            className="w-full text-xs bg-background border border-border rounded-md px-2.5 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none min-h-[60px]"
          />

          <div className="flex items-center gap-2 pt-1">
            {thumbState === "down" ? (
              <>
                <button
                  onClick={handleRegenerate}
                  disabled={selectedPills.length === 0 && detailText.length === 0}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    selectedPills.length > 0 || detailText.length > 0
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate draft
                </button>
                <button
                  onClick={handleDiscard}
                  className="flex-1 py-1.5 rounded-md text-xs font-medium transition-colors border bg-background text-foreground border-border hover:bg-muted/50 flex items-center justify-center gap-1.5"
                >
                  Discard draft
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors bg-foreground text-background hover:bg-foreground/90 border-transparent"
              >
                Submit feedback
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// EditorToolbar
// ---------------------------------------------------------------------------

function EditorToolbar() {
  return (
    <div className="flex items-center gap-1 px-4 py-2 border-t border-border bg-muted/5 flex-wrap">
      <div className="flex items-center mr-2 gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-4 bg-border mx-1 shrink-0" />
      <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-muted-foreground gap-1 px-2 hover:text-foreground shrink-0">
        Sans Serif <ChevronDown className="h-3 w-3" />
      </Button>
      <div className="w-px h-4 bg-border mx-1 shrink-0" />
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-px h-4 bg-border mx-1 shrink-0" />
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <List className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1" />
      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-600 hover:bg-red-50 shrink-0 ml-auto">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FollowUpToggle (simple checkbox-based switch)
// ---------------------------------------------------------------------------

function FollowUpToggle({
  checked,
  onCheckedChange,
  days,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  days: number
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span>Auto-draft follow-up in {days}d if no response</span>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
          checked ? "bg-foreground" : "bg-muted"
        }`}
      >
        <span
          className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ContactCard
// ---------------------------------------------------------------------------

function ContactCard({
  contact,
  onConfirm,
  onRemove,
  onSwap,
  variant = "primary",
  showPhone = false,
}: {
  contact: SuggestedContact
  onConfirm?: () => void
  onRemove?: () => void
  onSwap?: () => void
  variant?: "primary" | "secondary" | "alternative"
  showPhone?: boolean
}) {
  const [selectedEmail, setSelectedEmail] = React.useState(
    contact.email ?? contact.emails?.[0] ?? ""
  )
  const [selectedPhone, setSelectedPhone] = React.useState(
    contact.phone ?? contact.phones?.[0] ?? ""
  )
  const [showEmailPicker, setShowEmailPicker] = React.useState(false)
  const [showPhonePicker, setShowPhonePicker] = React.useState(false)
  const hasMultipleEmails = (contact.emails?.length ?? 0) > 1
  const hasMultiplePhones = (contact.phones?.length ?? 0) > 1
  const initials = contact.name.split(" ").map((n) => n[0]).join("")

  if (variant === "alternative") {
    const detail = showPhone
      ? contact.phone ?? contact.phones?.[0] ?? ""
      : contact.email ?? contact.emails?.[0] ?? ""
    return (
      <button
        onClick={onSwap}
        className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-muted/50 rounded-md transition-colors group"
      >
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-foreground">{contact.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {contact.role}{detail ? ` · ${detail}` : ""}
          </div>
        </div>
        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          Select
        </span>
      </button>
    )
  }

  if (variant === "secondary") {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/40 rounded-md text-sm group">
        <span className="text-foreground text-xs">{contact.name}</span>
        <span className="text-muted-foreground text-xs truncate">
          {contact.email ?? selectedEmail}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    )
  }

  const needsConfirmation = !contact.confirmed && !!onConfirm

  return (
    <div
      className={`flex items-start gap-3 rounded-md ${
        needsConfirmation ? "border border-emerald-200/70 bg-emerald-50/40 p-2.5" : ""
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0 mt-0.5">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">{contact.name}</span>
          <span className="text-xs text-muted-foreground">{contact.role}</span>
          {contact.confirmed && (
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-3 w-3" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {showPhone ? (
            <>
              <span className="text-xs text-muted-foreground">{selectedPhone}</span>
              {hasMultiplePhones && (
                <div className="relative">
                  <button
                    onClick={() => setShowPhonePicker(!showPhonePicker)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showPhonePicker && (
                    <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 py-1 min-w-[180px]">
                      {contact.phones!.map((p) => (
                        <button
                          key={p}
                          onClick={() => { setSelectedPhone(p); setShowPhonePicker(false) }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted/50 transition-colors ${
                            p === selectedPhone ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">{selectedEmail}</span>
              {hasMultipleEmails && (
                <div className="relative">
                  <button
                    onClick={() => setShowEmailPicker(!showEmailPicker)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showEmailPicker && (
                    <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 py-1 min-w-[220px]">
                      {contact.emails!.map((e) => (
                        <button
                          key={e}
                          onClick={() => { setSelectedEmail(e); setShowEmailPicker(false) }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted/50 transition-colors ${
                            e === selectedEmail ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {(onRemove || (!contact.confirmed && onConfirm)) && (
        <div className="ml-2 flex items-center gap-1.5 shrink-0 self-center">
          {!contact.confirmed && onConfirm && (
            <button
              onClick={onConfirm}
              className="h-7 rounded-md border border-emerald-700 bg-emerald-700 px-2.5 text-xs font-semibold text-white hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
            >
              Confirm recipient
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              aria-label="Remove contact"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AccountContactsPopover
// ---------------------------------------------------------------------------

function AccountContactsPopover({
  contacts,
  onSelect,
  onSelectTo,
  onSelectCc,
  onSelectBcc,
  onViewAll,
  onOpenRecentActivity,
  trigger,
}: {
  contacts: SuggestedContact[]
  onSelect: (contact: SuggestedContact) => void
  onSelectTo?: (contact: SuggestedContact) => void
  onSelectCc?: (contact: SuggestedContact) => void
  onSelectBcc?: (contact: SuggestedContact) => void
  onViewAll?: () => void
  onOpenRecentActivity?: () => void
  trigger: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [popoverStyle, setPopoverStyle] = React.useState<React.CSSProperties>({})

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const popoverWidth = Math.min(448, window.innerWidth - 32)
      let left = rect.right - popoverWidth
      if (left < 16) left = 16
      if (left + popoverWidth > window.innerWidth - 16) left = window.innerWidth - 16 - popoverWidth
      setPopoverStyle({ position: "fixed", top: rect.bottom + 4, left })
    }
  }, [open])

  return (
    <div>
      <div ref={triggerRef} onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div style={popoverStyle} className="fixed bg-background border border-border rounded-lg shadow-xl z-50 w-[28rem] max-w-[calc(100vw-2rem)] py-2 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wide">
              Account Contacts
            </div>
            <div className="max-h-48 overflow-y-auto">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  role="button"
                  onClick={() => { (onSelectTo ?? onSelect)(c); setOpen(false) }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground shrink-0">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="truncate text-sm font-medium text-foreground">{c.name}</div>
                    <div className="truncate text-xs text-muted-foreground leading-tight">
                      {c.role} · {c.email ?? c.emails?.[0] ?? c.phone ?? c.phones?.[0] ?? ""}
                    </div>
                    {c.lastActivity && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenRecentActivity?.()
                          setOpen(false)
                        }}
                        className="mt-1.5 flex max-w-full items-center gap-1.5 overflow-hidden rounded-md border border-border/70 bg-muted/30 px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Clock className="w-3 h-3 shrink-0" />
                        <span className="shrink-0 font-medium">Last activity</span>
                        <span className="shrink-0 text-muted-foreground/60">·</span>
                        <span className="shrink-0">{c.lastActivity.date}</span>
                        <span className="shrink-0 text-muted-foreground/60">·</span>
                        <span className="truncate capitalize">{c.lastActivity.type}</span>
                      </button>
                    )}
                  </div>
                  <div className="ml-2 flex items-center gap-1.5 shrink-0">
                    {onSelectTo && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectTo(c)
                          setOpen(false)
                        }}
                        className="h-6 rounded border border-border bg-background px-1.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      >
                        To
                      </button>
                    )}
                    {onSelectCc && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectCc(c)
                          setOpen(false)
                        }}
                        className="h-6 rounded border border-border bg-background px-1.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      >
                        Cc
                      </button>
                    )}
                    {onSelectBcc && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectBcc(c)
                          setOpen(false)
                        }}
                        className="h-6 rounded border border-border bg-background px-1.5 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      >
                        Bcc
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (c.salesforceUrl) {
                          window.open(c.salesforceUrl, "_blank", "noopener,noreferrer")
                        } else {
                          onViewAll?.()
                        }
                      }}
                      className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted/40 transition-colors shrink-0"
                      aria-label={`Open ${c.name} in Salesforce`}
                    >
                      <img src={BRAND_ICONS.salesforce} alt="Salesforce" className="w-3.5 h-3.5 object-contain" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {onViewAll && (
              <>
                <div className="h-px bg-border mx-3 my-1" />
                <button
                  onClick={() => { onViewAll(); setOpen(false) }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View all contacts
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmailHeader (Notion Mail style)
// ---------------------------------------------------------------------------

function EmailHeader({
  fromName,
  fromEmail,
  toContacts,
  ccContacts,
  initialSubject = "",
  accountContacts,
  bccContacts,
  onAddToContact,
  onRemoveToContact,
  onConfirmToContact,
  onUpdateToContact,
  onCcAdd,
  onCcRemove,
  onBccAdd,
  onBccRemove,
  onOpenAccountDetails,
  onOpenRecentActivity,
  showSubject = false,
}: {
  fromName: string
  fromEmail: string
  toContacts: SuggestedContact[]
  ccContacts?: SuggestedContact[]
  initialSubject?: string
  accountContacts?: SuggestedContact[]
  bccContacts?: SuggestedContact[]
  onAddToContact?: (contact: SuggestedContact) => void
  onRemoveToContact?: (index: number) => void
  onConfirmToContact?: (index: number) => void
  onUpdateToContact?: (index: number, contact: SuggestedContact) => void
  onCcAdd?: (contact: SuggestedContact) => void
  onCcRemove?: (index: number) => void
  onBccAdd?: (contact: SuggestedContact) => void
  onBccRemove?: (index: number) => void
  onOpenAccountDetails?: () => void
  onOpenRecentActivity?: () => void
  showSubject?: boolean
}) {
  const hasUnconfirmedTo = toContacts.some((c) => !c.confirmed)
  const [expandedToIndex, setExpandedToIndex] = React.useState<number | null>(null)
  const [showCcBcc, setShowCcBcc] = React.useState(
    !!((ccContacts?.length ?? 0) > 0 || (bccContacts?.length ?? 0) > 0)
  )
  const [manualTo, setManualTo] = React.useState("")
  const [manualCc, setManualCc] = React.useState("")
  const [manualBcc, setManualBcc] = React.useState("")
  const [subject, setSubject] = React.useState(initialSubject)

  React.useEffect(() => {
    if ((ccContacts?.length ?? 0) > 0 || (bccContacts?.length ?? 0) > 0) {
      setShowCcBcc(true)
    }
  }, [ccContacts, bccContacts])

  return (
    <div className="mx-4 mt-3 rounded-md border border-border/60 bg-muted/[0.16] text-sm">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border/30">
        <span className="text-xs text-muted-foreground w-10 shrink-0">From</span>
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-sm text-foreground">{fromName}</span>
          <span className="text-xs text-muted-foreground truncate">{fromEmail}</span>
        </div>
      </div>

      <div className={`flex items-start gap-3 px-4 py-2 border-b border-border/30 ${hasUnconfirmedTo ? "bg-amber-50/35" : ""}`}>
        <span className="text-xs text-muted-foreground w-10 shrink-0 mt-1.5">To</span>
        <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
            {toContacts.map((contact, index) => (
              <div
                key={`${contact.name}-${index}`}
                onClick={() => setExpandedToIndex((prev) => (prev === index ? null : index))}
                className={`inline-flex max-w-[300px] cursor-pointer items-start gap-2 rounded-md border px-2 py-1 text-xs ${
                  contact.confirmed
                    ? "border-border/80 bg-background text-foreground"
                    : "border-amber-300 bg-amber-50 text-amber-800"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium leading-none">{contact.name}</span>
                    {contact.confirmed && <Check className="h-3 w-3 text-emerald-600" />}
                  </div>
                  <div className="mt-0.5 truncate text-muted-foreground">
                    {contact.email ?? contact.emails?.[0] ?? "no email"}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {!contact.confirmed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onConfirmToContact?.(index)
                      }}
                      className="h-6 rounded px-1.5 text-[10px] font-semibold hover:bg-amber-100"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveToContact?.(index)
                      setExpandedToIndex((prev) => (prev === index ? null : prev))
                    }}
                    className="rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    aria-label="Remove recipient"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            <input
              type="text"
              value={manualTo}
              onChange={(e) => setManualTo(e.target.value)}
              placeholder={toContacts.length ? "Add recipient..." : "Type a name or email..."}
              className="min-w-[140px] flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 py-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && manualTo.trim()) {
                  onAddToContact?.({ name: manualTo.trim(), role: "", email: manualTo.trim(), confirmed: true })
                  setManualTo("")
                }
              }}
            />
          </div>
          {expandedToIndex !== null && toContacts[expandedToIndex] && (
            <div className="mt-2 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-foreground text-sm">
                  {toContacts[expandedToIndex].name}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const contact = toContacts[expandedToIndex]
                    if (contact.salesforceUrl) {
                      window.open(contact.salesforceUrl, "_blank", "noopener,noreferrer")
                    } else {
                      onOpenAccountDetails?.()
                    }
                  }}
                  className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted/40 transition-colors shrink-0"
                  aria-label="Open in Salesforce"
                >
                  <img src={BRAND_ICONS.salesforce} alt="Salesforce" className="w-3.5 h-3.5 object-contain" />
                </button>
              </div>
              {toContacts[expandedToIndex].role && (
                <div className="mt-1">{toContacts[expandedToIndex].role}</div>
              )}
              {(toContacts[expandedToIndex].emails?.length ?? 0) > 0 ? (
                <div className="mt-2">
                  <div className="text-[11px] text-muted-foreground/70 mb-1">Send using</div>
                  <select
                    className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground"
                    value={toContacts[expandedToIndex].email ?? toContacts[expandedToIndex].emails?.[0] ?? ""}
                    onChange={(e) =>
                      onUpdateToContact?.(expandedToIndex, {
                        ...toContacts[expandedToIndex],
                        email: e.target.value,
                      })
                    }
                  >
                    {toContacts[expandedToIndex].emails?.map((emailOption) => (
                      <option key={emailOption} value={emailOption}>
                        {emailOption}
                      </option>
                    ))}
                  </select>
                </div>
              ) : toContacts[expandedToIndex].email ? (
                <div className="mt-1">{toContacts[expandedToIndex].email}</div>
              ) : null}
              {(toContacts[expandedToIndex].phones?.length ?? 0) > 0 ? (
                <div className="mt-1">{toContacts[expandedToIndex].phones?.join(" · ")}</div>
              ) : toContacts[expandedToIndex].phone ? (
                <div className="mt-1">{toContacts[expandedToIndex].phone}</div>
              ) : null}
            </div>
          )}
          <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
          {accountContacts && accountContacts.length > 0 && (
            <AccountContactsPopover
              contacts={accountContacts}
              onSelect={(c) => onAddToContact?.({ ...c, confirmed: true })}
              onSelectTo={(c) => onAddToContact?.({ ...c, confirmed: true })}
              onSelectCc={(c) => onCcAdd?.({ ...c, confirmed: true })}
              onSelectBcc={(c) => onBccAdd?.({ ...c, confirmed: true })}
              onViewAll={onOpenAccountDetails}
                onOpenRecentActivity={onOpenRecentActivity}
              trigger={
                <button className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                  Contacts
                </button>
              }
            />
          )}
          <button
            type="button"
            onClick={onOpenAccountDetails}
            className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            Account details
          </button>
          <button
            type="button"
            onClick={() => setShowCcBcc(true)}
            className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            Add Cc/Bcc
          </button>
          </div>
        </div>
      </div>

      {showCcBcc && (
        <div className="flex items-start gap-3 px-4 py-2 border-b border-border/30 animate-in fade-in slide-in-from-top-1 duration-150">
          <span className="text-xs text-muted-foreground w-10 shrink-0 mt-1.5">Cc</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {ccContacts?.map((c, i) => (
                <ContactCard key={i} contact={c} variant="secondary" onRemove={() => onCcRemove?.(i)} />
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualCc}
                  onChange={(e) => setManualCc(e.target.value)}
                  placeholder="Add Cc..."
                  className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 py-1 w-28"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && manualCc.trim()) {
                      onCcAdd?.({ name: manualCc.trim(), role: "", email: manualCc.trim(), confirmed: true })
                      setManualCc("")
                    }
                  }}
                />
                {accountContacts && accountContacts.length > 0 && (
                  <AccountContactsPopover
                    contacts={accountContacts}
                    onSelect={(c) => onCcAdd?.(c)}
                    onViewAll={onOpenAccountDetails}
                    onOpenRecentActivity={onOpenRecentActivity}
                    trigger={
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Users className="w-3 h-3" />
                      </button>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCcBcc && (
        <div className="flex items-start gap-3 px-4 py-2 border-b border-border/30 animate-in fade-in slide-in-from-top-1 duration-150">
          <span className="text-xs text-muted-foreground w-10 shrink-0 mt-1.5">Bcc</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {bccContacts?.map((c, i) => (
                <ContactCard key={`${c.name}-${i}`} contact={c} variant="secondary" onRemove={() => onBccRemove?.(i)} />
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualBcc}
                  onChange={(e) => setManualBcc(e.target.value)}
                  placeholder="Add Bcc..."
                  className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 py-1 w-28"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && manualBcc.trim()) {
                      onBccAdd?.({ name: manualBcc.trim(), role: "", email: manualBcc.trim(), confirmed: true })
                      setManualBcc("")
                    }
                  }}
                />
                {accountContacts && accountContacts.length > 0 && (
                  <AccountContactsPopover
                    contacts={accountContacts}
                    onSelect={(c) => onBccAdd?.(c)}
                    onViewAll={onOpenAccountDetails}
                    onOpenRecentActivity={onOpenRecentActivity}
                    trigger={
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Users className="w-3 h-3" />
                      </button>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSubject && (
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border/30">
          <span className="text-xs text-muted-foreground w-10 shrink-0">Subj</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 py-1 font-medium"
          />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SignatureBlock
// ---------------------------------------------------------------------------

function SignatureBlock({
  signature,
  enabled,
  onToggle,
}: {
  signature: string
  enabled: boolean
  onToggle: () => void
}) {
  if (!enabled) {
    return (
      <div className="px-3 py-2 border-t border-border/30">
        <button
          onClick={onToggle}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <PenLine className="w-3 h-3" />
          Add signature
        </button>
      </div>
    )
  }

  return (
    <div className="px-3 py-2 border-t border-border/30 bg-background/40">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground/60">--</span>
        <button onClick={onToggle} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Remove
        </button>
      </div>
      <div className="text-xs text-muted-foreground/70 whitespace-pre-line leading-relaxed">
        {signature}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SuggestedActionCard
// ---------------------------------------------------------------------------

function SuggestedActionCard({
  action,
  onDismiss,
  onSend,
  onSaveDraft,
  accountContacts,
  signature,
  onDuplicate,
  onOpenAccountDetails,
  onOpenRecentActivity,
  onMarkComplete,
  onDispatchAgent,
}: {
  action: SuggestedAction
  onDismiss?: (id: number | string) => void
  onSend?: (id: number | string) => void
  onSaveDraft?: (id: number | string) => void
  accountContacts?: SuggestedContact[]
  signature?: string
  onDuplicate?: (id: number | string) => void
  onOpenAccountDetails?: () => void
  onOpenRecentActivity?: () => void
  onMarkComplete?: (id: number | string) => void
  onDispatchAgent?: (id: number | string) => void
}) {
  const isCall = action.type === "call"
  const [expanded, setExpanded] = React.useState(action.type === "email" || isCall)
  const [content, setContent] = React.useState(
    isCall
      ? action.callMeta?.talkTrack ?? ""
      : action.content?.replace(/<\/p>/gi, "\n\n").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\n\s*\n/g, "\n\n") ?? ""
  )
  const [showAiEdit, setShowAiEdit] = React.useState(false)
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)
  const [followUpEnabled, setFollowUpEnabled] = React.useState(action.followUp?.enabled ?? false)
  const [threadExpanded, setThreadExpanded] = React.useState(false)
  const [expandedMessageId, setExpandedMessageId] = React.useState<string | null>(null)
  const [replyingToMessageId, setReplyingToMessageId] = React.useState<string | null>(null)

  const [ticketPriority, setTicketPriority] = React.useState(action.ticket?.priority ?? "Medium")
  const [ticketType, setTicketType] = React.useState(action.ticket?.type ?? "Support Request")
  const [ticketSubject, setTicketSubject] = React.useState(action.ticket?.subject ?? "")
  const [ticketDescription, setTicketDescription] = React.useState(
    action.ticket?.description?.replace(/<\/p>/gi, "\n\n").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim() ?? ""
  )

  const [toContacts, setToContacts] = React.useState<SuggestedContact[]>(action.emailMeta?.to ? [action.emailMeta.to] : [])
  const [ccContacts, setCcContacts] = React.useState<SuggestedContact[]>(action.emailMeta?.cc ?? [])
  const [bccContacts, setBccContacts] = React.useState<SuggestedContact[]>(
    action.emailMeta?.bcc
      ? [{ name: action.emailMeta.bcc, role: "", email: action.emailMeta.bcc, confirmed: true }]
      : []
  )
  const [callContact, setCallContact] = React.useState<SuggestedContact | undefined>(action.callMeta?.contact)
  const [signatureEnabled, setSignatureEnabled] = React.useState(true)
  

  const isNewEmail = action.type === "email" && !action.replyTo
  const isThreadReply = action.type === "email" && !!action.replyTo

  const canSend = isCall
    ? callContact?.confirmed ?? false
    : action.type === "email"
      ? toContacts.length > 0 && toContacts.every((contact) => contact.confirmed)
      : true

  const openInLabel =
    action.type === "email" ? "Open draft in Gmail"
    : action.type === "ticket" ? "Open in Zendesk"
    : action.type === "slack" ? "Open in Slack"
    : "Open in App"

  const addUniqueContact = React.useCallback((prev: SuggestedContact[], contact: SuggestedContact) => {
    const nextKey = `${contact.name}-${contact.email ?? contact.emails?.[0] ?? ""}`
    if (prev.some((item) => `${item.name}-${item.email ?? item.emails?.[0] ?? ""}` === nextKey)) {
      return prev
    }
    return [...prev, contact]
  }, [])

  if (!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 shrink-0">
            {getActionTypeIcon(action.type, "w-5 h-5")}
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{action.label}</div>
            {action.followUp?.enabled && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Follow-up in {action.followUp.days}d</span>
              </div>
            )}
          </div>
        </div>
        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>
    )
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-background border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 shrink-0">
            {getActionTypeIcon(action.type, "w-5 h-5")}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{action.label}</span>
            {isThreadReply && (
              <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                <Undo2 className="h-3 w-3" />
                Reply
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFeedbackOpen(!feedbackOpen)}
            className={`p-1.5 rounded transition-colors ${
              feedbackOpen
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFeedbackOpen(!feedbackOpen)}
            className="p-1.5 rounded transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-border/40 mx-0.5" />
          <span className="text-xs text-muted-foreground">4:15 PM</span>
          <button
            onClick={() => setExpanded(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-2 rounded transition-colors"
            aria-label="Collapse"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feedback below header */}
      {feedbackOpen && (
        <div className="px-5 py-3 border-b border-border/40 animate-in fade-in slide-in-from-top-2 duration-200">
          <DraftFeedbackInline
            onRegenerateRequest={(pills, detail) => console.log("Regenerate:", pills, detail)}
            onSubmitFeedback={(type, pills, detail) => console.log("Feedback:", type, pills, detail)}
            onDiscardRequest={(pills, detail) => {
              console.log("Discard:", pills, detail)
              onDismiss?.(action.id)
            }}
          />
        </div>
      )}

      {/* Thread Context (email thread reply only) */}
      {isThreadReply && action.replyTo && (
        <div className="border-b border-border/40">
          {action.threadMessages && action.threadMessages.length > 1 && (
            <div className="px-5 py-2 border-b border-border/40">
              <button
                onClick={() => setThreadExpanded(!threadExpanded)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {action.threadMessages.length} messages in this thread
                <span className="mx-1.5">&middot;</span>
                <span className="underline">{threadExpanded ? "Hide thread" : "View thread"}</span>
              </button>
            </div>
          )}

          {threadExpanded && action.threadMessages && action.threadMessages.length > 1 ? (
            <div className="bg-muted/20">
              {action.threadMessages.map((msg, idx) => {
                const isExpMsg = expandedMessageId === msg.id
                const isReplyingTo = !replyingToMessageId
                  ? idx === action.threadMessages!.length - 1
                  : replyingToMessageId === msg.id
                const isLast = idx === action.threadMessages!.length - 1

                return (
                  <div key={msg.id}>
                    <div
                      className="px-5 py-3 hover:bg-muted/30 cursor-pointer transition-colors group relative"
                      onClick={() => setExpandedMessageId(isExpMsg ? null : msg.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-foreground">{msg.from}</span>
                          {isReplyingTo && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <ArrowLeft className="w-3 h-3" />
                              Replying to this
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                          {!isReplyingTo && !isExpMsg && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setReplyingToMessageId(msg.id) }}
                              className="text-xs text-muted-foreground hover:text-foreground underline opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Reply to this
                            </button>
                          )}
                        </div>
                      </div>
                      <div className={`text-sm text-muted-foreground leading-relaxed ${isExpMsg ? "" : "line-clamp-2"}`}>
                        {isExpMsg ? msg.content : msg.preview}
                      </div>
                      {isExpMsg && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedMessageId(null) }}
                          className="text-xs text-muted-foreground hover:text-foreground underline mt-2"
                        >
                          Collapse
                        </button>
                      )}
                    </div>
                    {!isLast && <div className="h-px bg-border/40 mx-5" />}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="px-5 py-3 bg-muted/30">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-foreground">{action.replyTo.from} to Me</span>
                <span className="text-xs text-muted-foreground">{action.replyTo.time}</span>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{action.replyTo.content}</div>
            </div>
          )}
        </div>
      )}

      {/* Reply Context (Slack) */}
      {action.type === "slack" && action.replyTo && (
        <div className="border-b border-border/40">
          <div className="px-5 py-3 bg-muted/30">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-foreground">{action.replyTo.from} to Me</span>
              <span className="text-xs text-muted-foreground">{action.replyTo.time}</span>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{action.replyTo.content}</div>
          </div>
        </div>
      )}

      {/* EmailHeader */}
      {action.type === "email" && action.emailMeta && (
        <div>
          {isThreadReply && (
            <div className="mx-4 mt-3 flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/[0.16] px-3 py-1.5 text-xs text-muted-foreground">
              <Undo2 className="h-3 w-3" />
              Replying in existing thread
            </div>
          )}
          <EmailHeader
            fromName={action.emailMeta.from}
            fromEmail={action.emailMeta.fromEmail}
            toContacts={toContacts}
            ccContacts={ccContacts}
            initialSubject={action.emailMeta.subject}
            accountContacts={accountContacts}
            bccContacts={bccContacts}
            onAddToContact={(c) => setToContacts((prev) => addUniqueContact(prev, c))}
            onRemoveToContact={(index) => setToContacts((prev) => prev.filter((_, idx) => idx !== index))}
            onConfirmToContact={(index) =>
              setToContacts((prev) =>
                prev.map((contact, idx) => (idx === index ? { ...contact, confirmed: true } : contact))
              )
            }
            onUpdateToContact={(index, updatedContact) =>
              setToContacts((prev) =>
                prev.map((contact, idx) => (idx === index ? updatedContact : contact))
              )
            }
            onCcAdd={(c) =>
              setCcContacts((prev) => addUniqueContact(prev, c))
            }
            onCcRemove={(i) => setCcContacts((prev) => prev.filter((_, idx) => idx !== i))}
            onBccAdd={(c) =>
              setBccContacts((prev) => addUniqueContact(prev, c))
            }
            onBccRemove={(i) => setBccContacts((prev) => prev.filter((_, idx) => idx !== i))}
            onOpenAccountDetails={onOpenAccountDetails}
            onOpenRecentActivity={onOpenRecentActivity}
            showSubject={isNewEmail}
          />
        </div>
      )}

      {/* Call contact card */}
      {isCall && (
        <div className="mx-4 mt-3 rounded-md border border-border/60 bg-muted/[0.16] px-3 py-2.5">
          <div className="flex items-start gap-3">
            <span className="text-xs text-muted-foreground w-10 shrink-0 mt-1.5">To</span>
            <div className="flex-1 min-w-0">
              {callContact ? (
                <ContactCard
                  contact={callContact}
                  showPhone
                  onConfirm={() => setCallContact(callContact ? { ...callContact, confirmed: true } : undefined)}
                  onRemove={() => setCallContact(undefined)}
                />
              ) : (
                <div className="text-sm text-muted-foreground">No contact selected.</div>
              )}
              <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                {accountContacts && accountContacts.length > 0 && (
                  <AccountContactsPopover
                    contacts={accountContacts}
                    onSelect={(c) => setCallContact({ ...c, confirmed: true })}
                    onViewAll={onOpenAccountDetails}
                    onOpenRecentActivity={onOpenRecentActivity}
                    trigger={
                      <button className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                        Contacts
                      </button>
                    }
                  />
                )}
                <button
                  type="button"
                  onClick={onOpenAccountDetails}
                  className="h-7 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                >
                  Account details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      

      {/* Content Area */}
      <div>
        {action.type === "ticket" ? (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority</label>
                <select
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</label>
                <select
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                >
                  <option>Churn Risk</option>
                  <option>Support Request</option>
                  <option>Feature Request</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject</label>
              <input
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 text-sm bg-background border border-border rounded-md shadow-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/20"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              />
            </div>
          </div>
        ) : isCall ? (
          <div className="flex flex-col">
            <div className="px-4 pt-3 pb-3">
              <div className="rounded-md border border-border/60 bg-muted/[0.16] overflow-hidden">
                <div className="px-3 pt-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                  Talk track
                </div>
                <div className="px-3 pb-3">
                  <textarea
                    className="w-full min-h-[190px] text-sm leading-relaxed bg-transparent border-none resize-none focus:ring-0 focus:outline-none placeholder:text-muted-foreground/50 p-0 overflow-y-auto"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Edit talk track..."
                  />
                </div>
              </div>
            </div>
            <EditorToolbar />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="px-4 pt-3 pb-3">
              <div className="rounded-md border border-border/60 bg-muted/[0.16] overflow-hidden">
                <div className="px-3 pt-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                  Draft
                </div>
                <div className="px-3 pb-3">
                  <textarea
                    className="w-full min-h-[190px] text-sm leading-relaxed bg-transparent border-none resize-none focus:ring-0 focus:outline-none placeholder:text-muted-foreground/50 p-0 overflow-y-auto"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your message..."
                  />
                </div>
                {action.type === "email" && signature && (
                  <SignatureBlock signature={signature} enabled={signatureEnabled} onToggle={() => setSignatureEnabled(!signatureEnabled)} />
                )}
              </div>
            </div>
            <EditorToolbar />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-muted/10 border-t border-border/60">
        <div className="px-5 py-4">
          {showAiEdit && <AiEditPanel onApply={(pills, desc) => console.log("AI Edit:", pills, desc)} />}

          {action.followUp && (
            <div className="mb-3">
              <FollowUpToggle checked={followUpEnabled} onCheckedChange={setFollowUpEnabled} days={action.followUp.days} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <Button
                variant="ghost"
                size="sm"
                className={`h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 ${showAiEdit ? "bg-muted/50 text-foreground" : ""}`}
                onClick={() => setShowAiEdit(!showAiEdit)}
              >
                AI Edit
              </Button>
              {!isCall && action.type !== "email" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  onClick={() => onSaveDraft?.(action.id)}
                >
                  Draft
                </Button>
              )}
              {!isCall && (
                <Button variant="ghost" size="sm" className="h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap">
                  {openInLabel}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => onDismiss?.(action.id)}
              >
                Dismiss
              </Button>
              {action.type === "email" && onDuplicate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap"
                  onClick={() => onDuplicate(action.id)}
                >
                  <Copy className="w-3 h-3 mr-1.5" />
                  Copy for another contact
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 pl-2 shrink-0">
              <div className="w-px h-4 bg-border/60" />
              {isCall ? (
                <>
                  {action.callMeta?.allowDispatchAgent && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 text-xs font-medium shadow-none"
                      onClick={() => onDispatchAgent?.(action.id)}
                      disabled={!canSend}
                    >
                      Dispatch agent
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className={`px-5 h-9 text-xs font-semibold shadow-sm ${
                      canSend
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    onClick={() => canSend && onMarkComplete?.(action.id)}
                    disabled={!canSend}
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    Mark complete
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  className={`px-6 h-9 text-xs font-semibold shadow-sm ${
                    canSend
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={() => canSend && onSend?.(action.id)}
                  disabled={!canSend}
                >
                  Send
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SuggestedActions (public API)
// ---------------------------------------------------------------------------

export interface SuggestedActionsProps {
  actions: SuggestedAction[]
  title?: string
  onDismiss?: (id: number | string) => void
  onSend?: (id: number | string) => void
  onSaveDraft?: (id: number | string) => void
  accountContacts?: SuggestedContact[]
  signature?: string
  onDuplicate?: (id: number | string) => void
  onOpenAccountDetails?: () => void
  onOpenRecentActivity?: () => void
  onMarkComplete?: (id: number | string) => void
  onDispatchAgent?: (id: number | string) => void
}

export function SuggestedActions({
  actions,
  title = "Suggested Actions",
  onDismiss,
  onSend,
  onSaveDraft,
  accountContacts,
  signature,
  onDuplicate,
  onOpenAccountDetails,
  onOpenRecentActivity,
  onMarkComplete,
  onDispatchAgent,
}: SuggestedActionsProps) {
  const [dismissedIds, setDismissedIds] = React.useState<Set<number | string>>(new Set())

  const handleDismiss = React.useCallback(
    (id: number | string) => {
      setDismissedIds((prev) => new Set([...prev, id]))
      onDismiss?.(id)
    },
    [onDismiss]
  )

  const visibleActions = actions.filter((a) => a.status !== "dismissed" && !dismissedIds.has(a.id))

  return (
    <div className="py-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">{title}</div>
        <span className="text-[11px] text-muted-foreground">{visibleActions.length} actions</span>
      </div>

      <div className="space-y-4">
        {visibleActions.map((action) => (
          <div
            key={action.id}
            className="group bg-background border border-border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            <SuggestedActionCard
              action={action}
              onDismiss={handleDismiss}
              onSend={onSend}
              onSaveDraft={onSaveDraft}
              accountContacts={accountContacts}
              signature={signature}
              onDuplicate={onDuplicate}
              onOpenAccountDetails={onOpenAccountDetails}
              onOpenRecentActivity={onOpenRecentActivity}
              onMarkComplete={onMarkComplete}
              onDispatchAgent={onDispatchAgent}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
