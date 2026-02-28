"use client"

import * as React from "react"
import {
  BarChart2,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  X,
  MessageCircle,
  Phone,
  MessageSquare,
  Mail,
} from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"
import { MetricCard } from "./metric-card"
import type { MetricCardProps } from "./metric-card"
import {
  TopTasksCard,
  UpcomingMeetingsCard,
  RecentlyCompletedCard,
  CheckInsCard,
} from "./dashboard-cards"
import { PipelineOverview } from "./pipeline-overview"
import { VolumeAnalysisChart } from "./volume-analysis-chart"
import { DonutChart } from "./donut-chart"
import { TrendAreaChart } from "./trend-area-chart"
import { BarChartComponent } from "./bar-chart-component"
import { StyledBarList } from "./styled-bar-list"
import { ReportCard } from "./report-card"
import type { InsightsViewConfig, InsightsCustomTab } from "./prototype-config"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrototypeInsightsViewProps extends InsightsViewConfig {
  assistantName?: string
  headerActions?: React.ReactNode
  onNavigateToInbox?: () => void
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_METRICS: MetricCardProps[] = [
  {
    title: "Referrals at Risk",
    value: 28,
    change: { value: "2 vs last week", direction: "up", isGood: false },
    showExternalLink: true,
    showInfo: true,
    dataPoints: [
      { label: "No Contact", value: 6, color: "#166534" },
      { label: "Stalled", value: 4, color: "#22c55e" },
      { label: "Needs Attn", value: 8, color: "#6ee7b7" },
      { label: "Auth Delay", value: 5, color: "#ccfbf1" },
      { label: "DCS Hold", value: 3, color: "#99f6e4" },
      { label: "Expired Referral", value: 2, color: "#f1f5f9" },
    ],
  },
  {
    title: "Dropped from Pipeline",
    value: 47,
    change: { value: "12 vs last week", direction: "down", isGood: true },
    showExternalLink: true,
    showInfo: true,
    dataPoints: [
      { label: "No Contact", value: 12, color: "#166534" },
      { label: "Ins. Denied", value: 15, color: "#22c55e" },
      { label: "Refused", value: 6, color: "#6ee7b7" },
      { label: "Intake Stalled", value: 8, color: "#ccfbf1" },
      { label: "Other", value: 6, color: "#f1f5f9" },
    ],
  },
  {
    title: "Time to Schedule",
    value: "4.2 days",
    subtitle: "median, referrals → scheduled",
    change: { value: "0.8d vs last week", direction: "down", isGood: true },
    footerText: "Slowest stage: Contact → Intake (1.5d)",
    showInfo: true,
  },
  {
    title: "Conversion Rate",
    value: "53%",
    subtitle: "referrals → scheduled",
    change: { value: "3% vs last week", direction: "up", isGood: true },
    footerText: "Largest drop-off: No Contact (22%)",
    showInfo: true,
  },
]

const DEFAULT_EXPANDED_METRICS: MetricCardProps[] = [
  {
    title: "Avg Handle Time",
    value: "1.2",
    unit: "days",
    change: { value: "0.3d vs last week", direction: "down", isGood: true },
    footerText: "Fastest stage: Verification (0.2d)",
    showInfo: true,
  },
  {
    title: "Conversion Rate",
    value: "78%",
    change: { value: "2% vs last week", direction: "up", isGood: true },
    footerText: "Top source: Internal Referrals (85%)",
    showInfo: true,
  },
  {
    title: "Pending Intakes",
    value: "124",
    change: { value: "15 vs last week", direction: "up", isGood: false },
    footerText: "Requires immediate attention: 32",
    showInfo: true,
  },
  {
    title: "Patient Satisfaction",
    value: "4.8",
    unit: "/ 5",
    change: { value: "0.1 vs last month", direction: "up", isGood: true },
    footerText: "Based on 450 recent surveys",
    showInfo: true,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PrototypeInsightsView({
  tabs,
  coaching,
  metrics,
  expandedMetrics,
  dashboardCards,
  analytics,
  assistantName,
  headerActions,
  onNavigateToInbox,
  customTabs,
}: PrototypeInsightsViewProps) {
  const showOverview = tabs?.overview !== false
  const showAnalytics = tabs?.analytics !== false
  const [insightsTab, setInsightsTab] = React.useState<string>(
    showOverview ? "overview" : showAnalytics ? "analytics" : customTabs?.[0]?.id ?? "overview",
  )

  const allTabs: { id: string; label: string; icon?: React.ComponentType<{ className?: string }> }[] = []
  if (showOverview) allTabs.push({ id: "overview", label: "Overview", icon: BarChart2 })
  if (showAnalytics) allTabs.push({ id: "analytics", label: "Analytics", icon: TrendingUp })
  if (customTabs) allTabs.push(...customTabs)
  const [showAllMetrics, setShowAllMetrics] = React.useState(false)
  const [showCoaching, setShowCoaching] = React.useState(coaching?.enabled !== false)

  const resolvedMetrics = metrics ?? DEFAULT_METRICS
  const resolvedExpandedMetrics = expandedMetrics ?? DEFAULT_EXPANDED_METRICS

  const cards = {
    topTasks: dashboardCards?.topTasks !== false,
    upcomingMeetings: dashboardCards?.upcomingMeetings !== false,
    recentlyCompleted: dashboardCards?.recentlyCompleted !== false,
    checkIns: dashboardCards?.checkIns !== false,
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">Insights & Overview</h2>
          <p className="text-sm text-muted-foreground">Monitor your key performance indicators and daily tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          {assistantName && (
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-semibold rounded-full px-4 border-foreground text-foreground hover:bg-muted/50">
              <MessageCircle className="w-3.5 h-3.5" />
              Talk to {assistantName}
            </Button>
          )}
          {headerActions}
        </div>
      </div>

      {/* Tab switcher */}
      {allTabs.length >= 2 && (
        <div className="flex items-center gap-1 border-b border-border">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setInsightsTab(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                insightsTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                {tab.label}
              </span>
              {insightsTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ---- Overview Tab ---- */}
      {insightsTab === "overview" && showOverview && (
        <>
          {/* Coaching Banner */}
          {showCoaching && (
            <div className="border border-border rounded-xl p-6 relative bg-card shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => setShowCoaching(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-foreground text-sm">Daily Coaching Insight</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-4xl">
                We analyze your pipeline activity, recent communications, and account health to provide personalized recommendations for your day.
              </p>
              <div className="bg-brand-purple/10 rounded-lg p-5 text-[13px] text-foreground font-medium italic border border-brand-purple/20 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple rounded-l-lg" />
                {coaching?.message ??
                  "\u201CGreat job catching the churn risk on Lunchclub yesterday. Today, focus on pushing the stalled intake pipeline. Try making 2 more touches on accounts that have gone dark this week.\u201D"}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground shadow-none">
                  <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> Helpful
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground shadow-none">
                  <ThumbsDown className="w-3.5 h-3.5 mr-1.5" /> Not Helpful
                </Button>
                <div className="relative max-w-sm ml-2 flex-1">
                  <Input placeholder="Provide additional feedback..." className="h-7 text-xs shadow-none border-border bg-muted/20 w-full" />
                </div>
              </div>
            </div>
          )}

          {/* Metrics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Metrics</h3>
              {resolvedExpandedMetrics.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setShowAllMetrics(!showAllMetrics)}
                >
                  {showAllMetrics ? "Hide additional metrics" : "Show more metrics"}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resolvedMetrics.map((m, i) => (
                <MetricCard key={i} {...m} />
              ))}
              {showAllMetrics &&
                resolvedExpandedMetrics.map((m, i) => (
                  <MetricCard key={`exp-${i}`} {...m} />
                ))}
            </div>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              {cards.topTasks && <TopTasksCard onViewAll={onNavigateToInbox} />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.upcomingMeetings && <UpcomingMeetingsCard />}
                {cards.recentlyCompleted && <RecentlyCompletedCard />}
              </div>
            </div>
            <div className="space-y-6">
              {cards.checkIns && <CheckInsCard />}
            </div>
          </div>
        </>
      )}

      {/* ---- Analytics Tab ---- */}
      {insightsTab === "analytics" && showAnalytics && (
        <div className="space-y-6">
          {analytics?.pipeline && (
            <PipelineOverview
              stages={analytics.pipeline.stages}
              stageMetrics={analytics.pipeline.stageMetrics}
              stageTimings={analytics.pipeline.stageTimings}
              filterBreakdowns={analytics.pipeline.filterBreakdowns}
            />
          )}

          {analytics?.volumeChart && (
            <ReportCard
              title="Volume Analysis"
              subtitle="Referral volume broken down by facility over time"
              filterOptions={analytics.volumeChart.filterOptions}
              selectedFilter={analytics.volumeChart.filterOptions?.[0]?.value}
            >
              <VolumeAnalysisChart
                data={analytics.volumeChart.data}
                dataKeys={analytics.volumeChart.dataKeys}
              />
            </ReportCard>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analytics?.donutChart && (
              <ReportCard title="Risk Breakdown" subtitle="Referrals at risk by category">
                <div className="flex items-center justify-center">
                  <DonutChart
                    data={analytics.donutChart.data}
                    centerLabel={analytics.donutChart.centerLabel}
                    showLegend
                  />
                </div>
              </ReportCard>
            )}

            {analytics?.trendChart && (
              <ReportCard
                title="Referrals Over Time"
                subtitle="Weekly appointment trends"
                toggleOptions={analytics.trendChart.toggleOptions}
                selectedToggle={analytics.trendChart.toggleOptions?.[0]}
              >
                <TrendAreaChart
                  data={analytics.trendChart.data}
                  series={analytics.trendChart.series}
                  xAxisKey={analytics.trendChart.xAxisKey ?? "name"}
                  height={analytics.trendChart.height ?? 220}
                />
              </ReportCard>
            )}
          </div>

          {(analytics?.barChart || analytics?.barList) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analytics?.barChart && (
                <ReportCard
                  title="Outreach Activity"
                  subtitle="Daily outreach by channel"
                  className="lg:col-span-2"
                >
                  <BarChartComponent
                    data={analytics.barChart.data}
                    bars={analytics.barChart.bars}
                  />
                </ReportCard>
              )}
              {analytics?.barList && (
                <ReportCard title="Top Activity Types" subtitle="By completion percentage">
                  <StyledBarList
                    data={analytics.barList.data}
                    valueFormatter={analytics.barList.valueFormatter}
                  />
                </ReportCard>
              )}
            </div>
          )}
        </div>
      )}

      {/* Custom Tabs */}
      {customTabs?.map(tab =>
        insightsTab === tab.id ? <div key={tab.id}>{tab.content}</div> : null
      )}
    </div>
  )
}
