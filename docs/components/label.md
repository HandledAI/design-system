# Label

> Accessible form label using Radix Label. Pairs with Input, Select, etc.

## Import

```tsx
import { Label } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| htmlFor | string | — | ID of associated control |
| className | string | — | Additional classes |
| ...props | LabelProps | — | Radix Label.Root props |

Styled: `text-sm font-medium`, disabled/peer-disabled handling.

## Variants (if applicable)

N/A — single variant.

## Basic Usage

```tsx
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" placeholder="you@example.com" />
```

## Examples

**With Input**

```tsx
<div>
  <Label htmlFor="search">Search</Label>
  <Input id="search" placeholder="Search..." />
</div>
```

**With Select**

```tsx
<Label htmlFor="status">Status</Label>
<Select>
  <SelectTrigger id="status">
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>
```

**In form group**

```tsx
<div className="space-y-2">
  <Label htmlFor="name">Full name</Label>
  <Input id="name" />
</div>
```

## Peer Dependencies

- `@radix-ui/react-label`

## Internal Dependencies

- `lib/utils` (cn)

## Source

`registry/new-york/ui/label.tsx`

**Client-only:** Uses `"use client"`.
