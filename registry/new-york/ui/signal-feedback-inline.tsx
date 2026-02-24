"use client"

import * as React from "react"
import { Check, ThumbsDown, ThumbsUp } from "lucide-react"

const positivePills = ["Right timing", "Accurate data", "Good account fit", "Actionable", "Other"]
const negativePills = ["Bad timing", "Inaccurate data", "Wrong account", "Already handled", "Not actionable", "Other"]

type FeedbackType = "up" | "down"

interface SignalFeedbackState {
  thumbState: FeedbackType | null
  selectedPills: string[]
  detailText: string
  notedType: FeedbackType | null
  otherSelected: boolean
  hasRequiredInput: boolean
  handleThumbClick: (type: FeedbackType) => void
  togglePill: (pill: string) => void
  setDetailText: (text: string) => void
  handleSubmit: () => void
}

const SignalFeedbackCtx = React.createContext<SignalFeedbackState | null>(null)

function useSignalFeedback() {
  const ctx = React.useContext(SignalFeedbackCtx)
  if (!ctx) throw new Error("SignalFeedback components must be used within SignalFeedback.Root")
  return ctx
}

interface SignalFeedbackRootProps {
  children: React.ReactNode
  onSubmitFeedback?: (type: FeedbackType, pills: string[], detail: string) => void
}

function Root({ children, onSubmitFeedback }: SignalFeedbackRootProps) {
  const [thumbState, setThumbState] = React.useState<FeedbackType | null>(null)
  const [selectedPills, setSelectedPills] = React.useState<string[]>([])
  const [detailText, setDetailText] = React.useState("")
  const [notedType, setNotedType] = React.useState<FeedbackType | null>(null)
  const notedTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (notedTimeoutRef.current) {
        clearTimeout(notedTimeoutRef.current)
      }
    }
  }, [])

  const otherSelected = selectedPills.includes("Other")
  const hasRequiredInput =
    thumbState === "down"
      ? selectedPills.length > 0 && (!otherSelected || detailText.trim().length > 0)
      : selectedPills.length > 0 || detailText.trim().length > 0

  const togglePill = React.useCallback((pill: string) => {
    setSelectedPills((previous) =>
      previous.includes(pill) ? previous.filter((value) => value !== pill) : [...previous, pill]
    )
  }, [])

  const handleThumbClick = React.useCallback((type: FeedbackType) => {
    setThumbState((previous) => (previous === type ? null : type))
    setSelectedPills([])
    setDetailText("")
  }, [])

  const handleSubmit = React.useCallback(() => {
    if (!thumbState || !hasRequiredInput) return

    onSubmitFeedback?.(thumbState, selectedPills, detailText.trim())
    setNotedType(thumbState)
    setThumbState(null)
    setSelectedPills([])
    setDetailText("")

    if (notedTimeoutRef.current) {
      clearTimeout(notedTimeoutRef.current)
    }

    notedTimeoutRef.current = setTimeout(() => {
      setNotedType(null)
    }, 3000)
  }, [detailText, hasRequiredInput, onSubmitFeedback, selectedPills, thumbState])

  return (
    <SignalFeedbackCtx.Provider
      value={{
        thumbState,
        selectedPills,
        detailText,
        notedType,
        otherSelected,
        hasRequiredInput,
        handleThumbClick,
        togglePill,
        setDetailText,
        handleSubmit,
      }}
    >
      {children}
    </SignalFeedbackCtx.Provider>
  )
}

function Trigger() {
  const { thumbState, notedType, handleThumbClick } = useSignalFeedback()

  if (notedType) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="h-3.5 w-3.5 text-emerald-500" />
        <span>{notedType === "up" ? "Noted" : "Recorded"}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => handleThumbClick("up")}
        aria-label="Helpful signal"
        className={`rounded p-1.5 transition-colors ${
          thumbState === "up"
            ? "bg-emerald-100 text-emerald-700"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <ThumbsUp className="h-3.5 w-3.5" fill={thumbState === "up" ? "currentColor" : "none"} />
      </button>
      <button
        type="button"
        onClick={() => handleThumbClick("down")}
        aria-label="Unhelpful signal"
        className={`rounded p-1.5 transition-colors ${
          thumbState === "down"
            ? "bg-red-100 text-red-700"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <ThumbsDown className="h-3.5 w-3.5" fill={thumbState === "down" ? "currentColor" : "none"} />
      </button>
    </div>
  )
}

function Panel() {
  const {
    thumbState,
    selectedPills,
    detailText,
    otherSelected,
    hasRequiredInput,
    togglePill,
    setDetailText,
    handleSubmit,
  } = useSignalFeedback()

  if (!thumbState) return null

  const pills = thumbState === "up" ? positivePills : negativePills

  return (
    <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">How&apos;s this signal?</p>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{thumbState === "up" ? "What was useful?" : "What&apos;s the issue?"}</p>
        <div className="flex flex-wrap gap-1.5">
          {pills.map((pill) => {
            const selected = selectedPills.includes(pill)
            return (
              <button
                key={pill}
                type="button"
                onClick={() => togglePill(pill)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selected
                    ? thumbState === "up"
                      ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                      : "border-red-200 bg-red-100 text-red-700"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {pill}
              </button>
            )
          })}
        </div>
      </div>

      {(thumbState === "down" || selectedPills.length > 0) && (
        <div className="space-y-1.5">
          <input
            type="text"
            value={detailText}
            onChange={(event) => setDetailText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && hasRequiredInput) {
                handleSubmit()
              }
            }}
            placeholder={
              thumbState === "up"
                ? "Tell us what made this signal useful"
                : "Tell us what is inaccurate or not useful"
            }
            className="h-8 w-full rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {otherSelected && detailText.trim().length === 0 && (
            <p className="text-[10px] text-red-500">Please add a short note when selecting Other.</p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!hasRequiredInput}
        className={`h-8 w-full rounded-md text-xs font-semibold transition-colors ${
          hasRequiredInput
            ? "bg-foreground text-background hover:bg-foreground/90"
            : "cursor-not-allowed bg-muted text-muted-foreground"
        }`}
      >
        Submit
      </button>
    </div>
  )
}

export const SignalFeedback = { Root, Trigger, Panel }

interface SignalFeedbackInlineProps {
  onSubmitFeedback?: (type: FeedbackType, pills: string[], detail: string) => void
}

export function SignalFeedbackInline({ onSubmitFeedback }: SignalFeedbackInlineProps) {
  return (
    <Root onSubmitFeedback={onSubmitFeedback}>
      <div className="space-y-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">How&apos;s this signal?</p>
          <Trigger />
        </div>
        <Panel />
      </div>
    </Root>
  )
}
