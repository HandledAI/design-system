# QuickActionModal

> A modal for quick task creation with template grid and freeform input. Client-only.

## Import

```tsx
import { QuickActionModal, type QuickActionTemplate, type QuickActionTaskDraft } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| templates | QuickActionTemplate[] | DEFAULT_TEMPLATES | Task templates to display |
| title | string | "Quick Action" | Modal title |
| description | string | "Choose a template or describe your task below." | Modal description |
| className | string | — | Additional CSS classes for content |
| onCreateTask | (draft: QuickActionTaskDraft) => void | — | Called when a task is created (template or freeform) |

**QuickActionTemplate:** `{ id: string; label: string; description: string; icon: TemplateIcon; category?: string }`  
**QuickActionTaskDraft:** `{ templateId: string | null; message: string; priority: QuickActionPriority }`

## Variants

N/A

## Basic Usage

```tsx
import { QuickActionModal } from "@handled-ai/design-system"

const [open, setOpen] = useState(false)
<QuickActionModal
  open={open}
  onOpenChange={setOpen}
  onCreateTask={(draft) => {
    createTask(draft)
    setOpen(false)
  }}
/>
```

## Examples

### With custom templates

```tsx
import { QuickActionModal } from "@handled-ai/design-system"

const MailIcon = () => <span className="size-4" aria-hidden>✉</span>
const PhoneIcon = () => <span className="size-4" aria-hidden>📞</span>
const templates = [
  { id: "email", label: "Send Email", description: "Follow up via email", icon: MailIcon },
  { id: "call", label: "Schedule Call", description: "Book a call", icon: PhoneIcon },
]
<QuickActionModal
  open={open}
  onOpenChange={setOpen}
  templates={templates}
  onCreateTask={handleCreate}
/>
```

### Custom title and description

```tsx
import { QuickActionModal } from "@handled-ai/design-system"

<QuickActionModal
  open={open}
  onOpenChange={setOpen}
  title="New Task"
  description="Pick a template or type your task."
  onCreateTask={handleCreate}
/>
```

## Peer Dependencies

- lucide-react
- tailwind-merge (via cn utility)

## Internal Dependencies

- Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle

## Source

`registry/new-york/ui/quick-action-modal.tsx`

**Note:** Client-only component.
