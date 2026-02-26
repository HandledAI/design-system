# Dialog

> Modal dialog built on Radix Dialog. Compound composition for overlay, content, header, and footer.

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@handled-ai/design-system"
```

## Props

### Dialog (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| defaultOpen | boolean | — | Uncontrolled initial state |
| modal | boolean | true | Modal behavior |

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showCloseButton | boolean | true | Show X close button top-right |
| className | string | — | Additional classes |
| children | ReactNode | — | Content |

### DialogFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showCloseButton | boolean | false | Render default Close button |
| className | string | — | Additional classes |

Other parts (DialogHeader, DialogTitle, DialogDescription, DialogTrigger) accept standard HTML/Radix props.

Client-only: Yes (`"use client"`).

## Variants (if applicable)

N/A — composition-based.

## Basic Usage

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <p>Dialog content here.</p>
    <DialogFooter showCloseButton>
      <Button onClick={handleSubmit}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Examples

**Controlled modal**

```tsx
const [open, setOpen] = useState(false)
return (
  <>
    <Button onClick={() => setOpen(true)}>Edit</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your account settings.</DialogDescription>
        </DialogHeader>
        <Form>...</Form>
      </DialogContent>
    </Dialog>
  </>
)
```

**Without close button (custom layout)**

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent showCloseButton={false}>
    <div className="flex justify-end">
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
    </div>
    ...
  </DialogContent>
</Dialog>
```

**Footer with custom actions**

```tsx
<DialogFooter>
  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
  <Button onClick={handleSave}>Save</Button>
</DialogFooter>
```

## Peer Dependencies

- `radix-ui` (@radix-ui/react-dialog)
- `lucide-react`

## Internal Dependencies

- Button

## Source

`registry/new-york/ui/dialog.tsx`
