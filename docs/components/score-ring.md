# ScoreRing

> A circular progress ring displaying a score (e.g. X/100) with color-coded fill (emerald ≥70%, amber ≥40%, red otherwise).

## Import

```tsx
import { ScoreRing, getScoreColor, type ScoreRingProps } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| score | number | — | Score value |
| denominator | number | 100 | Score denominator |
| size | number | 120 | Ring diameter in pixels |
| strokeWidth | number | 10 | Stroke width |
| className | string | — | Additional CSS classes |
| showLabel | boolean | true | Show score text in center |

## Variants

N/A

## Basic Usage

```tsx
import { ScoreRing } from "@handled-ai/design-system"

<ScoreRing score={72} />
```

## Examples

### Custom size and denominator

```tsx
import { ScoreRing } from "@handled-ai/design-system"

<ScoreRing score={8} denominator={10} size={80} strokeWidth={6} />
```

### Without center label

```tsx
import { ScoreRing } from "@handled-ai/design-system"

<ScoreRing score={45} showLabel={false} />
```

### Using getScoreColor utility

```tsx
import { ScoreRing, getScoreColor } from "@handled-ai/design-system"

const colorClass = getScoreColor(score, 100) // "text-emerald-500" | "text-amber-500" | "text-red-500"
<span className={colorClass}>{score}</span>
```

## Peer Dependencies

- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/score-ring.tsx`
