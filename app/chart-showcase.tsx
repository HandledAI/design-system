"use client"

import * as React from "react"
import { Phone, Mail, MessageSquare } from "lucide-react"

import { SankeyChart, type SankeyData } from "@/registry/new-york/ui/sankey-chart"
import { VolumeAnalysisChart } from "@/registry/new-york/ui/volume-analysis-chart"
import { DonutChart, type DonutSegment } from "@/registry/new-york/ui/donut-chart"
import { TrendAreaChart } from "@/registry/new-york/ui/trend-area-chart"
import { BarChartComponent } from "@/registry/new-york/ui/bar-chart-component"
import { StyledBarList } from "@/registry/new-york/ui/styled-bar-list"
import { TopLineMetrics, type MetricCardData } from "@/registry/new-york/ui/top-line-metrics"
import { PipelineOverview, type PipelineStage, type PipelineStageMetrics, type PipelineStageTiming } from "@/registry/new-york/ui/pipeline-overview"
import { ReportCard } from "@/registry/new-york/ui/report-card"

const PIPELINE_STAGES: PipelineStage[] = [
  { id: "received", label: "Referrals Received", count: 847, trend: "+12%", nextConversion: "85%" },
  { id: "contacted", label: "Successfully Contacted", count: 720, trend: "+4%", nextConversion: "92%" },
  { id: "intake_sent", label: "Intake Sent", count: 661, trend: "+6%", nextConversion: "93%" },
  { id: "intake_done", label: "Intake Completed", count: 613, trend: "+6%", nextConversion: "99%" },
  { id: "scheduled", label: "Scheduled", count: 612, trend: "+5%", nextConversion: "85%" },
  { id: "completed", label: "Completed", count: 520, trend: "+4%", nextConversion: null },
]

const PIPELINE_STAGE_METRICS: Record<string, PipelineStageMetrics> = {
  received: { medianTime: "6h", avgTime: "10h", dropOffs: [{ reason: "Lost/Other", count: 56, pct: "7%" }, { reason: "Coverage", count: 40, pct: "5%" }, { reason: "Unqualified", count: 30, pct: "4%" }] },
  contacted: { medianTime: "1.1d", avgTime: "1.8d", dropOffs: [{ reason: "No Contact", count: 60, pct: "8%" }] },
  intake_sent: { medianTime: "0.5d", avgTime: "1.2d", dropOffs: [{ reason: "Intake Drop", count: 48, pct: "7%" }] },
  intake_done: { medianTime: "1.5d", avgTime: "2.1d", dropOffs: [{ reason: "Unqualified", count: 1, pct: "<1%" }] },
  scheduled: { medianTime: "1.2d", avgTime: "1.6d", dropOffs: [{ reason: "No Show/Cancel", count: 92, pct: "15%" }] },
  completed: { medianTime: "1h", avgTime: "1.5h", dropOffs: [] },
}

const PIPELINE_TIMINGS: (PipelineStageTiming | null)[] = [
  null,
  { median: "1.1d", avg: "1.8d" },
  { median: "0.5d", avg: "1.2d" },
  { median: "1.5d", avg: "2.1d" },
  { median: "1.2d", avg: "1.6d" },
  { median: "1h", avg: "1.5h" },
]

const PIPELINE_FILTER_BREAKDOWNS = {
  Facility: { received: { Gilbert: 280, Tucson: 200, "North Phoenix": 180, Avondale: 110, Glendale: 77 } },
  Channel: { received: { eFax: 508, Webform: 170, Phone: 169 } },
  Source: { received: { "Dr. Smith": 220, "Dr. Johnson": 180, "Dr. Williams": 150, "Dr. Martinez": 140, "Other PCPs": 157 } },
  "Lead Source": { received: { PCP: 400, School: 250, "Social (Instagram)": 100, "Social (Facebook)": 97 } },
  Payer: { received: { "Blue Cross Blue Shield": 280, Aetna: 180, UnitedHealthcare: 150, Cigna: 120, Medicare: 70, Medicaid: 30, Other: 17 } },
}

const SANKEY_DATA: SankeyData = {
  nodes: [
    { id: "Gilbert", nodeColor: "#0F4C3A" },
    { id: "North Phoenix", nodeColor: "#15803d" },
    { id: "Tucson", nodeColor: "#0ea5e9" },
    { id: "E&B Verified", nodeColor: "#1A6B52" },
    { id: "Contacted", nodeColor: "#2A8F7A" },
    { id: "Intake Done", nodeColor: "#3DB4A0" },
    { id: "Scheduled", nodeColor: "#5FCFBC" },
    { id: "Lost/Other", nodeColor: "#CBD5E1" },
    { id: "Coverage Issues", nodeColor: "#F59E0B" },
    { id: "No Contact", nodeColor: "#F59E0B" },
  ],
  links: [
    { source: "Gilbert", target: "E&B Verified", value: 280 },
    { source: "Gilbert", target: "Lost/Other", value: 20 },
    { source: "North Phoenix", target: "E&B Verified", value: 260 },
    { source: "North Phoenix", target: "Lost/Other", value: 17 },
    { source: "Tucson", target: "E&B Verified", value: 250 },
    { source: "Tucson", target: "Lost/Other", value: 20 },
    { source: "E&B Verified", target: "Contacted", value: 720 },
    { source: "E&B Verified", target: "Coverage Issues", value: 70 },
    { source: "Contacted", target: "Intake Done", value: 660 },
    { source: "Contacted", target: "No Contact", value: 60 },
    { source: "Intake Done", target: "Scheduled", value: 612 },
  ],
}

const SANKEY_STAGE_METRICS = {
  verified: {
    metrics: { conversion: "91%", medianTime: "4h", avgTime: "6h" },
    dropOffs: [
      { reason: "Coverage Issues", count: 12, pct: "22%" },
      { reason: "Incomplete Data", count: 8, pct: "15%" },
    ],
  },
  contacted: {
    metrics: { conversion: "91%", medianTime: "1.1d", avgTime: "1.8d" },
    dropOffs: [
      { reason: "Not Able to Contact", count: 45, pct: "60%" },
      { reason: "No Response", count: 23, pct: "30%" },
    ],
  },
}

const VOLUME_DATES = ["Jan 13", "Jan 14", "Jan 15", "Jan 16", "Jan 17", "Jan 18", "Jan 19"]
function genStackedData(keys: string[]) {
  return VOLUME_DATES.map((date) => {
    const point: Record<string, unknown> = { date }
    keys.forEach((key) => { point[key] = Math.floor(Math.random() * 30) + 5 })
    return point
  })
}
const VOLUME_DATA = genStackedData(["Gilbert", "North Phoenix", "Tucson", "Avondale", "Glendale"])
const VOLUME_KEYS = [
  { key: "Gilbert", color: "#10b981" },
  { key: "North Phoenix", color: "#3b82f6" },
  { key: "Tucson", color: "#8b5cf6" },
  { key: "Avondale", color: "#f59e0b" },
  { key: "Glendale", color: "#ec4899" },
]

const DONUT_RISK: DonutSegment[] = [
  { name: "No Contact", value: 6, color: "#0F4C3A" },
  { name: "Stalled", value: 4, color: "#15803d" },
  { name: "Needs Attn", value: 8, color: "#3DB4A0" },
  { name: "Auth Delay", value: 5, color: "#5FCFBC" },
  { name: "DCS Hold", value: 3, color: "#86EFAC" },
  { name: "Expired", value: 2, color: "#A7F3D0" },
]

const TREND_DATA = [
  { name: "3 Weeks Ago", Scheduled: 12, Administered: 10, Canceled: 2 },
  { name: "2 Weeks Ago", Scheduled: 18, Administered: 14, Canceled: 3 },
  { name: "Last Week", Scheduled: 15, Administered: 13, Canceled: 1 },
  { name: "This Week", Scheduled: 22, Administered: 18, Canceled: 4 },
]

const BAR_DATA = [
  { date: "Jan 13", phone: 120, text: 95, email: 25 },
  { date: "Jan 14", phone: 145, text: 88, email: 30 },
  { date: "Jan 15", phone: 132, text: 110, email: 28 },
  { date: "Jan 16", phone: 160, text: 105, email: 35 },
  { date: "Jan 17", phone: 148, text: 92, email: 22 },
  { date: "Jan 18", phone: 155, text: 98, email: 32 },
  { date: "Jan 19", phone: 138, text: 102, email: 27 },
]

const BAR_LIST_DATA = [
  { name: "Outreach", value: 42 },
  { name: "Follow-up", value: 28 },
  { name: "Scheduling", value: 18 },
  { name: "Verification", value: 12 },
]

const METRICS: MetricCardData[] = [
  { label: "Active referrals", value: "847", trend: { value: 12, direction: "up" } },
  { label: "Scheduled today", value: "23" },
  { label: "At risk", value: "28", alert: true },
  { label: "Avg time to schedule", value: "3.2d" },
]

function VolumeReportCard() {
  const [filter, setFilter] = React.useState("facility")
  const filterOpts = [
    { label: "Facility", value: "facility" },
    { label: "Channel", value: "channel" },
    { label: "Source", value: "source" },
    { label: "Payer", value: "payer" },
  ]
  return (
    <ReportCard
      title="Volume Analysis"
      subtitle={`Referral volume broken down by ${filter}`}
      filterOptions={filterOpts}
      selectedFilter={filter}
      onFilterChange={setFilter}
    >
      <VolumeAnalysisChart data={VOLUME_DATA} dataKeys={VOLUME_KEYS} />
    </ReportCard>
  )
}

function TrendReportCard() {
  const [toggle, setToggle] = React.useState("Scheduled")
  return (
    <ReportCard
      title="Referrals Over Time"
      subtitle="Weekly appointment trends"
      toggleOptions={["Scheduled", "Administered", "Canceled"]}
      selectedToggle={toggle}
      onToggleChange={setToggle}
    >
      <TrendAreaChart
        data={TREND_DATA}
        series={[
          { dataKey: "Scheduled", color: "#10b981" },
          { dataKey: "Administered", color: "#3b82f6" },
          { dataKey: "Canceled", color: "#ef4444" },
        ]}
        xAxisKey="name"
        height={260}
      />
    </ReportCard>
  )
}

function OutreachReportCard() {
  return (
    <ReportCard
      title="Outreach Activity"
      subtitle="Daily outreach by channel"
    >
      <BarChartComponent
        data={BAR_DATA}
        bars={[
          { dataKey: "phone", color: "#059669", name: "Phone Calls", icon: Phone },
          { dataKey: "text", color: "#10b981", name: "Text Messages", icon: MessageSquare },
          { dataKey: "email", color: "#34d399", name: "Emails", icon: Mail },
        ]}
      />
    </ReportCard>
  )
}

export function ChartShowcase() {
  return (
    <div className="scroll-m-20 space-y-10">
      <div>
        <h3 className="text-lg font-semibold">Chart Components</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Full report-card components and reusable chart primitives for analytics, dashboards, and insights pages.
        </p>
      </div>

      {/* Pipeline Overview (full report card) */}
      <div id="chart-pipeline-overview" className="scroll-m-20 space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pipeline Overview</h4>
        <p className="text-xs text-muted-foreground max-w-2xl">
          Full report card with Sankey diagram, stage metrics, conversion badges, hover popovers, counting mode toggle, and filter tabs.
          This component is designed to be dropped into any insights or analytics page.
        </p>
        <PipelineOverview
          stages={PIPELINE_STAGES}
          stageMetrics={PIPELINE_STAGE_METRICS}
          stageTimings={PIPELINE_TIMINGS}
          filterBreakdowns={PIPELINE_FILTER_BREAKDOWNS}
        />
      </div>

      {/* Report Card Wrapper */}
      <div id="chart-report-card" className="scroll-m-20 space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Report Card Wrapper</h4>
        <p className="text-xs text-muted-foreground max-w-2xl">
          A flexible wrapper that turns any chart into a full report card with title, subtitle, filter tabs, and metric toggles.
        </p>
        <div className="grid grid-cols-1 gap-6">
          <VolumeReportCard />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendReportCard />
            <OutreachReportCard />
          </div>
        </div>
      </div>

      {/* Top Line Metrics */}
      <div id="chart-top-line-metrics" className="scroll-m-20 space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Top Line Metrics</h4>
        <TopLineMetrics
          metrics={METRICS}
          filters={["All", "Needs attention", "Active"]}
        />
      </div>

      {/* Individual Chart Primitives */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Chart Primitives</h4>
        <p className="text-xs text-muted-foreground max-w-2xl">
          Standalone chart components for composing into custom layouts or report cards.
        </p>
      </div>

      <div id="chart-sankey" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Sankey Diagram</h4>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <SankeyChart data={SANKEY_DATA} height={350} stageMetrics={SANKEY_STAGE_METRICS} />
        </div>
      </div>

      <div id="chart-volume-analysis" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Volume Analysis (Stacked Area)</h4>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <VolumeAnalysisChart data={VOLUME_DATA} dataKeys={VOLUME_KEYS} title="Volume Analysis" subtitle="Referral volume broken down by facility" />
        </div>
      </div>

      <div id="chart-donut" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Donut Chart</h4>
        <div className="flex gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-medium text-slate-500">Referrals at Risk</p>
            <DonutChart data={DONUT_RISK} centerLabel={28} showLegend />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-medium text-slate-500">Compact (no legend)</p>
            <DonutChart data={DONUT_RISK} centerLabel={28} size={64} />
          </div>
        </div>
      </div>

      <div id="chart-trend-area" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Trend Area Chart (Multi-Series)</h4>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <TrendAreaChart
            data={TREND_DATA}
            series={[
              { dataKey: "Scheduled", color: "#10b981" },
              { dataKey: "Administered", color: "#3b82f6" },
              { dataKey: "Canceled", color: "#ef4444" },
            ]}
            xAxisKey="name"
            height={220}
          />
        </div>
      </div>

      <div id="chart-bar" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Bar Chart</h4>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <BarChartComponent
            data={BAR_DATA}
            bars={[
              { dataKey: "phone", color: "#059669", name: "Phone Calls", icon: Phone },
              { dataKey: "text", color: "#10b981", name: "Text Messages", icon: MessageSquare },
              { dataKey: "email", color: "#34d399", name: "Emails", icon: Mail },
            ]}
          />
        </div>
      </div>

      <div id="chart-bar-list" className="scroll-m-20 space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground">Styled Bar List</h4>
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-4">
          <StyledBarList data={BAR_LIST_DATA} valueFormatter={(v) => `${v}%`} />
        </div>
      </div>
    </div>
  )
}
