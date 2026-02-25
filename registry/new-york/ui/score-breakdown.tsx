"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ScoreFactor {
  key: string
  label: string
  score: number | null
  risk?: "Low" | "Medium" | "High"
  why: string
}

function getFactorBarColor(score: number) {
  if (score >= 70) return "bg-emerald-500"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

function getRiskBadgeStyle(risk: "Low" | "Medium" | "High") {
  switch (risk) {
    case "Low":
      return "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
    case "Medium":
      return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30"
    case "High":
      return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30"
  }
}

interface ScoreBreakdownProps {
  factors: ScoreFactor[]
  onFactorFeedback?: (factorKey: string, type: "up" | "down" | null) => void
  className?: string
}

function ScoreBreakdown({ factors, onFactorFeedback, className }: ScoreBreakdownProps) {
  const [feedback, setFeedback] = React.useState<Record<string, "up" | "down" | null>>({})

  const handleFeedback = (factorKey: string, type: "up" | "down") => {
    const newState = feedback[factorKey] === type ? null : type
    setFeedback((prev) => ({ ...prev, [factorKey]: newState }))
    onFactorFeedback?.(factorKey, newState)
  }

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="grid grid-cols-[1fr_60px_1fr_56px] gap-0 px-3 py-2 bg-muted/30 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        <span>Factor</span>
        <span className="text-center">Score</span>
        <span>Why</span>
        <span className="text-center">Rate</span>
      </div>

      {/* Rows */}
      {factors.map((factor, idx) => {
        const isLastRow = idx === factors.length - 1
        const feedbackState = feedback[factor.key]

        return (
          <div
            key={factor.key}
            className={cn(
              "grid grid-cols-[1fr_60px_1fr_56px] gap-0 px-3 py-2.5 items-center",
              !isLastRow && "border-b border-border/40"
            )}
          >
            {/* Factor Label */}
            <span className="text-[13px] font-medium text-foreground">{factor.label}</span>

            {/* Score */}
            <div className="flex flex-col items-center gap-1">
              {factor.score !== null ? (
                <>
                  <span className="text-[13px] font-semibold text-foreground">{factor.score}</span>
                  <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", getFactorBarColor(factor.score))}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </>
              ) : factor.risk ? (
                <span
                  className={cn(
                    "text-xs font-semibold px-1.5 py-0.5 rounded",
                    getRiskBadgeStyle(factor.risk)
                  )}
                >
                  {factor.risk}
                </span>
              ) : null}
            </div>

            {/* Why */}
            <span className="text-xs text-muted-foreground leading-snug pr-2">{factor.why}</span>

            {/* Thumbs */}
            <div className="flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => handleFeedback(factor.key, "up")}
                className={cn(
                  "p-1 rounded transition-colors",
                  feedbackState === "up"
                    ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
                    : "text-muted-foreground/40 hover:text-emerald-600 hover:bg-emerald-50/50"
                )}
                title="This factor is accurate"
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleFeedback(factor.key, "down")}
                className={cn(
                  "p-1 rounded transition-colors",
                  feedbackState === "down"
                    ? "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30"
                    : "text-muted-foreground/40 hover:text-red-600 hover:bg-red-50/50"
                )}
                title="Report issue with this factor"
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { ScoreBreakdown }
export type { ScoreBreakdownProps }
