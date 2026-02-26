# Tooltip
> Radix-based tooltip with arrow, animations, and provider.
## Import
```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@handled-ai/design-system"
```
## Props
### TooltipProvider
Prop | Type | Default | Description
delayDuration | number | 0 | Hover delay in ms
skipDelayDuration | number | — | Delay before next tooltip
...props | TooltipPrimitive.Provider props | — | Other Radix provider props

### Tooltip (Root)
Prop | Type | Default | Description
...props | TooltipPrimitive.Root props | — | open, onOpenChange, defaultOpen, delayDuration

### TooltipTrigger
Prop | Type | Default | Description
asChild | boolean | — | Compose with child (Slot)
...props | TooltipPrimitive.Trigger props | — | Standard trigger props

### TooltipContent
Prop | Type | Default | Description
sideOffset | number | 0 | Offset from trigger
side | "top" \| "right" \| "bottom" \| "left" | — | Preferred side
align | "start" \| "center" \| "end" | — | Alignment
className | string | — | Additional classes
...props | TooltipPrimitive.Content props | — | collisionBoundary, etc.

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@handled-ai/design-system"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent>Helpful context</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
## Examples
### With Icon Button
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button aria-label="Settings">
      <Settings className="size-4" />
    </button>
  </TooltipTrigger>
  <TooltipContent side="bottom">Settings</TooltipContent>
</Tooltip>
```
### Sidebar Collapsed Tooltip
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <SidebarMenuButton>
      <Home className="size-4" />
      <span>Home</span>
    </SidebarMenuButton>
  </TooltipTrigger>
  <TooltipContent side="right">Home</TooltipContent>
</Tooltip>
```
## Peer Dependencies
radix-ui (Tooltip primitive)
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/tooltip.tsx`

---
**Note:** Client-only. Uses `"use client"`. Wrap app (or section) in TooltipProvider. Content includes built-in arrow.
