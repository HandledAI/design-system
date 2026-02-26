# DetailView

> Compound layout for detail/activity views with header, summary, citations, and thread UI.

## Import

```tsx
import {
  DetailViewHeader,
  DetailViewSummary,
  DetailViewThread,
  Citation,
  SourceList,
  SourceDef,
  ThreadMessage,
} from "@handled-ai/design-system"
```

## Props

### DetailViewHeader

Prop | Type | Default | Description
-----|------|---------|------------
title | string | — | Main heading
breadcrumbs | ReactNode | — | Breadcrumb content
badges | ReactNode | — | Badge/tag content
onBack | () => void | — | Back handler; hides Back button when omitted

### DetailViewSummary

Prop | Type | Default | Description
-----|------|---------|------------
title | string | "Here's what I found" | Section title
children | ReactNode | — | Summary content
sources | ReactNode | — | Optional collapsible sources slot
actions | ReactNode | — | Optional action buttons

### DetailViewThread

Prop | Type | Default | Description
-----|------|---------|------------
title | string | — | Thread section title
actionCount | number | — | Optional action count label
children | ReactNode | — | Thread content

### ThreadMessage

Prop | Type | Default | Description
-----|------|---------|------------
subject | string | — | Message subject
time | string | — | Timestamp
children | ReactNode | — | Message body
icon | ReactNode | — | Optional icon
messageCount | number | — | Thread message count
threadLink | string | — | Link to full thread
sender | string | — | Sender name
senderTime | string | — | Sender timestamp
isExpanded | boolean | true | Whether body is visible

### Citation / SourceDef

SourceDef: `{ id, summary, meta }`

Client-only: Yes (`"use client"`).

## Variants (if applicable)

N/A — compound composition.

## Basic Usage

```tsx
<DetailViewHeader
  title="Account Research"
  breadcrumbs={<>Acme Corp · Research</>}
  badges={<Badge variant="outline">Draft</Badge>}
  onBack={() => navigate(-1)}
/>
<DetailViewSummary
  title="Findings"
  sources={<SourceList sources={sources} />}
  actions={<Button size="sm">Export</Button>}
>
  <p>Key signals and insights...</p>
</DetailViewSummary>
```

## Examples

**Header with back navigation**

```tsx
<DetailViewHeader
  title="Signal Analysis"
  breadcrumbs={<>Inbox · REF-1234</>}
  badges={[
    <Badge key="a" variant="secondary">New</Badge>,
    <Badge key="b" variant="outline">AI</Badge>,
  ]}
  onBack={() => setView("list")}
/>
```

**Summary with collapsible sources**

```tsx
<DetailViewSummary
  title="Here's what I found"
  sources={
    <SourceList
      sources={[
        { id: 1, summary: "Crunchbase funding data", meta: "2h ago" },
        { id: 2, summary: "LinkedIn company profile", meta: "12h ago" },
      ]}
    />
  }
>
  <p>Recent funding round and hiring signals...</p>
  <Citation number={1} source={{ id: 1, summary: "Crunchbase...", meta: "2h ago" }} />
</DetailViewSummary>
```

**Thread with messages**

```tsx
<DetailViewThread title="Email Thread" actionCount={3}>
  <ThreadMessage
    subject="Re: Acme Corp follow-up"
    time="Today at 2:30 PM"
    sender="Sarah Johnson"
    senderTime="2:31 PM"
    messageCount={4}
    threadLink="https://..."
  >
    <p>Message body content...</p>
  </ThreadMessage>
</DetailViewThread>
```

## Peer Dependencies

- `radix-ui` (HoverCard)
- `lucide-react`

## Internal Dependencies

- `button`
- `badge`

## Source

`registry/new-york/ui/detail-view.tsx`
