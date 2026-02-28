# PrototypeInboxView

Self-contained inbox view with three display modes (split, list, detail), filter toolbars, signal brief with score breakdown, suggested actions, and activity timeline.

## Import

```tsx
import { PrototypeInboxView } from "@handled-ai/design-system"
```

## Props

Extends `InboxViewConfig` from `prototype-config.ts` plus:

| Prop | Type | Description |
|------|------|-------------|
| `headerActions` | `ReactNode` | Extra content in the view header. |
| `onOpenEntityPanel` | `() => void` | Called when entity panel should open. |
| `onOpenRecentActivity` | `() => void` | Called when recent activity section should scroll into view. |
| `hideToolbarActions` | `boolean` | Hides the Eye/FileText/Clock/CheckSquare icon buttons and "Add Task" CTA in the split-view toolbar. |
| `hideHoverActions` | `boolean` | Hides the CheckSquare/Clock hover action buttons on inbox list items. |
| `onSuggestedActionFeedback` | `(actionId: number \| string, feedback: string, actionTitle?: string) => void` | Callback for suggested action feedback events. |

### SignalScoreData

| Prop | Type | Description |
|------|------|-------------|
| `onFactorFeedback` | `(factorKey: string, type: "up" \| "down" \| null, detail?: string) => void` | Callback when factor thumbs up/down is toggled. |
| `onApproveFeedback` | `(reasons: string[], detail: string) => void` | Callback when score approval feedback is submitted. |
| `onDismissFeedback` | `(reasons: string[], detail: string) => void` | Callback when score dismiss feedback is submitted. |

## Key Features

- **Three view modes**: Split (sidebar + detail), List (grouped list with InboxToolbar), Detail (single item).
- **ViewModeToggle** in the header for switching modes.
- **InboxToolbar** with assignee filter, category/account filter dropdowns, clear filters.
- **Split-view left panel**: status tabs (All, Outbound, Retention, Relationship), category filter input, account filter button, scrollable queue items.
- **Detail view sections** (each toggleable via `detailSections`):
  - Signal brief: why-now text, signal score bar, expandable evidence with citations, `ScoreBreakdown`, `SignalApproval.Actions`.
  - Activity timeline: expandable timeline events via `TimelineActivity`.
  - Suggested actions: `SuggestedActions` with email compose, contact picker, duplicate, call talk tracks, ticket creation, Slack messages.
- **Responsive**: auto-collapses to detail mode on viewports narrower than 768px.

## Dependencies

- `Button`, `Badge`, `Input`, `ViewModeToggle`, `InboxToolbar`, `GroupedListView`
- `SignalApproval`, `ScoreBreakdown`, `Citation`, `SuggestedActions`, `TimelineActivity`
