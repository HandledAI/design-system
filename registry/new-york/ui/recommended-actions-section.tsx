"use client"

import * as React from "react"
import {
  CheckSquare,
  Clock,
  DollarSign,
  HelpCircle,
  MessageSquare,
  SkipForward,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
} from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export interface RecommendedAction {
  id: string
  title: string
  reason: string
  category?: "Churn" | "Expand" | "Nurture" | string
  priority?: "High" | "Medium" | "Low" | string
  dueDate?: string
  confidence?: number
  signals?: string[]
  revenueImpact?: number
}

interface RecommendedActionsSectionProps {
  actions: RecommendedAction[]
  title?: string
  onQueueAction?: (action: RecommendedAction) => void
  onDismissAction?: (action: RecommendedAction) => void
  onFeedback?: (actionId: string, feedback: "useful" | "not_useful", comment: string) => void
}

function getCategoryBadgeClass(category?: string) {
  if (category === "Churn") return "bg-white text-black border-red-300"
  if (category === "Expand") return "bg-green-100 text-green-800 border-green-200"
  if (category === "Nurture") return "bg-blue-100 text-blue-800 border-blue-200"
  return "bg-muted text-muted-foreground border-border"
}

function getPriorityBadgeClass(priority?: string) {
  if (priority === "High") return "border-foreground text-foreground"
  if (priority === "Medium") return "border-muted-foreground text-muted-foreground"
  return "border-border text-muted-foreground"
}

export function RecommendedActionsSection({
  actions,
  title = "Recommended Actions",
  onQueueAction,
  onDismissAction,
  onFeedback,
}: RecommendedActionsSectionProps) {
  const [dismissedActions, setDismissedActions] = React.useState<Set<string>>(new Set())
  const [actionFeedback, setActionFeedback] = React.useState<Record<string, "useful" | "not_useful" | null>>({})
  const [feedbackComment, setFeedbackComment] = React.useState<Record<string, string>>({})
  const [commentOpen, setCommentOpen] = React.useState<Record<string, boolean>>({})

  const visibleActions = actions.filter((action) => !dismissedActions.has(action.id))

  const handleDismissAction = (action: RecommendedAction) => {
    setDismissedActions((previous) => new Set([...previous, action.id]))
    onDismissAction?.(action)
  }

  const handleFeedback = (actionId: string, feedback: "useful" | "not_useful") => {
    setActionFeedback((previous) => ({ ...previous, [actionId]: feedback }))
    setCommentOpen((previous) => ({ ...previous, [actionId]: true }))
  }

  const submitFeedback = (actionId: string) => {
    const feedback = actionFeedback[actionId]
    if (!feedback) return

    onFeedback?.(actionId, feedback, feedbackComment[actionId]?.trim() ?? "")
    setCommentOpen((previous) => ({ ...previous, [actionId]: false }))
    setFeedbackComment((previous) => ({ ...previous, [actionId]: "" }))
  }

  return (
    <section className="border-t border-border py-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">{title}</h3>
        <span className="text-xs text-muted-foreground">{visibleActions.length} actions</span>
      </div>

      {visibleActions.length === 0 ? (
        <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
          All recommended actions are dismissed.
        </div>
      ) : (
        <div className="space-y-3">
          {visibleActions.map((action) => (
            <div
              key={action.id}
              className="group rounded-md border border-border bg-background p-4 transition-colors hover:bg-muted/20"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <h4 className="text-sm font-medium leading-snug text-foreground">{action.title}</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`px-2.5 py-1 text-xs font-medium ${getCategoryBadgeClass(action.category)}`}>
                      {action.category ?? "General"}
                    </Badge>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className={`cursor-help px-2.5 py-1 text-xs ${getPriorityBadgeClass(action.priority)}`}>
                            <DollarSign className="mr-1 h-3 w-3" />
                            {action.priority ?? "Medium"}
                            <HelpCircle className="ml-1 h-3 w-3" />
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs leading-relaxed">
                            {action.confidence
                              ? `${Math.round(action.confidence * 100)}% confidence based on current account signals.`
                              : "Priority reflects expected impact and urgency."}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {typeof action.revenueImpact === "number" && (
                      <span className="text-xs font-medium text-muted-foreground">
                        +${action.revenueImpact.toLocaleString()}/mo impact
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
                    onClick={() => onQueueAction?.(action)}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => handleDismissAction(action)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{action.reason}</p>

              {action.signals && action.signals.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {action.signals.map((signal) => (
                    <Badge key={`${action.id}-${signal}`} variant="secondary" className="text-[10px]">
                      {signal}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{action.dueDate ?? "This week"}</span>

                <div className="flex items-center gap-1.5">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <SkipForward className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Skip</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Clock className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Snooze</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Users className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delegate</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add comment</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="mt-3 border-t border-border/50 pt-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${actionFeedback[action.id] === "useful" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : ""}`}
                    onClick={() => handleFeedback(action.id, "useful")}
                  >
                    <ThumbsUp className="mr-1.5 h-3.5 w-3.5" />
                    Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${actionFeedback[action.id] === "not_useful" ? "border-red-200 bg-red-50 text-red-700" : ""}`}
                    onClick={() => handleFeedback(action.id, "not_useful")}
                  >
                    <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                    Not helpful
                  </Button>
                </div>

                {commentOpen[action.id] && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={feedbackComment[action.id] ?? ""}
                      onChange={(event) =>
                        setFeedbackComment((previous) => ({
                          ...previous,
                          [action.id]: event.target.value,
                        }))
                      }
                      placeholder="Optional context for this feedback"
                      className="h-8 flex-1 rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <Button size="sm" className="h-8 text-xs" onClick={() => submitFeedback(action.id)}>
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
