"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../../lib/utils"
import { AgentWidget, type AgentWidgetMessage, type AgentWidgetStatus, type AgentWidgetMode } from "./agent-widget"

/* ========================================
   AgentPopover (root)
   ======================================== */

export type AgentPopoverStep = string

export interface AgentPopoverContextValue {
  step: AgentPopoverStep
  setStep: (step: AgentPopoverStep) => void
}

const AgentPopoverContext = React.createContext<AgentPopoverContextValue | null>(null)

export function useAgentPopover() {
  const ctx = React.useContext(AgentPopoverContext)
  if (!ctx) throw new Error("useAgentPopover must be used within <AgentPopover>")
  return ctx
}

export interface AgentPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStep?: string
  step?: string
  onStepChange?: (step: string) => void
  children: React.ReactNode
  className?: string
}

export function AgentPopover({
  open,
  onOpenChange,
  defaultStep = "details",
  step: controlledStep,
  onStepChange,
  children,
  className,
}: AgentPopoverProps) {
  const [uncontrolledStep, setUncontrolledStep] = React.useState(defaultStep)
  const step = controlledStep ?? uncontrolledStep
  const setStep = React.useCallback(
    (s: string) => {
      if (controlledStep === undefined) setUncontrolledStep(s)
      onStepChange?.(s)
    },
    [controlledStep, onStepChange],
  )

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <AgentPopoverContext.Provider value={{ step, setStep }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-4 z-50 flex overflow-hidden rounded-3xl bg-background shadow-2xl ring-1 ring-border/50 animate-in zoom-in-95 fade-in duration-300",
          "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-5xl md:w-[92vw] md:h-[85vh]",
          className,
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-background/80 hover:bg-muted transition-colors text-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        {children}
      </div>
    </AgentPopoverContext.Provider>
  )
}

/* ========================================
   AgentPopoverBranding (left panel)
   ======================================== */

export type ConnectionStatus = "ready" | "connected" | "listening" | "speaking"

export interface AgentPopoverBrandingProps {
  title?: string
  subtitle?: string
  badge?: string
  visualSlot?: React.ReactNode
  statusIndicator?: ConnectionStatus
  className?: string
}

export function AgentPopoverBranding({
  title,
  subtitle,
  badge,
  visualSlot,
  statusIndicator = "ready",
  className,
}: AgentPopoverBrandingProps) {
  return (
    <div
      className={cn(
        "relative hidden w-[40%] shrink-0 flex-col items-center justify-center p-8 md:flex",
        "bg-gradient-to-br from-primary/5 via-background to-primary/10",
        className,
      )}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {visualSlot && (
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            {visualSlot}
          </div>
        )}

        {badge && (
          <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/10">
            {badge}
          </span>
        )}

        {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
        {subtitle && <p className="text-sm text-muted-foreground max-w-[240px]">{subtitle}</p>}

        <StatusPill status={statusIndicator} />
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: ConnectionStatus }) {
  const label: Record<ConnectionStatus, string> = {
    ready: "Ready to connect",
    connected: "Connected",
    listening: "Listening...",
    speaking: "Speaking...",
  }

  const dotColor: Record<ConnectionStatus, string> = {
    ready: "bg-muted-foreground",
    connected: "bg-green-500",
    listening: "bg-green-500 animate-pulse",
    speaking: "bg-primary animate-pulse",
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 bg-background/50">
      <div className={cn("h-2 w-2 rounded-full", dotColor[status])} />
      <span className="text-xs text-muted-foreground">{label[status]}</span>
    </div>
  )
}

/* ========================================
   AgentPopoverStepContent (right panel step)
   ======================================== */

export interface AgentPopoverStepContentProps {
  step: string
  children: React.ReactNode
  className?: string
}

export function AgentPopoverStepContent({ step, children, className }: AgentPopoverStepContentProps) {
  const { step: currentStep } = useAgentPopover()
  if (currentStep !== step) return null
  return <div className={cn("flex-1 flex flex-col overflow-hidden", className)}>{children}</div>
}

/* ========================================
   AgentPopoverForm (details step)
   ======================================== */

export interface AgentPopoverFormField {
  name: string
  label: string
  type?: "text" | "email" | "tel" | "textarea"
  placeholder?: string
  required?: boolean
}

export interface AgentPopoverFormProps {
  fields?: AgentPopoverFormField[]
  submitLabel?: string
  onSubmit?: (values: Record<string, string>) => void
  className?: string
  children?: React.ReactNode
}

export function AgentPopoverForm({
  fields = [],
  submitLabel = "Continue",
  onSubmit,
  className,
  children,
}: AgentPopoverFormProps) {
  const [values, setValues] = React.useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(values)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col h-full p-8 overflow-y-auto", className)}
    >
      <div className="flex-1 space-y-4">
        {fields.map((field) =>
          field.type === "textarea" ? (
            <label key={field.name} className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">
                {field.label}
                {field.required && <span className="text-destructive ml-0.5">*</span>}
              </span>
              <textarea
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] resize-none"
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
              />
            </label>
          ) : (
            <label key={field.name} className="block space-y-1.5">
              <span className="text-sm font-medium text-foreground">
                {field.label}
                {field.required && <span className="text-destructive ml-0.5">*</span>}
              </span>
              <input
                type={field.type ?? "text"}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
              />
            </label>
          ),
        )}
        {children}
      </div>
      <button
        type="submit"
        className="mt-6 w-full px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}

/* ========================================
   AgentPopoverOverview
   ======================================== */

export interface AgentPopoverOverviewProps {
  userSummary?: Record<string, string>
  discussionPoints?: string[]
  actions?: React.ReactNode
  className?: string
}

export function AgentPopoverOverview({
  userSummary,
  discussionPoints,
  actions,
  className,
}: AgentPopoverOverviewProps) {
  return (
    <div className={cn("flex flex-col h-full p-8 overflow-y-auto", className)}>
      {userSummary && Object.keys(userSummary).length > 0 && (
        <div className="mb-6 rounded-xl bg-muted/50 p-4 space-y-2">
          {Object.entries(userSummary).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground capitalize">{key}</span>
              <span className="text-foreground font-medium">{val}</span>
            </div>
          ))}
        </div>
      )}

      {discussionPoints && discussionPoints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Discussion Points</h3>
          <ul className="space-y-2">
            {discussionPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {actions && <div className="mt-auto pt-6">{actions}</div>}
    </div>
  )
}

/* ========================================
   AgentPopoverChat (interview step)
   ======================================== */

export interface AgentPopoverChatProps {
  messages?: AgentWidgetMessage[]
  onSendMessage?: (text: string) => void
  onEndSession?: () => void
  inputMode?: "voice" | "text" | "voice+text"
  visualSlot?: React.ReactNode
  assistantAvatarSlot?: React.ReactNode
  status?: AgentWidgetStatus
  mode?: AgentWidgetMode
  className?: string
}

export function AgentPopoverChat({
  messages = [],
  onSendMessage,
  onEndSession,
  inputMode = "voice+text",
  visualSlot,
  assistantAvatarSlot,
  status = "connected",
  mode = null,
  className,
}: AgentPopoverChatProps) {
  return (
    <AgentWidget
      messages={messages}
      onSendMessage={onSendMessage}
      onEndSession={onEndSession}
      inputMode={inputMode}
      visualSlot={visualSlot}
      assistantAvatarSlot={assistantAvatarSlot}
      status={status}
      mode={mode}
      className={cn("h-full", className)}
    />
  )
}
