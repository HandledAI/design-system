# AgentPopover

Split-panel modal with a multi-step flow for agent interactions. Combines a branding panel (left) with step-based content (right). This is the UI shell only — consuming apps wire up their own AI backend.

## Import

```tsx
import {
  AgentPopover,
  AgentPopoverBranding,
  AgentPopoverStepContent,
  AgentPopoverForm,
  AgentPopoverOverview,
  AgentPopoverChat,
  useAgentPopover,
} from "@handled-ai/design-system"
```

## Usage

```tsx
const [open, setOpen] = useState(false)

<AgentPopover open={open} onOpenChange={setOpen} defaultStep="details">
  <AgentPopoverBranding
    title="ICU Registered Nurse"
    subtitle="AI Recruiter - CommonSpirit Health"
    badge="Intro Interview"
    visualSlot={<AgentOrb state={agentState} />}
    statusIndicator="ready"
  />

  <AgentPopoverStepContent step="details">
    <AgentPopoverForm
      fields={[
        { name: "name", label: "Full Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
      ]}
      onSubmit={(values) => goToStep("overview")}
    />
  </AgentPopoverStepContent>

  <AgentPopoverStepContent step="overview">
    <AgentPopoverOverview
      userSummary={{ name: "Jane Doe", email: "jane@example.com" }}
      discussionPoints={["Role responsibilities", "Schedule flexibility"]}
      actions={<Button onClick={startInterview}>Start Interview</Button>}
    />
  </AgentPopoverStepContent>

  <AgentPopoverStepContent step="interview">
    <AgentPopoverChat
      messages={messages}
      onSendMessage={send}
      onEndSession={end}
      status="connected"
      mode="listening"
    />
  </AgentPopoverStepContent>
</AgentPopover>
```

## Components

### AgentPopover (root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls visibility. |
| `onOpenChange` | `(open: boolean) => void` | required | Called on close (Escape, backdrop click, close button). |
| `defaultStep` | `string` | `"details"` | Initial step (uncontrolled). |
| `step` | `string` | — | Controlled step value. |
| `onStepChange` | `(step: string) => void` | — | Called when step changes. |

### AgentPopoverBranding

Left panel (40% width) with gradient background and dot pattern.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Main heading. |
| `subtitle` | `string` | — | Secondary text. |
| `badge` | `string` | — | Badge label above the title. |
| `visualSlot` | `ReactNode` | — | Visual element (typically `<AgentOrb />`). |
| `statusIndicator` | `"ready" \| "connected" \| "listening" \| "speaking"` | `"ready"` | Connection status pill. |

### AgentPopoverStepContent

Renders children only when its `step` matches the current step.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `string` | required | Step identifier to match against current step. |

### AgentPopoverForm

Form step with dynamic field rendering.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fields` | `AgentPopoverFormField[]` | `[]` | Field definitions. |
| `submitLabel` | `string` | `"Continue"` | Submit button text. |
| `onSubmit` | `(values: Record<string, string>) => void` | — | Called with form values. |

### AgentPopoverOverview

Summary step showing user info and discussion points.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userSummary` | `Record<string, string>` | — | Key/value pairs displayed in a summary card. |
| `discussionPoints` | `string[]` | — | Bullet list of discussion topics. |
| `actions` | `ReactNode` | — | Action buttons rendered at the bottom. |

### AgentPopoverChat

Thin wrapper around `AgentWidget` for the interview step. Accepts the same props as `AgentWidget`.

## useAgentPopover

Hook providing `{ step, setStep }` for custom step navigation within the popover.

## Theming

- Left panel gradient: `from-primary/5 via-background to-primary/10`
- Dot pattern: `var(--primary)` at low opacity
- All buttons use `bg-primary text-primary-foreground`
- Focus rings use `ring-primary`
- Border radius uses `rounded-3xl`
