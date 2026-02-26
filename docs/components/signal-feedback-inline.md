# SignalApproval
> Inline approval flow for signals: create opportunity, dismiss, or submit feedback.
## Import
```tsx
import {
  SignalApproval,
  useSignalApproval,
} from "@handled-ai/design-system"
```
## Props
### SignalApproval.Root
Prop | Type | Default | Description
children | ReactNode | — | Child components
companyName | string | — | Company name for confirmation copy
opportunityUrl | string | — | Link shown after approval
onApprove | () => void | — | Called when opportunity is created
onApproveFeedback | (reasons: string[], detail: string) => void | — | Called when approve feedback is submitted
onDismiss | (reasons: string[], detail: string) => void | — | Called when signal is dismissed

### SignalApproval.Actions
No props. Renders approval/dismiss UI driven by context.

### SignalApproval.Gate
Prop | Type | Default | Description
children | ReactNode | — | Content locked until signal is approved or dismissed

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { SignalApproval } from "@handled-ai/design-system"

function SignalCard({ companyName, opportunityUrl }) {
  return (
    <SignalApproval.Root
      companyName={companyName}
      opportunityUrl={opportunityUrl}
      onApprove={() => console.log("Opportunity created")}
      onDismiss={(reasons, detail) => console.log("Dismissed", reasons, detail)}
    >
      <SignalApproval.Actions />
      <SignalApproval.Gate>
        <div>Unlocked content after approve or dismiss</div>
      </SignalApproval.Gate>
    </SignalApproval.Root>
  )
}
```
## Examples
### Score Analysis with Feedback
```tsx
<SignalApproval.Root
  companyName="Acme Corp"
  opportunityUrl="https://salesforce.com/opportunity/123"
  onApproveFeedback={(reasons, detail) => trackFeedback("approve", reasons, detail)}
  onDismiss={(reasons, detail) => trackFeedback("dismiss", reasons, detail)}
>
  <div className="space-y-4">
    <ScoreBreakdown factors={factors} />
    <SignalApproval.Actions />
    <SignalApproval.Gate>
      <EvidenceList items={evidence} />
    </SignalApproval.Gate>
  </div>
</SignalApproval.Root>
```
### Programmatic Control via useSignalApproval
```tsx
function CustomSignalUI() {
  return (
    <SignalApproval.Root companyName="Beta Inc">
      <InnerComponent />
    </SignalApproval.Root>
  )
}

function InnerComponent() {
  const { approvalState, requestApproval, requestDismiss } = useSignalApproval()
  return (
    <div>
      {approvalState === "pending" && (
        <>
          <button onClick={requestApproval}>Create Opportunity</button>
          <button onClick={requestDismiss}>Not Helpful</button>
        </>
      )}
    </div>
  )
}
```
## Peer Dependencies

- `lucide-react`
## Internal Dependencies
None
## Source
`registry/new-york/ui/signal-feedback-inline.tsx`

---
**Note:** Client-only. Uses `"use client"`. Compound component: Root provides context; Actions and Gate consume it. useSignalApproval must be used within Root.
