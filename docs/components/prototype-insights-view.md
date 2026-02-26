# PrototypeInsightsView

Insights dashboard view with two tabs (Overview and Analytics), coaching banner, metric cards, dashboard cards, and configurable analytics charts.

## Import

```tsx
import { PrototypeInsightsView } from "@handled-ai/design-system"
```

## Props

Extends `InsightsViewConfig` from `prototype-config.ts` plus:

| Prop | Type | Description |
|------|------|-------------|
| `assistantName` | `string` | Name for the "Talk to {name}" header button. Omit to hide. |
| `headerActions` | `ReactNode` | Extra content in the view header. |
| `onNavigateToInbox` | `() => void` | Called when TopTasksCard "View all" is clicked. |

## Key Features

- **Tab toggle**: Overview / Analytics, each independently hideable.
- **Coaching banner**: Dismissible, with thumbs up/down and text feedback input. Custom message via `coaching.message`.
- **Metric cards**: Primary metrics grid (4 columns), expandable with "Show more" toggle.
- **Dashboard cards**: TopTasksCard, UpcomingMeetingsCard, RecentlyCompletedCard, CheckInsCard (each toggleable).
- **Analytics charts** (all optional, include by providing data):
  - `PipelineOverview` with expandable stage metrics, drop-off reasons, filter breakdowns.
  - `VolumeAnalysisChart` in a ReportCard with filter dropdown.
  - `DonutChart` for risk breakdown.
  - `TrendAreaChart` with toggle options.
  - `BarChartComponent` for outreach activity.
  - `StyledBarList` for top activity types.

## Dependencies

- `Button`, `Input`, `MetricCard`, `TopTasksCard`, `UpcomingMeetingsCard`, `RecentlyCompletedCard`, `CheckInsCard`
- `PipelineOverview`, `VolumeAnalysisChart`, `DonutChart`, `TrendAreaChart`, `BarChartComponent`, `StyledBarList`, `ReportCard`
