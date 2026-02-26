# ScoreFeedback

> A compound component for score feedback: thumbs up/down, pill selection, optional detail, and submitted-state display. Client-only.

## Import

```tsx
import { ScoreFeedback, useScoreFeedback } from "@handled-ai/design-system"
```

## Props

### ScoreFeedback.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | — | Trigger and Panel components |
| onSubmitFeedback | (type: "up" \| "down", pills: string[], detail: string) => void | — | Called when feedback is submitted |

### ScoreFeedback.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | — | Additional CSS classes |

### ScoreFeedback.Panel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | — | Additional CSS classes |

## Variants

N/A

## Basic Usage

```tsx
import { ScoreFeedback } from "@handled-ai/design-system"

<ScoreFeedback.Root onSubmitFeedback={(type, pills, detail) => sendFeedback(type, pills, detail)}>
  <div className="flex items-center gap-2">
    <span className="text-sm">How's this score?</span>
    <ScoreFeedback.Trigger />
  </div>
  <ScoreFeedback.Panel />
</ScoreFeedback.Root>
```

## Examples

### Inline with score display

```tsx
import { ScoreFeedback } from "@handled-ai/design-system"

<div>
  <div className="flex items-center gap-4">
    <ScoreRing score={72} />
    <ScoreFeedback.Root onSubmitFeedback={handleFeedback}>
      <ScoreFeedback.Trigger />
      <ScoreFeedback.Panel />
    </ScoreFeedback.Root>
  </div>
</div>
```

### Using useScoreFeedback

```tsx
import { ScoreFeedback, useScoreFeedback } from "@handled-ai/design-system"

function CustomTrigger() {
  const { thumbState, handleThumbClick } = useScoreFeedback()
  return (
    <div>
      <button onClick={() => handleThumbClick("up")}>👍</button>
      <button onClick={() => handleThumbClick("down")}>👎</button>
    </div>
  )
}

<ScoreFeedback.Root onSubmitFeedback={handleSubmit}>
  <CustomTrigger />
  <ScoreFeedback.Panel />
</ScoreFeedback.Root>
```

## Peer Dependencies

- lucide-react
- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/score-feedback.tsx`

**Note:** Client-only component. Must use within ScoreFeedback.Root. Positive pills: Right timing, Accurate data, Good prospect fit, Actionable. Negative pills: Bad timing, Inaccurate data, Wrong prospect, Already handled, Not actionable, Other.
