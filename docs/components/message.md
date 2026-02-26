# Message

Chat message primitives for building conversational UIs. Provides `Message`, `MessageContent`, and `MessageAvatar` building blocks.

## Import

```tsx
import { Message, MessageContent, MessageAvatar } from "@handled-ai/design-system"
```

## Usage

```tsx
<Message from="assistant">
  <MessageAvatar name="AI" />
  <MessageContent>Hello! How can I help you today?</MessageContent>
</Message>

<Message from="user">
  <MessageContent>I have a question about the role.</MessageContent>
</Message>
```

## Message

The root container. Sets layout direction based on `from`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `"user" \| "assistant"` | required | Sets alignment and applies group classes for child styling. |
| `className` | `string` | — | Additional CSS classes. |

## MessageContent

The bubble/text container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"contained" \| "flat"` | `"contained"` | `contained` shows colored bubbles; `flat` shows minimal styling. |
| `className` | `string` | — | Additional CSS classes. |

### Variant details

- **contained** (default): User messages use `bg-primary text-primary-foreground`. Assistant messages use `bg-muted text-foreground`.
- **flat**: User messages get a subtle secondary background. Assistant messages render as plain text.

## MessageAvatar

An `Avatar` preset with a ring border.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image source for the avatar. |
| `name` | `string` | — | Fallback initials (first 2 characters). |
| `className` | `string` | — | Additional CSS classes. |
| `children` | `ReactNode` | — | Custom avatar content (overrides src/name). |

## Theming

All colors use semantic tokens (`--primary`, `--muted`, `--foreground`), so messages adapt to any theme automatically.
