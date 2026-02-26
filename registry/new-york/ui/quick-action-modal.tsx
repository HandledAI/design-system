"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

type TemplateIcon = React.ComponentType<{ className?: string }>

export interface QuickActionTemplate {
  id: string
  label: string
  description: string
  icon: TemplateIcon
  category?: string
}

export type QuickActionPriority = "normal" | "high" | "urgent"

export interface QuickActionTaskDraft {
  templateId: string | null
  message: string
  priority: QuickActionPriority
}

interface QuickActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates?: QuickActionTemplate[]
  title?: string
  description?: string
  className?: string
  onCreateTask?: (draft: QuickActionTaskDraft) => void
}

const DEFAULT_TEMPLATES: QuickActionTemplate[] = [
  {
    id: "call_patient",
    label: "Call Patient",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    description: "Schedule or log a call",
    category: "communication",
  },
  {
    id: "call_provider",
    label: "Call Provider",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Contact referring office",
    category: "communication",
  },
  {
    id: "call_payer",
    label: "Call Payer",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    description: "Verify benefits or status",
    category: "admin",
  },
  {
    id: "send_fax",
    label: "Send Fax",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: "Request records or auth",
    category: "communication",
  },
  {
    id: "verify_benefits",
    label: "Verify Benefits",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Check eligibility status",
    category: "admin",
  },
  {
    id: "create_referral",
    label: "New Referral",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    description: "Process incoming referral",
    category: "clinical",
  },
  {
    id: "manual_task",
    label: "Manual Task",
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Create a custom to-do",
    category: "admin",
  },
]

export function QuickActionModal({
  open,
  onOpenChange,
  templates = DEFAULT_TEMPLATES,
  title = "Quick Action",
  description = "Choose a template or describe your task below.",
  className,
  onCreateTask,
}: QuickActionModalProps) {
  const [freeformText, setFreeformText] = React.useState("")
  const [selectedPriority, setSelectedPriority] = React.useState<QuickActionPriority>("normal")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setFreeformText("")
      setSelectedPriority("normal")
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleTemplateClick = React.useCallback(
    (template: QuickActionTemplate) => {
      onCreateTask?.({
        templateId: template.id,
        message: "",
        priority: "normal",
      })
      onOpenChange(false)
    },
    [onCreateTask, onOpenChange],
  )

  const handleFreeformSubmit = React.useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      if (!freeformText.trim()) return

      onCreateTask?.({
        templateId: null,
        message: freeformText.trim(),
        priority: selectedPriority,
      })
      onOpenChange(false)
    },
    [freeformText, selectedPriority, onCreateTask, onOpenChange],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "flex max-h-[85vh] flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-2xl sm:max-w-2xl",
          className,
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="relative pt-8 px-6 text-center">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-muted/80">
                <svg
                  className="w-3 h-3 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground/80">{title}</span>
            </div>

            <div className="mt-12 mb-8">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                Let&apos;s knock something off your list
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          {/* Template Grid */}
          <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleTemplateClick(template)}
                className="flex flex-col items-start gap-3 p-5 min-h-[9.5rem] rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md hover:translate-y-[-1px] transition-all text-left group relative"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/5 transition-colors">
                  <template.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="relative z-10 w-full">
                  <span className="block text-sm font-semibold text-foreground mb-1">
                    {template.label}
                  </span>
                  <span className="block text-xs text-muted-foreground leading-tight">
                    {template.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Freeform Input */}
        <form
          onSubmit={handleFreeformSubmit}
          className="shrink-0 p-6 bg-muted/5 border-t border-border"
        >
          <div className="relative flex flex-col gap-2 rounded-xl border border-border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/50 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={freeformText}
              onChange={(e) => setFreeformText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleFreeformSubmit()
                }
              }}
              placeholder="How can I help you today?"
              className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none"
            />

            <div className="flex items-center justify-between pt-2 px-2 pb-2 border-t border-border/50 mt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  title="Add attachment"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <div className="h-4 w-px bg-border mx-1" />
                <select
                  value={selectedPriority}
                  onChange={(e) =>
                    setSelectedPriority(e.target.value as QuickActionPriority)
                  }
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors bg-transparent cursor-pointer border-none outline-none"
                  aria-label="Priority"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline-block opacity-70">
                  Press <kbd className="font-sans">↵</kbd> to create
                </span>
                <button
                  type="submit"
                  disabled={!freeformText.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Create
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
