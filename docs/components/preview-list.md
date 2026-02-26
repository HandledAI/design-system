# PreviewList

> A list container that limits visible items (first 8) and pairs with PreviewListItem for compact row layouts with icon, title, subtitle, meta, and optional hover action.

## Import

```tsx
import { PreviewList, PreviewListItem } from "@handled-ai/design-system"
```

## Props

### PreviewList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | — | Child elements (PreviewListItem recommended) |
| className | string | — | Additional CSS classes |
| ...props | HTMLDivElement | — | Standard div attributes |

### PreviewListItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | React.ReactNode | — | Icon element on the left |
| title | React.ReactNode | — | Primary text |
| subtitle | React.ReactNode | — | Secondary text below title |
| meta | React.ReactNode | — | Right-side meta (e.g. time, badges) |
| action | React.ReactNode | — | Hover-revealed action (e.g. Join button) |
| isHoverable | boolean | true | Enables hover styles and cursor |
| className | string | — | Additional CSS classes |
| ...props | Omit<HTMLDivElement, 'title'> | — | Standard div attributes |

## Variants

N/A

## Basic Usage

```tsx
import { PreviewList, PreviewListItem } from "@handled-ai/design-system"

<PreviewList>
  <PreviewListItem
    icon={<span className="h-4 w-4" aria-hidden>👥</span>}
    title="Team Alpha"
    subtitle="5 members"
    meta="2h ago"
  />
</PreviewList>
```

## Examples

### With action on hover

```tsx
import { PreviewList, PreviewListItem, Button } from "@handled-ai/design-system"

<PreviewList>
  <PreviewListItem
    title="Meeting Room A"
    subtitle="Available"
    meta="Floor 2"
    action={<Button size="sm">Join</Button>}
  />
</PreviewList>
```

### Non-hoverable row

```tsx
import { PreviewList, PreviewListItem } from "@handled-ai/design-system"

<PreviewList>
  <PreviewListItem
    title="Read-only item"
    subtitle="No interaction"
    isHoverable={false}
  />
</PreviewList>
```

## Peer Dependencies

- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/preview-list.tsx`
