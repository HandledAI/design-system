"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet"
import { Badge } from "./badge"
import { ScoreRing } from "./score-ring"
import { ScoreBreakdown, type ScoreFactor } from "./score-breakdown"
import { SignalApproval } from "./signal-feedback-inline"
import { X } from "lucide-react"

interface ScoreAnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  score: number
  denominator?: number
  whyNow: string
  evidence: React.ReactNode[]
  factors?: ScoreFactor[]
  onFactorFeedback?: (factorKey: string, type: "up" | "down" | null, detail?: string) => void
  companyName?: string
  opportunityUrl?: string
  onApprove?: () => void
  onApproveFeedback?: (reasons: string[], detail: string) => void
  onDismiss?: (reasons: string[], detail: string) => void
}

function getScoreLabel(score: number, denominator: number) {
  const pct = (score / denominator) * 100
  if (pct >= 70) return { text: "HIGH", className: "text-emerald-600" }
  if (pct >= 40) return { text: "MEDIUM", className: "text-amber-600" }
  return { text: "LOW", className: "text-red-600" }
}

function ScoreAnalysisModal({
  open,
  onOpenChange,
  title,
  description,
  score,
  denominator = 100,
  whyNow,
  evidence,
  factors,
  onFactorFeedback,
  companyName = "Account",
  opportunityUrl,
  onApprove,
  onApproveFeedback,
  onDismiss,
}: ScoreAnalysisModalProps) {
  const label = getScoreLabel(score, denominator)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[500px] sm:max-w-[600px] overflow-hidden p-0 bg-background border-l border-border flex flex-col"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only p-0">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        <SignalApproval.Root
          companyName={companyName}
          opportunityUrl={opportunityUrl}
          onApprove={onApprove}
          onApproveFeedback={onApproveFeedback}
          onDismiss={onDismiss}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <p className="text-sm text-muted-foreground mb-6">{description}</p>

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <ScoreRing score={score} denominator={denominator} size={120} strokeWidth={10} />
                <Badge variant="outline">
                  {Math.round((score / denominator) * 100)}% Score
                  {" \u2014 "}
                  <span className={label.className}>{label.text}</span>
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Why Now</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{whyNow}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Supporting Evidence</h3>
                <ul className="space-y-2">
                  {evidence.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {factors && factors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-sm">Score Breakdown</h3>
                  <ScoreBreakdown factors={factors} onFactorFeedback={onFactorFeedback} />
                </div>
              )}

              <SignalApproval.Actions />
            </div>
          </div>
        </SignalApproval.Root>
      </SheetContent>
    </Sheet>
  )
}

const ScoreAnalysisPanel = ScoreAnalysisModal

export { ScoreAnalysisModal, ScoreAnalysisPanel }
export type { ScoreAnalysisModalProps }
