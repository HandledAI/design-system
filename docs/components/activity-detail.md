# ActivityDetail
> Full detail view for a single activity item (email, call, meeting, or signal) with thread support and participants.
## Import
```tsx
import { ActivityDetail } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activity | ActivityDetailData | — | Activity data object |
| onBack | () => void | — | Optional callback when Back is clicked |
| actions | React.ReactNode | — | Optional action buttons/content |

### ActivityDetailData
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | React.ReactNode | — | Activity icon |
| title | string | — | Title text |
| details | string | — | Summary/details |
| content | string | — | Optional body content |
| time | string | — | Timestamp |
| source | string | — | Source name (e.g. "Gmail") |
| sourceIcon | React.ReactNode | — | Optional source icon override |
| type | "email" \| "call" \| "meeting" \| "signal" | — | Activity type |
| thread | ActivityThreadMessage[] | — | Message thread for emails |
| participants | ActivityParticipant[] | — | Participants (non-email) |
| tags | string[] | — | Optional tags |
| externalUrl | string | — | Link to open in external app |

## Variants
N/A
## Basic Usage
```tsx
import { ActivityDetail } from "@handled-ai/design-system"

<ActivityDetail
  activity={{
    icon: <Mail className="w-4 h-4" />,
    title: "Re: Q3 Review",
    details: "Follow-up on pricing discussion",
    time: "2:30 PM",
    source: "Gmail",
    type: "email",
  }}
  onBack={() => setSelected(null)}
/>
```

## Examples

### With email thread
```tsx
import { ActivityDetail } from "@handled-ai/design-system"

<ActivityDetail
  activity={{
    icon: <Mail className="w-4 h-4" />,
    title: "Thread subject",
    details: "Summary",
    time: "3:00 PM",
    source: "Gmail",
    type: "email",
    thread: [
      { id: "1", sender: "Alice", time: "2:00 PM", content: "First message" },
      { id: "2", sender: "Bob", time: "2:30 PM", content: "Reply", isCurrent: true },
    ],
  }}
/>
```

### With participants and actions
```tsx
import { ActivityDetail, Button } from "@handled-ai/design-system"

<ActivityDetail
  activity={{
    icon: <Phone className="w-4 h-4" />,
    title: "Discovery call",
    details: "Initial discussion",
    time: "Yesterday",
    source: "Calendly",
    type: "meeting",
    participants: [{ name: "Jane Doe", role: "CFO" }],
  }}
  actions={<Button size="sm">Add to CRM</Button>}
/>
```

## Peer Dependencies
- react, react-dom
- lucide-react

## Internal Dependencies
- Button
- Badge

## Source
`registry/new-york/ui/activity-detail.tsx`

**Client-only:** Yes (`"use client"`)
