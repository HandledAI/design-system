# InboxRow

> Single row for inbox/queue lists: status dot, primary/secondary/tertiary text, contact methods, interaction count, assignee, status badge, time.

## Import

```tsx
import { InboxRow, InboxGroupHeader } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| itemId | string | — | ID (e.g. REF-1234) |
| statusColor | "red" \| "orange" \| "gray" | — | Status dot color |
| primaryText | string | — | Main label |
| secondaryText | string | — | "via X" source |
| tertiaryText | string | — | Dest/specialty |
| isAtRisk | boolean | false | Show "At Risk" badge |
| isSelected | boolean | false | Selected state styling |
| contactMethods | { phone?, email?, message? } | all true | Which contact icons to highlight |
| interactionCount | number \| string | — | Attempts (e.g. 3 or "4+") |
| assignee | string | — | Owner name |
| status | string | — | Status badge text |
| time | string | — | Relative time |
| className | string | — | Additional classes |
| ...props | HTMLDivElement | — | Native div props |

### InboxGroupHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Group title |
| count | number | — | Item count |

## Variants (if applicable)

- **statusColor**: `red`, `orange`, `gray` — controls risk dot.
- **interactionCount**: numeric vs `"4+"` — `4+` uses red styling.

## Basic Usage

```tsx
<InboxRow
  itemId="REF-1894"
  statusColor="red"
  primaryText="James Liu"
  secondaryText="Cedars"
  tertiaryText="Oncology"
  isAtRisk
  interactionCount="4+"
  assignee="Jessica Wong"
  status="E&B Verified"
  time="Aging 18h"
  onClick={() => selectItem("REF-1894")}
/>
```

## Examples

**Selected row**

```tsx
<InboxRow
  itemId="REF-1903"
  statusColor="gray"
  primaryText="Michael Brown"
  secondaryText="Providence"
  tertiaryText="Orthopedics"
  isSelected
  contactMethods={{ phone: false, email: true, message: false }}
  interactionCount={1}
  assignee="Sarah Johnson"
  status="Contacted"
  time="New today"
/>
```

**Group header**

```tsx
<InboxGroupHeader title="Contact Attempted" count={8} />
```

## Peer Dependencies

- `lucide-react` (Phone, Mail, MessageSquare, AlertCircle)

## Internal Dependencies

None (standalone).

## Source

`registry/new-york/ui/inbox-row.tsx`
