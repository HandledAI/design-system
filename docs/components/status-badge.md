# StatusBadge

Semantic status pill that automatically maps status strings to color categories (success, warning, error, neutral).

## Import

```tsx
import { StatusBadge } from "@handled-ai/design-system"
```

## Usage

```tsx
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="rejected" />
<StatusBadge status="draft" />
```

### Custom mapping

```tsx
<StatusBadge
  status="shortlisted"
  statusMap={{ shortlisted: "success", waitlisted: "warning" }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `string` | required | The status string to display and color-map. |
| `statusMap` | `Record<string, StatusType>` | `{}` | Custom overrides mapping lowercase status strings to `"success" \| "warning" \| "error" \| "neutral"`. |
| `className` | `string` | — | Additional CSS classes. |

## Auto-detection

When no custom map matches, the component scans for keywords:

- **success**: active, hired, completed, approved, resolved, done
- **warning**: pending, new, scheduled, screening, draft, paused, in_progress, review
- **error**: rejected, failed, cancelled, error, no_answer, dropped, blocked
- **neutral**: fallback for unrecognized strings
