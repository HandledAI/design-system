# ActivityLog
> Paginated list of activity items (workouts, weigh-ins, biometrics, check-ins) with expandable "Show more".
## Import
```tsx
import { ActivityLog, ActivityRow } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | ActivityLogItem[] | — | Array of activity items |
| title | string | "Recent Activity" | Section title |
| initialLimit | number | 5 | Number of items shown initially |

### ActivityLogItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Unique id |
| type | "workout" \| "weighin" \| "biometric" \| "checkin" \| string | — | Activity type (determines icon) |
| title | string | — | Title |
| details | string | — | Details text |
| date | string | — | Date string |
| time | string | — | Time string |

## Variants
N/A
## Basic Usage
```tsx
import { ActivityLog } from "@handled-ai/design-system"

<ActivityLog
  items={[
    { id: "1", type: "workout", title: "Morning run", details: "5K", date: "2025-02-25", time: "7:00 AM" },
  ]}
  title="Recent Activity"
  initialLimit={5}
/>
```

## Examples

### With mixed types
```tsx
import { ActivityLog } from "@handled-ai/design-system"

<ActivityLog
  items={[
    { id: "1", type: "workout", title: "HIIT", details: "30 min", date: "2025-02-25", time: "7:00 AM" },
    { id: "2", type: "weighin", title: "Daily weigh-in", details: "72.5 kg", date: "2025-02-24", time: "8:00 AM" },
    { id: "3", type: "biometric", title: "Heart rate", details: "Resting: 58", date: "2025-02-24", time: "6:00 AM" },
  ]}
/>
```

### ActivityRow (subcomponent)
```tsx
import { ActivityRow } from "@handled-ai/design-system"

<ActivityRow item={{ id: "1", type: "checkin", title: "Morning standup", details: "Done", date: "2025-02-25", time: "9:00 AM" }} />
```

## Peer Dependencies
- date-fns

## Internal Dependencies
None

## Source
`registry/new-york/ui/activity-log.tsx`
