# Sheet

> A slide-in panel (drawer) from any edge. Uses Radix Dialog under the hood. Client-only.

## Import

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@handled-ai/design-system"
```

## Props

### Sheet (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| defaultOpen | boolean | — | Uncontrolled default |
| ...props | DialogRootProps | — | Radix Dialog.Root props |

### SheetContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| side | "top" \| "right" \| "bottom" \| "left" | "right" | Which edge to slide from |
| showCloseButton | boolean | true | Show close (X) button |
| children | React.ReactNode | — | Content |
| className | string | — | Additional CSS classes |
| ...props | DialogContentProps | — | Radix Dialog.Content props |

### SheetTrigger, SheetClose

Standard Radix trigger/close props.

### SheetHeader, SheetFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | — | Additional CSS classes |
| children | React.ReactNode | — | Header/footer content |

### SheetTitle, SheetDescription

Standard Radix title/description props. Accept `className`.

## Variants

### SheetContent side

- **right**: Slide from right (default)
- **left**: Slide from left
- **top**: Slide from top
- **bottom**: Slide from bottom

## Basic Usage

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@handled-ai/design-system"

<Sheet>
  <SheetTrigger asChild>
    <button>Open</button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
    </SheetHeader>
    <div>Content here</div>
  </SheetContent>
</Sheet>
```

## Examples

### Controlled from left

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@handled-ai/design-system"

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left" className="w-80">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Configure your preferences.</SheetDescription>
    </SheetHeader>
    <div className="py-4">Settings form...</div>
  </SheetContent>
</Sheet>
```

### Bottom sheet without close button

```tsx
import { Sheet, SheetContent } from "@handled-ai/design-system"

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="bottom" showCloseButton={false}>
    <div className="p-4">Modal-like bottom panel</div>
  </SheetContent>
</Sheet>
```

## Peer Dependencies

- radix-ui (Sheet uses Dialog primitive)
- lucide-react (XIcon)
- tailwind-merge (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/sheet.tsx`

**Note:** Client-only component.
