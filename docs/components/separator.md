# Separator

> A horizontal or vertical divider. Wraps Radix UI Separator. Client-only.

## Import

```tsx
import { Separator } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | "horizontal" \| "vertical" | "horizontal" | Divider orientation |
| decorative | boolean | true | Whether separator is decorative (no semantic role) |
| className | string | — | Additional CSS classes |
| ...props | SeparatorRootProps | — | Radix Separator.Root props |

## Variants

### Orientation

- **horizontal**: Full width, 1px height
- **vertical**: Full height, 1px width

## Basic Usage

```tsx
import { Separator } from "@handled-ai/design-system"

<div>
  <p>Section 1</p>
  <Separator />
  <p>Section 2</p>
</div>
```

## Examples

### Vertical separator

```tsx
import { Separator } from "@handled-ai/design-system"

<div className="flex h-5 items-center">
  <span>Item 1</span>
  <Separator orientation="vertical" />
  <span>Item 2</span>
  <Separator orientation="vertical" />
  <span>Item 3</span>
</div>
```

### Styled separator

```tsx
import { Separator } from "@handled-ai/design-system"

<Separator className="my-4" />
```

## Peer Dependencies

- radix-ui (includes @radix-ui/react-separator)
- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/separator.tsx`

**Note:** Client-only component.
