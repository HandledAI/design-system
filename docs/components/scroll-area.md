# ScrollArea

> A scrollable container with custom scrollbar. Wraps Radix UI Scroll Area. Client-only.

## Import

```tsx
import { ScrollArea, ScrollBar } from "@handled-ai/design-system"
```

## Props

### ScrollArea

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | — | Scrollable content |
| className | string | — | Additional CSS classes |
| ...props | ScrollAreaRootProps | — | Radix ScrollArea.Root props (e.g. type) |

### ScrollBar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | "vertical" \| "horizontal" | "vertical" | Scrollbar orientation |
| className | string | — | Additional CSS classes |
| ...props | ScrollAreaScrollbarProps | — | Radix ScrollAreaScrollbar props |

## Variants

N/A

## Basic Usage

```tsx
import { ScrollArea } from "@handled-ai/design-system"

<ScrollArea className="h-72">
  <div className="p-4">
    Long content here...
  </div>
</ScrollArea>
```

## Examples

### Horizontal scroll

```tsx
import { ScrollArea, ScrollBar } from "@handled-ai/design-system"

<ScrollArea>
  <div className="flex w-max gap-4 p-4">
    {items.map((item) => (
      <Card key={item.id}>{item.name}</Card>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Fixed height list

```tsx
import { ScrollArea } from "@handled-ai/design-system"

<ScrollArea className="h-[400px] rounded-md border">
  <div className="p-4 space-y-4">
    {listItems.map((item) => (
      <div key={item.id}>{item.content}</div>
    ))}
  </div>
</ScrollArea>
```

## Peer Dependencies

- radix-ui (includes @radix-ui/react-scroll-area)
- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility
- ScrollBar (rendered by default inside ScrollArea)

## Source

`registry/new-york/ui/scroll-area.tsx`

**Note:** Client-only component.
