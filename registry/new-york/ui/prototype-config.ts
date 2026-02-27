import * as React from "react"
import type { ReactNode } from "react"
import type { SidebarNavSection } from "./quick-action-sidebar-nav"
import type { ScoreFactor } from "./score-breakdown"
import type { SuggestedAction, SuggestedContact } from "./suggested-actions"
import type { SourceDef } from "./detail-view"
import type { InboxFilterCategory } from "./inbox-toolbar"
import type { MetricCardProps } from "./metric-card"
import type {
  PipelineStage,
  PipelineStageMetrics,
  PipelineStageTiming,
} from "./pipeline-overview"
import type { TimelineEvent } from "./timeline-activity"
import type { LucideIcon } from "lucide-react"

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

export interface PrototypeBrandConfig {
  name: string
  logo?: string
  assistantName?: string
}

export interface QueueItem {
  id: string
  title: string
  details: string
  statusColor: string
  time: string
  company: string
  tag1: string
}

export interface SignalScoreData {
  score: number
  factors: ScoreFactor[]
  whyNow: string
  evidence: string[]
  confidence: number
}

// ---------------------------------------------------------------------------
// Inbox
// ---------------------------------------------------------------------------

export interface InboxDetailSections {
  signalBrief?: boolean
  suggestedActions?: boolean
  timeline?: boolean
}

export interface InboxViewConfig {
  items: QueueItem[]
  filterCategories?: InboxFilterCategory[]
  detailSections?: InboxDetailSections
  accountContacts?: SuggestedContact[]
  buildAccountContacts?: (item: QueueItem) => SuggestedContact[]
  emailSignature?: string
  buildSuggestedActions?: (item: QueueItem) => SuggestedAction[]
  buildSourceItems?: (item: QueueItem) => SourceDef[]
  getSignalScore?: (company: string) => SignalScoreData
  getTimelineEvents?: (item: QueueItem) => TimelineEvent[]
  iconMap?: Record<string, string>
}

// ---------------------------------------------------------------------------
// Insights
// ---------------------------------------------------------------------------

export interface InsightsViewConfig {
  tabs?: {
    overview?: boolean
    analytics?: boolean
  }
  coaching?: {
    enabled?: boolean
    message?: string
  }
  metrics?: MetricCardProps[]
  expandedMetrics?: MetricCardProps[]
  dashboardCards?: {
    topTasks?: boolean
    upcomingMeetings?: boolean
    recentlyCompleted?: boolean
    checkIns?: boolean
  }
  analytics?: {
    pipeline?: {
      stages: PipelineStage[]
      stageMetrics: Record<string, PipelineStageMetrics>
      stageTimings: (PipelineStageTiming | null)[]
      filterBreakdowns?: Record<
        string,
        Record<string, Record<string, number>>
      >
    }
    volumeChart?: {
      data: Record<string, unknown>[]
      dataKeys: Array<{ key: string; color: string }>
      filterOptions?: Array<{ label: string; value: string }>
    }
    donutChart?: {
      data: Array<{ name: string; value: number; color: string }>
      centerLabel?: number
    }
    trendChart?: {
      data: Record<string, unknown>[]
      series: Array<{ dataKey: string; color: string }>
      xAxisKey?: string
      height?: number
      toggleOptions?: string[]
    }
    barChart?: {
      data: Record<string, unknown>[]
      bars: Array<{
        dataKey: string
        color: string
        name: string
        icon?: LucideIcon
      }>
    }
    barList?: {
      data: Array<{ name: string; value: number }>
      valueFormatter?: (v: number) => string
    }
  }
}

// ---------------------------------------------------------------------------
// Accounts
// ---------------------------------------------------------------------------

export interface AccountFilterTab {
  label: string
  count?: number
  variant?: "default" | "attention" | "ghost"
}

export interface AccountsViewConfig {
  filterTabs?: AccountFilterTab[]
}

// ---------------------------------------------------------------------------
// Work Queue
// ---------------------------------------------------------------------------

export interface WorkQueueViewConfig {
  // Extensible – ItemList manages its own data internally for now.
  [key: string]: unknown
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export interface AdminTab {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  content: React.ReactNode
}

export interface AdminViewConfig {
  /** View title displayed in the header. Defaults to "Admin". */
  title?: string
  /** Icon displayed next to the title. */
  icon?: React.ComponentType<{ className?: string }>
  tabs: AdminTab[]
  /** Which tab is active initially. Defaults to first tab's id. */
  defaultTab?: string
}

// ---------------------------------------------------------------------------
// Entity Panel
// ---------------------------------------------------------------------------

export interface EntityPanelSection {
  type: "details" | "contacts" | "recentActivity" | "connectedApps" | "systemActivity"
  props?: Record<string, unknown>
}

export interface EntityPanelConfig {
  sections?: EntityPanelSection[]
  icons?: Record<string, string>
}

// ---------------------------------------------------------------------------
// Top-level config
// ---------------------------------------------------------------------------

export interface PrototypeConfig {
  brand?: PrototypeBrandConfig
  sidebar: SidebarNavSection[]
  views: {
    inbox?: InboxViewConfig
    insights?: InsightsViewConfig
    accounts?: AccountsViewConfig
    workQueue?: WorkQueueViewConfig
    admin?: AdminViewConfig
  }
  defaultView: string
  entityPanel?: EntityPanelConfig
  /** Sidebar item IDs that trigger view navigation. Defaults to keys of `views`. */
  navigableViews?: string[]
}
