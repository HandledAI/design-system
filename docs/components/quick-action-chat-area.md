# QuickActionChatArea

> A chat-style input area for creating tasks with message input, priority selector, and submit. Client-only.

## Import

```tsx
import { QuickActionChatArea } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | string | "How can I help you today?" | Input placeholder |
| submitLabel | string | "Create Task" | Submit button label |
| value | string | — | Controlled input value |
| defaultValue | string | "" | Uncontrolled default value |
| onValueChange | (value: string) => void | — | Called when input changes |
| priority | QuickActionPriority | — | Controlled priority |
| defaultPriority | QuickActionPriority | "normal" | Uncontrolled default priority |
| onPriorityChange | (priority: QuickActionPriority) => void | — | Called when priority changes |
| onSubmit | (payload: QuickActionSubmitPayload) => void | — | Submit handler (required) |
| allowEmptySubmit | boolean | false | Allow submit with empty message |
| clearOnSubmit | boolean | true | Clear input after submit |
| showEnterHint | boolean | true | Show "Press ⏎ to create" hint |
| className | string | — | Additional CSS classes |
| ...props | Omit<div, 'onSubmit'> | — | Standard div attributes |

**QuickActionPriority:** `"normal"` | `"high"` | `"urgent"`  
**QuickActionSubmitPayload:** `{ message: string; priority: QuickActionPriority }`

## Variants

N/A

## Basic Usage

```tsx
import { QuickActionChatArea } from "@handled-ai/design-system"

<QuickActionChatArea
  onSubmit={(payload) => console.log(payload.message, payload.priority)}
/>
```

## Examples

### Controlled with custom placeholder

```tsx
import { QuickActionChatArea } from "@handled-ai/design-system"

const [text, setText] = useState("")
<QuickActionChatArea
  value={text}
  onValueChange={setText}
  placeholder="Describe your task..."
  submitLabel="Add"
  onSubmit={(p) => handleCreate(p)}
/>
```

### With priority handling

```tsx
import { QuickActionChatArea } from "@handled-ai/design-system"

<QuickActionChatArea
  defaultPriority="high"
  onPriorityChange={(p) => setPriority(p)}
  onSubmit={({ message, priority }) => createTask({ message, priority })}
  clearOnSubmit={false}
/>
```

## Peer Dependencies

- lucide-react
- tailwind-merge (via cn utility)

## Internal Dependencies

- Button, cn utility

## Source

`registry/new-york/ui/quick-action-chat-area.tsx`

**Note:** Client-only component.
