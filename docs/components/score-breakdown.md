# ScoreBreakdown

> A table displaying score factors with labels, scores/risk badges, explanations, and thumbs up/down feedback with optional detail input. Client-only.

## Import

```tsx
import { ScoreBreakdown, type ScoreFactor, type ScoreBreakdownProps } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| factors | ScoreFactor[] | — | List of score factors |
| onFactorFeedback | (factorKey: string, type: "up" \| "down" \| null, detail?: string) => void | — | Feedback handler |
| className | string | — | Additional CSS classes |

**ScoreFactor:** `{ key: string; label: string; score: number | null; risk?: "Low" | "Medium" | "High"; why: string }`

## Variants

N/A

## Basic Usage

```tsx
import { ScoreBreakdown } from "@handled-ai/design-system"

const factors = [
  { key: "fit", label: "Product Fit", score: 85, why: "Strong use case match" },
  { key: "budget", label: "Budget", score: null, risk: "Medium", why: "TBD" },
]
<ScoreBreakdown factors={factors} />
```

## Examples

### With feedback handler

```tsx
import { ScoreBreakdown } from "@handled-ai/design-system"

<ScoreBreakdown
  factors={factors}
  onFactorFeedback={(key, type, detail) => {
    api.sendFactorFeedback({ factorKey: key, type, detail })
  }}
/>
```

### Mix of score and risk

```tsx
import { ScoreBreakdown } from "@handled-ai/design-system"

<ScoreBreakdown
  factors={[
    { key: "engagement", label: "Engagement", score: 72, why: "Regular usage" },
    { key: "churn", label: "Churn Risk", score: null, risk: "Low", why: "Stable patterns" },
  ]}
/>
```

## Peer Dependencies

- `lucide-react`
- `tailwind-merge` (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/score-breakdown.tsx`

**Note:** Client-only component.
