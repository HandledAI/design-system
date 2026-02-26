# ContactList
> List of contacts with badges, channel icons, and action buttons.
## Import
```tsx
import { ContactList } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Section title |
| count | string | — | Optional count text |
| contacts | ContactItem[] | — | Contact items |
| onAdd | () => void | — | Add button callback |
| addLabel | string | "Add" | Add button label |

### ContactItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Unique id |
| name | string | — | Display name |
| role | string | — | Role/title |
| badge | { label: string; color?: "indigo" \| "green" \| "amber" \| "red" \| "muted" } | — | Optional badge |
| channels | ContactChannel[] | — | Channel buttons |
| action | { label: string; onClick?: () => void } | — | Primary action |
| description | string | — | Optional description |
| onDismiss | () => void | — | Dismiss callback |

### ContactChannel
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | "linkedin" \| "gmail" \| "salesforce" \| "phone" \| "custom" | — | Channel type |
| icon | React.ReactNode | — | Icon |
| label | string | — | Tooltip/label |
| onClick | () => void | — | Click handler |

## Variants
N/A
## Basic Usage
```tsx
import { ContactList } from "@handled-ai/design-system"

<ContactList
  title="Stakeholders"
  contacts={[
    {
      id: "1",
      name: "Jane Doe",
      role: "CFO",
      badge: { label: "Primary", color: "green" },
      channels: [
        { type: "gmail", icon: <span className="w-4 h-4" aria-hidden>✉</span>, onClick: () => {} },
        { type: "linkedin", icon: <span className="w-4 h-4" aria-hidden>in</span> },
      ],
    },
  ]}
  onAdd={() => {}}
/>
```

## Examples

### With action and dismiss
```tsx
import { ContactList } from "@handled-ai/design-system"

<ContactList
  title="Team"
  count="3 contacts"
  contacts={[
    {
      id: "1",
      name: "John Smith",
      role: "CEO",
      action: { label: "Add to CRM", onClick: () => {} },
      onDismiss: () => {},
    },
  ]}
  onAdd={() => {}}
  addLabel="Add contact"
/>
```

### Multiple badge colors
```tsx
<ContactList
  contacts={[
    { id: "1", name: "A", role: "Role", badge: { label: "Hot", color: "red" } },
    { id: "2", name: "B", role: "Role", badge: { label: "Warm", color: "amber" } },
  ]}
/>
```

## Peer Dependencies
- lucide-react

## Internal Dependencies
- Badge
- Button

## Source
`registry/new-york/ui/contact-list.tsx`

**Client-only:** Yes (`"use client"`)
