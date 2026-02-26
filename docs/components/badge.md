# Badge
> Small label or status indicator with semantic variants.
## Import
```tsx
import { Badge, badgeVariants } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link" | "default" | Style variant |
| asChild | boolean | false | Render as child component (Slot) |
| className | string | — | Additional classes |
| ...props | ComponentProps\<"span"\> | — | Standard span props |

## Variants
CVA `badgeVariants`:

| variant | Description |
|---------|-------------|
| default | Primary background |
| secondary | Secondary background |
| destructive | Destructive/error styling |
| outline | Border with transparent bg |
| ghost | Transparent, hover styles |
| link | Link-like underline on hover |

## Basic Usage
```tsx
import { Badge } from "@handled-ai/design-system"

<Badge>New</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
```

## Examples

### Outline and ghost
```tsx
import { Badge } from "@handled-ai/design-system"

<Badge variant="outline">Tag</Badge>
<Badge variant="ghost">Subtle</Badge>
```

### With badgeVariants
```tsx
import { badgeVariants } from "@handled-ai/design-system"
import { cn } from "@handled-ai/design-system"

<span className={cn(badgeVariants({ variant: "outline" }), "custom-class")}>
  Custom
</span>
```

## Peer Dependencies
- class-variance-authority
- radix-ui (Slot)

## Internal Dependencies
None

## Source
`registry/new-york/ui/badge.tsx`
