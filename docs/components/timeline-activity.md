# TimelineActivity
> Vertical timeline of events with expandable email/content blocks.
## Import
```tsx
import {
  TimelineActivity,
  type TimelineEvent,
  type TimelineActivityProps,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
events | TimelineEvent[] | — | List of timeline events
className | string | — | Additional classes

### TimelineEvent
Prop | Type | Description
id | string | Unique event ID
icon | ReactNode | Icon for the event dot
title | ReactNode | Event title
time | string | Timestamp text
preview | ReactNode | Collapsed preview text
email | object | Email block (from, fromEmail?, to, cc?, bcc?, date?, subject?, body)
content | ReactNode | Generic expandable content
source | { label: string; url: string } | Link to source system
defaultExpanded | boolean | Initially expanded
isInteractive | boolean | Enables expand/collapse

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { TimelineActivity } from "@handled-ai/design-system"

const events = [
  {
    id: "1",
    icon: <span className="size-4" aria-hidden>✉</span>,
    title: "Email sent to Jane Doe",
    time: "2 hours ago",
    preview: "Re: Q3 proposal...",
    defaultExpanded: false,
    isInteractive: true,
    content: <p>Full email body...</p>,
  },
]

<TimelineActivity events={events} />
```
## Examples
### With Email Block
```tsx
import { TimelineActivity } from "@handled-ai/design-system"

<TimelineActivity
  events={[
    {
      id: "e1",
      icon: <span className="size-4" aria-hidden>✉</span>,
      title: "Outreach to Acme",
      time: "Jan 15, 2:30 PM",
      isInteractive: true,
      email: {
        from: "You",
        fromEmail: "you@company.com",
        to: "jane@acme.com",
        subject: "Partnership opportunity",
        date: "Jan 15, 2025",
        body: "Hi Jane,\n\nI wanted to reach out...",
      },
    },
  ]}
/>
```
### With Source Link
```tsx
{
  id: "2",
  icon: <span className="size-4" aria-hidden>↗</span>,
  title: "Meeting notes",
  time: "Yesterday",
  content: <p>Notes content...</p>,
  source: { label: "Salesforce", url: "https://sfdc.com/..." },
  isInteractive: true,
}
```
## Peer Dependencies
lucide-react
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/timeline-activity.tsx`

---
**Note:** Client-only. Uses `"use client"`. Events with isInteractive and (email or content) show expand/collapse.
