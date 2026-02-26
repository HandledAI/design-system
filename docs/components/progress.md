# Progress

> A horizontal progress bar built on Radix UI Progress. Client-only due to Radix primitives.

## Import

```tsx
import { Progress } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | — | Progress value (0–100) |
| className | string | — | Additional CSS classes |
| ...props | ProgressRootProps | — | Radix Progress.Root props |

## Variants

N/A

## Basic Usage

```tsx
import { Progress } from "@handled-ai/design-system"

<Progress value={60} />
```

## Examples

### Indeterminate (no value)

```tsx
import { Progress } from "@handled-ai/design-system"

<Progress />
```

### Custom styling

```tsx
import { Progress } from "@handled-ai/design-system"

<Progress value={75} className="h-3" />
```

## Peer Dependencies

- radix-ui (includes @radix-ui/react-progress)
- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/progress.tsx`

**Note:** Client-only component. Use in client components or wrap with dynamic import if needed in server contexts.
