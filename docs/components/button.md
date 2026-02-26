# Button
> Clickable button with semantic variants and sizes.
## Import
```tsx
import { Button, buttonVariants } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" | "default" | Style variant |
| size | "default" \| "sm" \| "lg" \| "icon" | "default" | Size |
| asChild | boolean | false | Render as child (Slot) |
| className | string | — | Additional classes |
| ...props | ComponentProps\<"button"\> | — | Standard button props |

## Variants
CVA `buttonVariants`:

**variant**
| Value | Description |
|-------|-------------|
| default | Primary filled |
| destructive | Destructive/red |
| outline | Bordered, transparent bg |
| secondary | Secondary bg |
| ghost | Transparent, hover bg |
| link | Link style underline |

**size**
| Value | Description |
|-------|-------------|
| default | h-9 px-4 |
| sm | h-8 px-3 |
| lg | h-10 px-6 |
| icon | size-9 square |

## Basic Usage
```tsx
import { Button } from "@handled-ai/design-system"

<Button>Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

## Examples

### Variants and sizes
```tsx
import { Button } from "@handled-ai/design-system"

<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button>
<Button variant="link">Learn more</Button>
```

### With buttonVariants
```tsx
import { buttonVariants } from "@handled-ai/design-system"
import { cn } from "@handled-ai/design-system"

<a href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
  Link styled as button
</a>
```

## Peer Dependencies
- @radix-ui/react-slot
- class-variance-authority

## Internal Dependencies
None

## Source
`registry/new-york/ui/button.tsx`
