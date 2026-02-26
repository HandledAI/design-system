# @handled-ai/design-system Component Reference

This is the internal component reference for `@handled-ai/design-system`, the shared npm package consumed across multiple apps.

Primary distribution channel is npm (not the registry showcase site):

```tsx
import { ComponentName } from "@handled-ai/design-system"
```

## Primitives & Foundation

- [Button](./components/button.md) - Variant-driven action button with optional slot composition.
- [Input](./components/input.md) - Styled text input with full native input prop support.
- [Label](./components/label.md) - Accessible form label wrapper built on Radix Label.
- [Textarea](./components/textarea.md) - Multi-line text field with shared design-system styles.
- [Select](./components/select.md) - Compound select built on Radix Select primitives.
- [Badge](./components/badge.md) - Lightweight status/label pill with variant styles.
- [StatusBadge](./components/status-badge.md) - Semantic status pill that auto-maps status strings to success/warning/error/neutral colors.
- [Avatar](./components/avatar.md) - User avatar primitives with fallback, badge, and group helpers.
- [Message](./components/message.md) - Chat message primitives with user/assistant layouts, contained/flat variants, and avatar slots.
- [Separator](./components/separator.md) - Horizontal or vertical visual separator.
- [Skeleton](./components/skeleton.md) - Loading placeholder block for progressive rendering states.
- [Progress](./components/progress.md) - Radix-based progress bar for completion/status indicators.
- [ScrollArea](./components/scroll-area.md) - Styled scroll container with custom scrollbar support.
- [Table](./components/table.md) - Semantic table primitives for consistent tabular layouts.

## Overlays & Navigation

- [Dialog](./components/dialog.md) - Modal dialog system with composable header/content/footer parts.
- [DropdownMenu](./components/dropdown-menu.md) - Context/action menu primitives for command surfaces.
- [Tooltip](./components/tooltip.md) - Lightweight contextual hover/focus hints.
- [Sheet](./components/sheet.md) - Side/top/bottom sliding panel built on Radix Dialog.
- [Tabs](./components/tabs.md) - Tabbed navigation and segmented content with list variants.
- [Sidebar](./components/sidebar.md) - Full sidebar layout system with provider, menu, rail, and trigger APIs.
- [ViewModeToggle](./components/view-mode-toggle.md) - Compact mode selector for list/board-style UI switching.
- [QuickActionSidebarNav](./components/quick-action-sidebar-nav.md) - Sidebar navigation shell with user menu and quick action entry points.

## Cards & Metrics

- [Card](./components/card.md) - Base card container with structured header/content/footer subcomponents.
- [MetricCard](./components/metric-card.md) - Single KPI card with trend, context text, and data points.
- [ReportCard](./components/report-card.md) - Report wrapper with optional filters, toggles, and header slots.
- [DashboardCards](./components/dashboard-cards.md) - Prebuilt dashboard card set for tasks, meetings, and check-ins.
- [TopLineMetrics](./components/top-line-metrics.md) - Top-level metric summary row with optional trend visualization.
- [PerformanceMetricsTable](./components/performance-metrics-table.md) - Rich metrics table with sorting/filtering controls.
- [ScoreRing](./components/score-ring.md) - Circular score indicator with configurable label and denominator.
- [ScoreFeedback](./components/score-feedback.md) - Compound feedback capture flow for score explanations.
- [ScoreBreakdown](./components/score-breakdown.md) - Factor-by-factor score explanation with optional inline feedback.
- [ScoreAnalysisModal](./components/score-analysis-modal.md) - Deep-dive score analysis panel/modal with evidence and actions.

## Charts

- [Chart](./components/chart.md) - Shared chart container, style, legend, and tooltip helpers for Recharts.
- [ChartTooltip](./components/chart-tooltip.md) - Reusable tooltip primitives/constants for chart hover content.
- [DonutChart](./components/donut-chart.md) - Donut/pie visualization for segmented values and proportions.
- [TrendAreaChart](./components/trend-area-chart.md) - Multi-series area chart for trend tracking over time.
- [BarChartComponent](./components/bar-chart-component.md) - Configurable bar chart wrapper for categorical comparisons.
- [StyledBarList](./components/styled-bar-list.md) - Ranked list with inline proportional bar indicators.
- [SankeyChart](./components/sankey-chart.md) - Sankey flow visualization for stage transitions and drop-off analysis.
- [VolumeAnalysisChart](./components/volume-analysis-chart.md) - Stacked/grouped volume chart for throughput analysis.
- [PipelineOverview](./components/pipeline-overview.md) - End-to-end pipeline summary with stage counts and conversion context.

## Data Table

- [DataTable](./components/data-table.md) - Integrated table experience with sorting, filters, quick views, and score drill-down.
- [SimpleDataTable](./components/simple-data-table.md) - Lightweight generic table with clean `columns`/`data` props, rounded hover rows, and minimal chrome.
- [DataTableFilter](./components/data-table-filter.md) - Category-based table filter menu primitives.
- [DataTableDisplay](./components/data-table-display.md) - Table display controls for sorting and column visibility.
- [DataTableQuickViews](./components/data-table-quick-views.md) - Preset quick-view controls for fast filtering.
- [DataTableToolbar](./components/data-table-toolbar.md) - Toolbar composition layer for table filters and display controls.

## Item List

- [ItemList](./components/item-list.md) - Grouped list/board view system with filters and display configuration.
- [ItemListFilter](./components/item-list-filter.md) - Filter controls for queue/list category selection.
- [ItemListDisplay](./components/item-list-display.md) - Display and grouping controls for item list rendering modes.
- [ItemListToolbar](./components/item-list-toolbar.md) - Combined quick-view, filter, and display toolbar for item lists.

## Activity & Timeline

- [ActivityLog](./components/activity-log.md) - Structured activity feed rows with time-based grouping.
- [ActivityDetail](./components/activity-detail.md) - Detail-view activity primitives for citations, summaries, and threads.
- [TimelineActivity](./components/timeline-activity.md) - Timeline-style event stream with expandable interaction context.

## Detail & Entity Views

- [DetailView](./components/detail-view.md) - Compound detail panel primitives for headers, summaries, and message threads.
- [EntityPanel](./components/entity-panel.md) - Entity-focused side panel with tabs, metadata, and recent activity sections.
- [InboxRow](./components/inbox-row.md) - Row primitives for grouped inbox/worklist rendering.
- [InboxToolbar](./components/inbox-toolbar.md) - Inbox toolbar with assignee and category filter controls.
- [ContactList](./components/contact-list.md) - Contact roster with role badges and channel action affordances.
- [PreviewList](./components/preview-list.md) - Compact list items for preview-style dashboard blocks.

## Actions & Feedback

- [SignalFeedbackInline](./components/signal-feedback-inline.md) - Inline approval gate for signal actions and feedback capture.
- [RecommendedActionsSection](./components/recommended-actions-section.md) - Prioritized recommendation list with queue/dismiss interactions.
- [SuggestedActions](./components/suggested-actions.md) - Suggested outreach/action workspace with draft and dispatch flows.
- [QuickActionChatArea](./components/quick-action-chat-area.md) - Prompt-style composer for generating or submitting quick tasks.
- [QuickActionModal](./components/quick-action-modal.md) - Task creation modal with templates and priority selection.

## Prototype Template System

- [PrototypeShell](./components/prototype-shell.md) - Config-driven shell that renders a full prototype app with sidebar, views, and entity panel.
- [PrototypeInboxView](./components/prototype-inbox-view.md) - Inbox view with split/list/detail modes, filters, signal brief, suggested actions, and timeline.
- [PrototypeInsightsView](./components/prototype-insights-view.md) - Insights dashboard with overview/analytics tabs, metrics, charts, and coaching.
- [PrototypeAccountsView](./components/prototype-accounts-view.md) - Accounts view with filter tabs and data table.
- [PrototypeWorkQueueView](./components/prototype-work-queue-view.md) - Work queue view wrapping ItemList.

See [Prototype Template Guide](./prototype-template.md) for full usage documentation.

## Agent Components

- [AgentOrb](./components/agent-orb.md) - Three.js WebGL shader orb with audio-reactive animation and CSS glow effects.
- [AgentPopover](./components/agent-popover.md) - Split-panel modal with multi-step flow for agent interactions (form, overview, chat).
- [AgentWidget](./components/agent-widget.md) - Embeddable voice/chat widget UI shell with message display and input controls.

## Utilities

- `cn` - Tailwind/class merge helper that composes `clsx` + `tailwind-merge` for safe className merging.
- `useIsMobile` - Media-query-based hook for checking mobile breakpoint behavior in client components.
