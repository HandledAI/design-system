"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, Check } from "lucide-react"
import { cn } from "../../../lib/utils"

const positivePills = [
  "Right timing",
  "Accurate data",
  "Good prospect fit",
  "Actionable",
]

const negativePills = [
  "Bad timing",
  "Inaccurate data",
  "Wrong prospect",
  "Already handled",
  "Not actionable",
  "Other",
]

interface SubmittedScoreFeedback {
  type: "up" | "down"
  pills: string[]
  detail: string
}

interface ScoreFeedbackState {
  thumbState: "up" | "down" | null
  selectedPills: string[]
  detailText: string
  notedType: "up" | "down" | null
  submittedFeedback: SubmittedScoreFeedback | null
  otherSelected: boolean
  hasRequiredInput: boolean
  handleThumbClick: (type: "up" | "down") => void
  togglePill: (pill: string) => void
  setDetailText: (text: string) => void
  handleSubmit: () => void
  editSubmitted: () => void
}

const ScoreFeedbackCtx = React.createContext<ScoreFeedbackState | null>(null)

function useScoreFeedback() {
  const ctx = React.useContext(ScoreFeedbackCtx)
  if (!ctx) throw new Error("Must be used within ScoreFeedback.Root")
  return ctx
}

interface RootProps {
  children: React.ReactNode
  onSubmitFeedback?: (type: "up" | "down", pills: string[], detail: string) => void
}

function Root({ children, onSubmitFeedback }: RootProps) {
  const [thumbState, setThumbState] = React.useState<"up" | "down" | null>(null)
  const [selectedPills, setSelectedPills] = React.useState<string[]>([])
  const [detailText, setDetailTextState] = React.useState("")
  const [notedType, setNotedType] = React.useState<"up" | "down" | null>(null)
  const [submittedFeedback, setSubmittedFeedback] = React.useState<SubmittedScoreFeedback | null>(null)

  const otherSelected = selectedPills.includes("Other")

  const hasRequiredInput =
    thumbState === "down"
      ? selectedPills.length > 0 && (!otherSelected || detailText.trim().length > 0)
      : selectedPills.length > 0 || detailText.trim().length > 0

  const togglePill = React.useCallback((pill: string) => {
    setSelectedPills((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    )
  }, [])

  const handleThumbClick = React.useCallback((type: "up" | "down") => {
    setThumbState((prev) => (prev === type ? null : type))
    setSelectedPills([])
    setDetailTextState("")
  }, [])

  const handleSubmit = React.useCallback(() => {
    if (!thumbState) return
    onSubmitFeedback?.(thumbState, selectedPills, detailText)
    setSubmittedFeedback({ type: thumbState, pills: [...selectedPills], detail: detailText.trim() })
    setNotedType(thumbState)
    setThumbState(null)
    setSelectedPills([])
    setDetailTextState("")
    setTimeout(() => setNotedType(null), 3000)
  }, [thumbState, selectedPills, detailText, onSubmitFeedback])

  const editSubmitted = React.useCallback(() => {
    if (!submittedFeedback) return
    setThumbState(submittedFeedback.type)
    setSelectedPills([...submittedFeedback.pills])
    setDetailTextState(submittedFeedback.detail)
    setNotedType(null)
  }, [submittedFeedback])

  return (
    <ScoreFeedbackCtx.Provider
      value={{
        thumbState,
        selectedPills,
        detailText,
        notedType,
        submittedFeedback,
        otherSelected,
        hasRequiredInput,
        handleThumbClick,
        togglePill,
        setDetailText: setDetailTextState,
        handleSubmit,
        editSubmitted,
      }}
    >
      {children}
    </ScoreFeedbackCtx.Provider>
  )
}

function Trigger({ className }: { className?: string }) {
  const { thumbState, notedType, submittedFeedback, handleThumbClick, editSubmitted } = useScoreFeedback()

  if (notedType || (submittedFeedback && !thumbState)) {
    return (
      <div className={cn("shrink-0", className)}>
        <div className="flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-500" />
          <span className="text-[11px] text-muted-foreground">
            {notedType
              ? notedType === "up" ? "Noted" : "Recorded"
              : submittedFeedback?.type === "up" ? "Noted" : "Recorded"}
          </span>
        </div>
        {submittedFeedback && (submittedFeedback.pills.length > 0 || submittedFeedback.detail) && (
          <button
            type="button"
            onClick={editSubmitted}
            className="mt-1.5 w-full text-left space-y-1 group cursor-pointer"
          >
            {submittedFeedback.pills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {submittedFeedback.pills.map((p) => (
                  <span
                    key={p}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors group-hover:opacity-80",
                      submittedFeedback.type === "up"
                        ? "border-emerald-200/60 bg-emerald-50/50 text-emerald-700/70"
                        : "border-red-200/60 bg-red-50/50 text-red-700/70"
                    )}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
            {submittedFeedback.detail && (
              <p className="text-[11px] text-muted-foreground/70 leading-snug group-hover:text-muted-foreground transition-colors">{submittedFeedback.detail}</p>
            )}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex gap-0.5 shrink-0", className)}>
      <button
        type="button"
        onClick={() => handleThumbClick("up")}
        className={cn(
          "p-1.5 rounded transition-colors",
          thumbState === "up"
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        <ThumbsUp className="w-3.5 h-3.5" fill={thumbState === "up" ? "currentColor" : "none"} />
      </button>
      <button
        type="button"
        onClick={() => handleThumbClick("down")}
        className={cn(
          "p-1.5 rounded transition-colors",
          thumbState === "down"
            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        <ThumbsDown className="w-3.5 h-3.5" fill={thumbState === "down" ? "currentColor" : "none"} />
      </button>
    </div>
  )
}

function Panel({ className }: { className?: string }) {
  const {
    thumbState,
    selectedPills,
    detailText,
    otherSelected,
    hasRequiredInput,
    togglePill,
    setDetailText,
    handleSubmit,
  } = useScoreFeedback()

  if (!thumbState) return null

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="mt-4 pt-4 pb-1 space-y-3 border-t border-border/60">
        <span className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
          How&apos;s this score?
        </span>
        <div>
          <span className="text-xs text-muted-foreground mb-2 block font-medium">
            {thumbState === "up" ? "What was useful?" : "What\u2019s the issue?"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(thumbState === "up" ? positivePills : negativePills).map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => togglePill(pill)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors",
                  selectedPills.includes(pill)
                    ? thumbState === "up"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                      : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                    : "bg-background text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="text"
            value={detailText}
            onChange={(e) => setDetailText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && hasRequiredInput) handleSubmit()
            }}
            placeholder={
              thumbState === "up"
                ? "Tell us more (optional)"
                : "e.g., The risk factors are outdated"
            }
            className="w-full text-xs bg-background border border-border rounded-md px-2.5 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {otherSelected && detailText.trim().length === 0 && (
            <span className="text-[10px] text-red-500">
              Please describe when &ldquo;Other&rdquo; is selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasRequiredInput}
            className={cn(
              "flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors",
              hasRequiredInput
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export const ScoreFeedback = { Root, Trigger, Panel }
export { useScoreFeedback }
