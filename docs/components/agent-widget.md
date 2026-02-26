# AgentWidget

Embeddable voice/chat widget UI shell with message display, voice state indicators, and text input. No AI SDK dependency — consuming apps pass messages, send callbacks, and session controls.

## Import

```tsx
import { AgentWidget } from "@handled-ai/design-system"
```

## Usage

```tsx
<AgentWidget
  status="connected"
  mode="listening"
  messages={[
    { from: "assistant", text: "Hi! Tell me about your experience." },
    { from: "user", text: "I have 5 years in critical care nursing." },
  ]}
  onSendMessage={(text) => sendToBackend(text)}
  onEndSession={() => disconnect()}
  inputMode="voice+text"
  visualSlot={<AgentOrb state="listening" />}
/>
```

### Standalone embed

```tsx
<div className="w-[400px] h-[600px] border rounded-2xl overflow-hidden">
  <AgentWidget
    status="connected"
    messages={messages}
    onSendMessage={send}
    onEndSession={end}
    header={<WidgetHeader />}
    footer={<PrivacyFooter />}
  />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"idle" \| "connecting" \| "connected" \| "error"` | `"idle"` | Connection state (controls UI hints). |
| `mode` | `"listening" \| "speaking" \| null` | `null` | Voice interaction mode (controls status indicator). |
| `messages` | `AgentWidgetMessage[]` | `[]` | Chat message array (`{ from, text }`). |
| `onSendMessage` | `(text: string) => void` | — | Called when user sends a text message. |
| `onEndSession` | `() => void` | — | Called when user ends the session. |
| `inputMode` | `"voice" \| "text" \| "voice+text"` | `"voice+text"` | Controls which input affordances to show. |
| `visualSlot` | `ReactNode` | — | Visual element for empty state (e.g., `<AgentOrb />`). |
| `assistantAvatarSlot` | `ReactNode` | — | Custom avatar for assistant messages. |
| `header` | `ReactNode` | — | Optional header slot. |
| `footer` | `ReactNode` | — | Optional footer slot. |
| `className` | `string` | — | Additional CSS classes. |

## Theming

- Text input border: `border-foreground`
- Send button: `bg-muted-foreground hover:bg-foreground`
- End-call button: `border-border`, icon `text-foreground`
- Listening pill: `bg-primary/5 border-primary/10`, dot `bg-green-500`
- All colors semantic — adapts to any theme via CSS variables
