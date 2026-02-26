# RecommendedActionsSection

> Displays a list of recommended actions with category/priority badges, queue/dismiss controls, and feedback (helpful/not helpful). Client-only.

## Import

```tsx
import { RecommendedActionsSection, type RecommendedAction } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | RecommendedAction[] | — | List of recommended actions |
| title | string | "Recommended Actions" | Section title |
| onQueueAction | (action: RecommendedAction) => void | — | Called when user queues an action |
| onDismissAction | (action: RecommendedAction) => void | — | Called when user dismisses an action |
| onFeedback | (actionId: string, feedback: "useful" \| "not_useful", comment: string) => void | — | Called when user submits feedback |

**RecommendedAction:** `{ id: string; title: string; reason: string; category?: "Churn" | "Expand" | "Nurture" | string; priority?: "High" | "Medium" | "Low" | string; dueDate?: string; confidence?: number; signals?: string[]; revenueImpact?: number }`

## Variants

N/A

## Basic Usage

```tsx
import { RecommendedActionsSection } from "@handled-ai/design-system"

const actions = [
  { id: "1", title: "Schedule check-in", reason: "Account activity declining", category: "Nurture", priority: "High" },
]
<RecommendedActionsSection
  actions={actions}
  onQueueAction={(a) => addToQueue(a)}
  onDismissAction={(a) => dismiss(a)}
  onFeedback={(id, feedback, comment) => sendFeedback(id, feedback, comment)}
/>
```

## Examples

### With full action data

```tsx
import { RecommendedActionsSection } from "@handled-ai/design-system"

<RecommendedActionsSection
  actions={[
    {
      id: "expand-1",
      title: "Upsell Enterprise tier",
      reason: "Usage patterns suggest readiness for upgrade.",
      category: "Expand",
      priority: "High",
      dueDate: "This week",
      confidence: 0.85,
      signals: ["High engagement", "Budget available"],
      revenueImpact: 5000,
    },
  ]}
  title="Top Recommendations"
  onQueueAction={handleQueue}
  onDismissAction={handleDismiss}
  onFeedback={handleFeedback}
/>
```

### Minimal usage

```tsx
import { RecommendedActionsSection } from "@handled-ai/design-system"

<RecommendedActionsSection actions={actions} />
```

## Peer Dependencies

- lucide-react
- tailwind-merge (via cn utility)

## Internal Dependencies

- Badge, Button
- Tooltip, TooltipContent, TooltipProvider, TooltipTrigger

## Source

`registry/new-york/ui/recommended-actions-section.tsx`

**Note:** Client-only component.
