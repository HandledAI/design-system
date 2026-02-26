# SuggestedActions
> Expandable cards for AI-suggested actions (email, ticket, slack, call) with draft editing and feedback.
## Import
```tsx
import {
  SuggestedActions,
  type SuggestedActionsProps,
  type SuggestedAction,
  type SuggestedContact,
  type SuggestedActionsIconMap,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
actions | SuggestedAction[] | — | List of suggested actions
title | string | "Suggested Actions" | Section heading
onDismiss | (id: number \| string) => void | — | Called when action is dismissed
onSend | (id: number \| string) => void | — | Called when sent
onSaveDraft | (id: number \| string) => void | — | Called when draft is saved
accountContacts | SuggestedContact[] | — | Contacts for To/Cc/Bcc picker
signature | string | — | Email signature text
onDuplicate | (id: number \| string) => void | — | Copy for another contact
onOpenAccountDetails | () => void | — | Open account details
onOpenRecentActivity | () => void | — | Open recent activity
onMarkComplete | (id: number \| string) => void | — | Mark call action complete
onDispatchAgent | (id: number \| string) => void | — | Dispatch agent (calls)
iconMap | SuggestedActionsIconMap | — | Brand icons (gmail, slack, zendesk, salesforce URLs)

### SuggestedAction
id, type ("email" \| "ticket" \| "slack" \| "call"), label, status ("pending" \| "sent" \| "dismissed"), content?, replyTo?, threadMessages?, ticket?, followUp?, emailMeta?, callMeta?

### SuggestedActionsIconMap
gmail?, slack?, zendesk?, salesforce? — image URLs for brand icons

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { SuggestedActions } from "@handled-ai/design-system"

const actions = [
  {
    id: 1,
    type: "email",
    label: "Follow up with Jane Doe",
    status: "pending",
    content: "<p>Hi Jane...</p>",
    emailMeta: {
      from: "You",
      fromEmail: "you@company.com",
      to: { name: "Jane Doe", role: "VP Sales", email: "jane@acme.com", confirmed: true },
    },
  },
]

<SuggestedActions
  actions={actions}
  onSend={(id) => console.log("Sent", id)}
  onDismiss={(id) => console.log("Dismissed", id)}
/>
```
## Examples
### With Account Contacts
```tsx
<SuggestedActions
  actions={emailActions}
  accountContacts={[
    { name: "John Smith", role: "CEO", email: "john@acme.com", confirmed: true },
  ]}
  signature="- Best regards"
  onSend={handleSend}
  onOpenAccountDetails={() => openModal("account")}
  title="Recommended Outreach"
/>
```
### Call Action with Talk Track
```tsx
<SuggestedActions
  actions={[
    {
      id: 2,
      type: "call",
      label: "Call Sarah Chen",
      status: "pending",
      callMeta: {
        contact: { name: "Sarah Chen", phone: "+1 555-0100", confirmed: true },
        talkTrack: "Discuss Q3 renewal timeline...",
        allowDispatchAgent: true,
      },
    },
  ]}
  accountContacts={contacts}
  onMarkComplete={handleComplete}
  onDispatchAgent={handleDispatch}
/>
```
## Peer Dependencies

- `lucide-react`
## Internal Dependencies
Button
## Source
`registry/new-york/ui/suggested-actions.tsx`

---
**Note:** Client-only. Uses `"use client"`. Each action card expands to show email header, ticket form, or call UI with draft editing and feedback pills.
