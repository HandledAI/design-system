"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/registry/new-york/ui/dialog"
import { Badge } from "@/registry/new-york/ui/badge"
import { Progress } from "@/registry/new-york/ui/progress"
import { ScoreRing } from "@/registry/new-york/ui/score-ring"
import { ScoreBreakdown, type ScoreFactor } from "@/registry/new-york/ui/score-breakdown"

interface ScoreAnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  score: number
  denominator?: number
  whyNow: string
  evidence: React.ReactNode[]
  confidence: number
  confidenceDescription?: string
  factors?: ScoreFactor[]
  onFactorFeedback?: (factorKey: string, type: "up" | "down" | null) => void
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
  confidence,
  confidenceDescription,
  factors,
  onFactorFeedback,
}: ScoreAnalysisModalProps) {
  const label = getScoreLabel(score, denominator)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] gap-0 p-0 overflow-hidden flex flex-col [display:flex]">
        <div className="overflow-y-auto min-h-0 flex-1 px-6 pt-6 pb-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Score Display -- donut ring */}
            <div className="flex flex-col items-center gap-3">
              <ScoreRing score={score} denominator={denominator} size={120} strokeWidth={10} />
              <Badge variant="outline">
                {Math.round((score / denominator) * 100)}% Score
                {" \u2014 "}
                <span className={label.className}>{label.text}</span>
              </Badge>
            </div>

            {/* Why Now */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Why Now</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{whyNow}</p>
            </div>

            {/* Evidence */}
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

            {/* Score Breakdown */}
            {factors && factors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-sm">Score Breakdown</h3>
                <ScoreBreakdown factors={factors} onFactorFeedback={onFactorFeedback} />
              </div>
            )}

            {/* Confidence */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Analysis Confidence</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Model Confidence</span>
                  <span className="font-medium">{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
                {confidenceDescription && (
                  <p className="text-xs text-muted-foreground">{confidenceDescription}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ScoreAnalysisModal }
export type { ScoreAnalysisModalProps }
