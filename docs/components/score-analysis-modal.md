# ScoreAnalysisModal

> A sheet-side panel displaying score breakdown, evidence, "Why Now", SignalApproval actions, and optional factor feedback. Client-only.

## Import

```tsx
import { ScoreAnalysisModal, type ScoreAnalysisModalProps } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| title | string | — | Panel title |
| description | string | — | Description text |
| score | number | — | Score value |
| denominator | number | 100 | Score denominator |
| whyNow | string | — | "Why Now" explanation |
| evidence | React.ReactNode[] | — | Supporting evidence list items |
| factors | ScoreFactor[] | — | Score breakdown factors |
| onFactorFeedback | (factorKey: string, type: "up" \| "down" \| null, detail?: string) => void | — | Factor feedback handler |
| companyName | string | "Account" | For SignalApproval |
| opportunityUrl | string | — | URL for "Opportunity Created" link |
| onApprove | () => void | — | Approve callback |
| onApproveFeedback | (reasons: string[], detail: string) => void | — | Approve feedback callback |
| onDismiss | (reasons: string[], detail: string) => void | — | Dismiss callback |

**ScoreFactor:** See ScoreBreakdown (key, label, score, risk, why)

## Variants

N/A

## Basic Usage

```tsx
import { ScoreAnalysisModal } from "@handled-ai/design-system"

<ScoreAnalysisModal
  open={open}
  onOpenChange={setOpen}
  title="Engagement Score"
  description="Account engagement based on recent activity."
  score={72}
  whyNow="Recent webinar attendance and document views."
  evidence={["Attended webinar", "Viewed 3 docs", "Opened 5 emails"]}
/>
```

## Examples

### With factor breakdown and feedback

```tsx
import { ScoreAnalysisModal } from "@handled-ai/design-system"

<ScoreAnalysisModal
  open={open}
  onOpenChange={setOpen}
  title="Propensity Score"
  description="Likelihood to convert."
  score={68}
  whyNow="Strong buying signals."
  evidence={["Budget confirmed", "Champion identified"]}
  factors={[
    { key: "fit", label: "Product Fit", score: 80, why: "Use case alignment" },
    { key: "timing", label: "Timing", score: 55, why: "Evaluation cycle" },
  ]}
  onFactorFeedback={(key, type, detail) => sendFeedback(key, type, detail)}
  companyName="Acme Corp"
  opportunityUrl="/opportunities/123"
  onApprove={() => createOpp()}
  onDismiss={(reasons, detail) => dismiss(reasons, detail)}
/>
```

### Without approval flow

```tsx
import { ScoreAnalysisModal } from "@handled-ai/design-system"

<ScoreAnalysisModal
  open={open}
  onOpenChange={setOpen}
  title="Health Score"
  description="Account health summary."
  score={45}
  denominator={100}
  whyNow="Declining engagement."
  evidence={["No logins in 14 days", "Support tickets open"]}
/>
```

## Peer Dependencies

- `lucide-react`
- `tailwind-merge` (via cn utility)

## Internal Dependencies

- Sheet, SheetContent, SheetHeader, SheetTitle
- Badge
- ScoreRing
- ScoreBreakdown
- SignalApproval (SignalApproval.Root, SignalApproval.Actions)

## Source

`registry/new-york/ui/score-analysis-modal.tsx`

**Note:** Client-only component. Also exported as ScoreAnalysisPanel.
