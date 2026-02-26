# DashboardCards
> Pre-built dashboard card components: TopTasksCard, UpcomingMeetingsCard, RecentlyCompletedCard, CheckInsCard.
## Import
```tsx
import {
  TopTasksCard,
  UpcomingMeetingsCard,
  RecentlyCompletedCard,
  CheckInsCard,
} from "@handled-ai/design-system"
```
## Props

### TopTasksCard
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onViewAll | () => void | — | Optional callback for "View all tasks" |

### UpcomingMeetingsCard, RecentlyCompletedCard, CheckInsCard
No props (static layout; content is baked).

## Variants
N/A
## Basic Usage
```tsx
import { TopTasksCard, UpcomingMeetingsCard } from "@handled-ai/design-system"

<TopTasksCard onViewAll={() => navigate("/tasks")} />
<UpcomingMeetingsCard />
```

## Examples

### Dashboard layout
```tsx
import {
  TopTasksCard,
  UpcomingMeetingsCard,
  RecentlyCompletedCard,
  CheckInsCard,
} from "@handled-ai/design-system"

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <TopTasksCard onViewAll={() => {}} />
  <UpcomingMeetingsCard />
  <RecentlyCompletedCard />
  <CheckInsCard />
</div>
```

### TopTasksCard with callback
```tsx
<TopTasksCard onViewAll={() => router.push("/tasks")} />
```

## Peer Dependencies
- lucide-react

## Internal Dependencies
- Card (CardHeader, CardTitle, CardContent)
- Button
- Badge
- PreviewList, PreviewListItem

## Source
`registry/new-york/ui/dashboard-cards.tsx`
