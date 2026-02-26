"use client"

import * as React from "react"

import { Button } from "@/registry/new-york/ui/button"
import { Progress } from "@/registry/new-york/ui/progress"
import { ScoreRing } from "@/registry/new-york/ui/score-ring"
import { ScoreFeedback } from "@/registry/new-york/ui/score-feedback"
import { ScoreAnalysisModal } from "@/registry/new-york/ui/score-analysis-modal"
import { ScoreBreakdown, type ScoreFactor } from "@/registry/new-york/ui/score-breakdown"
import {
  RecommendedActionsSection,
  type RecommendedAction,
} from "@/registry/new-york/ui/recommended-actions-section"

const SHOWCASE_ACTIONS: RecommendedAction[] = [
  {
    id: "rec-1",
    title: "Follow up with CloudKitchen finance team",
    reason: "Engagement dropped this week after a high-intent treasury conversation.",
    category: "Nurture",
    priority: "High",
    dueDate: "Today",
    confidence: 0.82,
    signals: ["No response in 4 days", "Open expansion signal"],
    revenueImpact: 180000,
  },
  {
    id: "rec-2",
    title: "Escalate API rate-limit support ticket",
    reason: "Ticket #1024 remains open and is blocking the implementation timeline.",
    category: "Churn",
    priority: "Medium",
    dueDate: "Tomorrow",
    confidence: 0.68,
    signals: ["SLA breach risk", "Customer escalation"],
    revenueImpact: 95000,
  },
]

const SHOWCASE_FACTORS: ScoreFactor[] = [
  {
    key: "usage",
    label: "Product usage",
    score: 81,
    why: "Weekly active seats are up 12% over the last 30 days.",
  },
  {
    key: "support",
    label: "Support health",
    score: 36,
    why: "Open high-priority ticket remains unresolved for 2 days.",
  },
  {
    key: "decision-makers",
    label: "Decision-maker access",
    score: null,
    risk: "Medium",
    why: "CFO engaged, but legal contact has not responded yet.",
  },
]

export function ScoringFeedbackShowcase() {
  const [analysisOpen, setAnalysisOpen] = React.useState(false)

  return (
    <div className="space-y-6">
      <div id="custom-progress" className="space-y-2">
        <p className="text-sm font-medium">Progress</p>
        <Progress value={72} />
      </div>

      <div id="custom-score-ring" className="space-y-2">
        <p className="text-sm font-medium">Score Ring</p>
        <ScoreRing score={72} denominator={100} size={96} strokeWidth={8} />
      </div>

      <div id="custom-score-breakdown" className="space-y-2">
        <p className="text-sm font-medium">Score Breakdown</p>
        <ScoreBreakdown factors={SHOWCASE_FACTORS} />
      </div>

      <div id="custom-score-feedback" className="space-y-2">
        <p className="text-sm font-medium">Score Feedback</p>
        <div className="rounded-md border border-border p-3">
          <ScoreFeedback.Root>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                How useful is this score explanation?
              </span>
              <ScoreFeedback.Trigger />
            </div>
            <ScoreFeedback.Panel />
          </ScoreFeedback.Root>
        </div>
      </div>

      <div id="custom-recommended-actions-section" className="space-y-2">
        <p className="text-sm font-medium">Recommended Actions Section</p>
        <div className="rounded-md border border-border px-4">
          <RecommendedActionsSection actions={SHOWCASE_ACTIONS} />
        </div>
      </div>

      <div id="custom-score-analysis-modal" className="space-y-2">
        <p className="text-sm font-medium">Score Analysis Modal</p>
        <Button size="sm" onClick={() => setAnalysisOpen(true)}>
          Open Score Analysis
        </Button>
        <ScoreAnalysisModal
          open={analysisOpen}
          onOpenChange={setAnalysisOpen}
          title="CloudKitchen — Expansion Score"
          description="A compact score explanation with evidence and factor-level feedback."
          score={72}
          denominator={100}
          whyNow="Engagement from finance increased after the last treasury discussion."
          evidence={[
            "2 executive replies in the past 5 days.",
            "Support issue is acknowledged with an expected resolution window.",
          ]}
          factors={SHOWCASE_FACTORS}
        />
      </div>
    </div>
  )
}
