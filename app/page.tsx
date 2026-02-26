import * as React from "react"
import Link from "next/link"

import { Button } from "@/registry/new-york/ui/button"
import { Badge } from "@/registry/new-york/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { MetricCard } from "@/registry/new-york/ui/metric-card"
import { InboxRow, InboxGroupHeader } from "@/registry/new-york/ui/inbox-row"
import { ActivityRow } from "@/registry/new-york/ui/activity-log"
import {
  DetailViewSummary,
  DetailViewHeader,
  Citation,
  SourceList,
} from "@/registry/new-york/ui/detail-view"
import { SuggestedActions, type SuggestedAction } from "@/registry/new-york/ui/suggested-actions"
import { SignalApprovalRoot, SignalApprovalActions, SignalApprovalGate } from "@/registry/new-york/ui/signal-feedback-inline"
import { PreviewList, PreviewListItem } from "@/registry/new-york/ui/preview-list"
import {
  TopTasksCard,
  UpcomingMeetingsCard,
  RecentlyCompletedCard,
  CheckInsCard
} from "@/registry/new-york/ui/dashboard-cards"
import {
  EntityDetails,
  PotentialContacts,
  RecentActivity,
  ConnectedApps
} from "@/registry/new-york/ui/entity-panel"
import { ContactList, type ContactItem } from "@/registry/new-york/ui/contact-list"
import { QuickActionComponentsShowcase } from "@/app/quick-action-components-showcase"
import { QuickActionSidebarShowcase } from "@/app/quick-action-sidebar-showcase"
import { ItemListShowcase } from "@/app/item-list-showcase"
import { DataTableShowcase } from "@/app/data-table-showcase"
import { PerformanceMetricsTableShowcase } from "@/app/performance-metrics-table-showcase"
import { ActivityDetailShowcase } from "@/app/activity-detail-showcase"
import { ViewModeToggleShowcase } from "@/app/view-mode-toggle-showcase"
import { SuggestedActionsShowcase } from "@/app/suggested-actions-showcase"
import { ChartShowcase } from "@/app/chart-showcase"
import { ChevronDown, Clock, Square } from "lucide-react"
import { BRAND_ICONS } from "@/lib/icons"

export default function Home() {
  const iconAssets = [
    { key: "gdoc", label: "Google Docs", url: BRAND_ICONS.gdoc },
    { key: "gmail-icon", label: "Gmail Icon", url: BRAND_ICONS.gmail.icon },
    { key: "gmail-logo", label: "Gmail Logo", url: BRAND_ICONS.gmail.logo },
    { key: "gong", label: "Gong", url: BRAND_ICONS.gong },
    { key: "google", label: "Google", url: BRAND_ICONS.google },
    { key: "hubspot", label: "HubSpot", url: BRAND_ICONS.hubspot },
    { key: "linkedin", label: "LinkedIn", url: BRAND_ICONS.linkedin },
    { key: "microsoft", label: "Microsoft", url: BRAND_ICONS.microsoft },
    { key: "outlook", label: "Outlook", url: BRAND_ICONS.outlook },
    { key: "salesforce", label: "Salesforce", url: BRAND_ICONS.salesforce },
    { key: "slack", label: "Slack", url: BRAND_ICONS.slack },
    { key: "zendesk", label: "Zendesk", url: BRAND_ICONS.zendesk },
  ] as const

  const graphicAssets = [
    {
      key: "credentials-graphic",
      label: "Credentials Graphic",
      url: "https://bqvtedneuaozpgcgcxow.supabase.co/storage/v1/object/public/media/Graphics/Credentials.svg",
    },
    {
      key: "mission-control-graphic",
      label: "Mission Control Graphic",
      url: "https://bqvtedneuaozpgcgcxow.supabase.co/storage/v1/object/public/media/Graphics/MissionControl.svg",
    },
    {
      key: "communication-graphic",
      label: "Communication Graphic",
      url: "https://bqvtedneuaozpgcgcxow.supabase.co/storage/v1/object/public/media/Graphics/PatientAccess.svg",
    },
    {
      key: "revenue-operations-graphic",
      label: "Revenue Operations Graphic",
      url: "https://bqvtedneuaozpgcgcxow.supabase.co/storage/v1/object/public/media/Graphics/RevenueCycle.svg",
    },
  ] as const

  const iconBucketBaseUrl = BRAND_ICONS.gdoc.replace(/\/gdoc\.a1\.svg$/, "")
  const graphicBucketBaseUrl = graphicAssets[0].url.replace(/\/Credentials\.svg$/, "")

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-svh px-4 py-12 gap-12">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">@handled</h1>
          <Link href="/preview">
            <Button variant="default" className="bg-brand-purple hover:bg-brand-purple/90 text-white">
              View live preview &rarr;
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Design system registry for HandledAI projects. 
          Use the CLI to install these components into your applications.
        </p>
        <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto w-fit font-mono border border-border mt-2">
          npx shadcn@latest add @handled/inbox-row
        </pre>

        {/* Table of Contents */}
        <div className="mt-8 p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Core Components</h3>
              <ul className="space-y-1.5 list-disc list-inside pl-4 text-foreground/80">
                <li><a href="#core-buttons" className="hover:text-brand-purple hover:underline">Buttons</a></li>
                <li><a href="#core-badges" className="hover:text-brand-purple hover:underline">Badges</a></li>
                <li><a href="#core-input" className="hover:text-brand-purple hover:underline">Input & Forms</a></li>
                <li><a href="#core-card" className="hover:text-brand-purple hover:underline">Card</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Custom UX Blocks</h3>
              <ul className="space-y-1.5 list-disc list-inside pl-4 text-foreground/80">
                <li><a href="#custom-metric-cards" className="hover:text-brand-purple hover:underline">Metric Cards</a></li>
                <li><a href="#custom-preview-list" className="hover:text-brand-purple hover:underline">Preview List</a></li>
                <li><a href="#custom-inbox-row" className="hover:text-brand-purple hover:underline">Inbox Row</a></li>
                <li><a href="#custom-activity-log" className="hover:text-brand-purple hover:underline">Activity Log Row</a></li>
                <li><a href="#custom-detail-view" className="hover:text-brand-purple hover:underline">Detail View Components</a></li>
                <li><a href="#custom-inbox-components" className="hover:text-brand-purple hover:underline">Inbox List & Detail Panels</a></li>
                <li><a href="#custom-quick-action-modal" className="hover:text-brand-purple hover:underline">Quick Action Modal</a></li>
                <li><a href="#custom-quick-action-chat-area" className="hover:text-brand-purple hover:underline">Quick Action Chat Area</a></li>
                <li><a href="#custom-quick-action-sidebar" className="hover:text-brand-purple hover:underline">Quick Action Sidebar + Modal</a></li>
                <li><a href="#custom-item-list-filter" className="hover:text-brand-purple hover:underline">Item List Filter</a></li>
                <li><a href="#custom-item-list-display" className="hover:text-brand-purple hover:underline">Item List Display</a></li>
                <li><a href="#custom-item-list" className="hover:text-brand-purple hover:underline">Item List</a></li>
                <li><a href="#custom-data-table-filter" className="hover:text-brand-purple hover:underline">Data Table Filter</a></li>
                <li><a href="#custom-data-table-display" className="hover:text-brand-purple hover:underline">Data Table Display</a></li>
                <li><a href="#custom-data-table-quick-views" className="hover:text-brand-purple hover:underline">Data Table Quick Views</a></li>
                <li><a href="#custom-data-table" className="hover:text-brand-purple hover:underline">Data Table</a></li>
                <li><a href="#custom-performance-metrics-table" className="hover:text-brand-purple hover:underline">Performance Metrics Table</a></li>
                <li><a href="#custom-dashboard-cards" className="hover:text-brand-purple hover:underline">Dashboard Cards</a></li>
                <li><a href="#custom-activity-detail" className="hover:text-brand-purple hover:underline">Activity Detail</a></li>
                <li><a href="#custom-contact-list" className="hover:text-brand-purple hover:underline">Contact List</a></li>
                <li><a href="#custom-view-mode-toggle" className="hover:text-brand-purple hover:underline">View Mode Toggle</a></li>
                <li><a href="#custom-suggested-actions" className="hover:text-brand-purple hover:underline">Suggested Actions</a></li>
                <li><a href="#custom-entity-panel" className="hover:text-brand-purple hover:underline">Entity Panel Sections</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Chart Components</h3>
              <ul className="space-y-1.5 list-disc list-inside pl-4 text-foreground/80">
                <li><a href="#chart-pipeline-overview" className="hover:text-brand-purple hover:underline">Pipeline Overview</a></li>
                <li><a href="#chart-sankey" className="hover:text-brand-purple hover:underline">Sankey Diagram</a></li>
                <li><a href="#chart-volume-analysis" className="hover:text-brand-purple hover:underline">Volume Analysis</a></li>
                <li><a href="#chart-donut" className="hover:text-brand-purple hover:underline">Donut Chart</a></li>
                <li><a href="#chart-trend-area" className="hover:text-brand-purple hover:underline">Trend Area Chart</a></li>
                <li><a href="#chart-bar" className="hover:text-brand-purple hover:underline">Bar Chart</a></li>
                <li><a href="#chart-bar-list" className="hover:text-brand-purple hover:underline">Styled Bar List</a></li>
                <li><a href="#chart-report-card" className="hover:text-brand-purple hover:underline">Report Card Wrapper</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">Assets</h3>
              <ul className="space-y-1.5 list-disc list-inside pl-4 text-foreground/80">
                <li><a href="#assets-icons" className="hover:text-brand-purple hover:underline">Icon Assets + URLs</a></li>
                <li><a href="#assets-graphics" className="hover:text-brand-purple hover:underline">Graphic Assets + URLs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex flex-col flex-1 gap-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">Core Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Buttons */}
            <div id="core-buttons" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Badges */}
            <div id="core-badges" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Urgent</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            {/* Inputs & Forms */}
            <div id="core-input" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Input</h3>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email address" />
              </div>
            </div>

            {/* Card */}
            <div id="core-card" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Card</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Content goes here...</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">Custom UX Blocks</h2>
          
          <div className="grid grid-cols-1 gap-8">
            
            {/* Metric Cards */}
            <div id="custom-metric-cards" className="border rounded-xl p-6 space-y-6 bg-muted/30 scroll-m-20">
              <h3 className="font-semibold text-lg">Metric Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Referrals at Risk"
                  value={28}
                  change={{ value: "2 vs last week", direction: "up", isGood: false }}
                  showExternalLink
                  showInfo
                  dataPoints={[
                    { label: "No Contact", value: 6, color: "#166534" },
                    { label: "Stalled", value: 4, color: "#22c55e" },
                    { label: "Needs Attn", value: 8, color: "#6ee7b7" },
                    { label: "Auth Delay", value: 5, color: "#ccfbf1" },
                    { label: "DCS Hold", value: 3, color: "#99f6e4" },
                    { label: "Expired Referral", value: 2, color: "#f1f5f9" },
                  ]}
                />
                
                <MetricCard
                  title="Dropped from Pipeline"
                  value={47}
                  change={{ value: "12 vs last week", direction: "down", isGood: true }}
                  showExternalLink
                  showInfo
                  dataPoints={[
                    { label: "No Contact", value: 12, color: "#166534" },
                    { label: "Ins. Denied", value: 15, color: "#22c55e" },
                    { label: "Refused", value: 6, color: "#6ee7b7" },
                    { label: "Intake Stalled", value: 8, color: "#ccfbf1" },
                    { label: "Other", value: 6, color: "#f1f5f9" },
                  ]}
                />

                <MetricCard
                  title="Time to Schedule"
                  value="4.2 days"
                  subtitle="median, referrals → scheduled"
                  change={{ value: "0.8d vs last week", direction: "down", isGood: true }}
                  footerText="Slowest stage: Contact → Intake (1.5d)"
                  showInfo
                />

                <MetricCard
                  title="Conversion Rate"
                  value="53%"
                  subtitle="referrals → scheduled"
                  change={{ value: "3% vs last week", direction: "up", isGood: true }}
                  footerText="Largest drop-off: No Contact (22%)"
                  showInfo
                />
              </div>
            </div>

            {/* Preview List */}
            <div id="custom-preview-list" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Preview List</h3>
              <div className="border rounded-lg overflow-hidden">
                <PreviewList>
                  <PreviewListItem
                    icon={<Square className="w-4 h-4 text-red-500" />}
                    title="Follow up with Lunchclub"
                    subtitle="Churn Mitigation"
                    meta={<span className="text-xs text-muted-foreground">5m ago</span>}
                  />
                  <PreviewListItem
                    icon={<Square className="w-4 h-4 text-blue-500" />}
                    title="Outbound opportunity: CloudKitchen"
                    subtitle="Outbound"
                    meta={<span className="text-xs text-muted-foreground">12m ago</span>}
                  />
                  <PreviewListItem
                    icon={<Square className="w-4 h-4 text-blue-500" />}
                    title="New CFO welcome: Loom"
                    subtitle="Relationship"
                    meta={<span className="text-xs text-muted-foreground">1h ago</span>}
                  />
                  <PreviewListItem
                    icon={<Clock className="w-4 h-4 text-muted-foreground" />}
                    title="Q3 Review — Acme Corp"
                    subtitle="2:00 PM – 3:00 PM"
                    meta={<Badge variant="outline" className="text-[10px] h-5">Upcoming</Badge>}
                  />
                </PreviewList>
              </div>
            </div>

            {/* Inbox Row */}
            <div id="custom-inbox-row" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Inbox Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <InboxRow 
                  itemId="REF-1894"
                  statusColor="red"
                  primaryText="James Liu"
                  secondaryText="Cedars"
                  tertiaryText="Oncology"
                  isAtRisk={true}
                  interactionCount={2}
                  assignee="Jessica Wong"
                  status="E&B Verified"
                  time="Aging 18h"
                />
              </div>
            </div>

            {/* Activity Log Row */}
            <div id="custom-activity-log" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Activity Log Row</h3>
              <div className="border rounded-lg overflow-hidden px-4 py-2">
                <ActivityRow item={{
                  id: "1",
                  type: "checkin",
                  title: "Document Received",
                  details: "Fax from referring provider",
                  date: "2024-03-15T10:30:00.000Z",
                  time: "10:30 AM"
                }} />
              </div>
            </div>

            {/* Detail View Components */}
            <div id="custom-detail-view" className="border rounded-xl p-6 space-y-4 scroll-m-20">
              <h3 className="font-semibold text-lg">Detail View (Summary, Citations & Sources)</h3>
              <div className="border rounded-lg p-6 max-w-xl">
                <SignalApprovalRoot companyName="Lunchclub">
                  <DetailViewSummary
                    title="Here's what I found:"
                    actions={<SignalApprovalActions />}
                    sources={
                      <SourceList sources={[
                        { id: 1, summary: "Balance outflow increased ~34% week-over-week with no matching inbound trend.", meta: "Product telemetry · 2h ago" },
                        { id: 2, summary: "Login frequency for finance users dropped over the last 10 days.", meta: "Workspace activity · 6h ago" },
                      ]} />
                    }
                  >
                    <p className="flex items-center flex-wrap gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-2" />
                      There are <strong>3 unusual signals</strong> detected today.
                      <Citation number={1} source={{ id: 1, summary: "Balance outflow increased ~34% week-over-week with no matching inbound trend.", meta: "Product telemetry · 2h ago" }} />
                      <Citation number={2} source={{ id: 2, summary: "Login frequency for finance users dropped over the last 10 days.", meta: "Workspace activity · 6h ago" }} />
                    </p>
                  </DetailViewSummary>
                </SignalApprovalRoot>
              </div>
            </div>

            {/* Inbox Components */}
            <div id="custom-inbox-components" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Inbox Components</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <InboxGroupHeader title="E&B Verified" count={3} />
                  <InboxRow
                    itemId="REF-1894"
                    statusColor="red"
                    primaryText="James Liu"
                    secondaryText="Cedars"
                    tertiaryText="Oncology"
                    isAtRisk
                    interactionCount={2}
                    assignee="Jessica Wong"
                    status="E&B Verified"
                    time="Aging 18h"
                  />
                  <InboxRow
                    itemId="REF-1903"
                    statusColor="gray"
                    primaryText="Michael Brown"
                    secondaryText="Providence"
                    tertiaryText="Orthopedics"
                    interactionCount={1}
                    assignee="Sarah Johnson"
                    status="E&B Verified"
                    time="New today"
                  />
                  <InboxRow
                    itemId="REF-1910"
                    statusColor="orange"
                    primaryText="Samantha Rodriguez"
                    secondaryText="Kaiser"
                    tertiaryText="Rheumatology"
                    isAtRisk
                    interactionCount="4+"
                    assignee="Michael Chen"
                    status="E&B Verified"
                    time="Aging 36h"
                  />
                </div>

                <div className="border rounded-lg p-5">
                  <SignalApprovalRoot companyName="Cedars">
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-muted-foreground/50">&middot;</span>
                        REF-1894
                      </div>
                      <h1 className="text-2xl font-bold tracking-tight text-foreground">James Liu</h1>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-100 hover:bg-red-100">
                          ! Urgent
                        </Badge>
                        <Badge variant="secondary">Review Required</Badge>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Signal brief</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        We detected signals that suggest a potential opportunity with Cedars.
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                        There are 2 missing documents including lab results and recent imaging that require immediate follow-up.
                      </p>

                      <div className="mb-5 rounded-md border border-border bg-muted/20 p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Signal Score</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">78/100</span>
                            <span className="text-[10px] font-bold uppercase text-emerald-600">HIGH</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: "78%" }} />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                          <ChevronDown className="h-3 w-3" />
                          View more
                        </div>
                      </div>

                      <SignalApprovalActions />
                    </div>

                    <div className="mb-8">
                      <div className="flex w-full items-center justify-between gap-2 py-2 rounded-md -mx-2 px-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Activity timeline</h3>
                          <span className="text-[11px] text-muted-foreground/60">&middot; Last activity 1d ago</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-medium text-muted-foreground">3 events</span>
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <SignalApprovalGate>
                      <SuggestedActions
                        actions={[
                          {
                            id: "showcase-email",
                            type: "email",
                            label: "Reply to James Liu",
                            status: "pending",
                            followUp: { enabled: true, days: 3 },
                            replyTo: {
                              from: "Dr. Patel",
                              time: "1 hour ago",
                              content: "Hi, I wanted to follow up on the referral for James Liu. Are we still waiting on lab results?",
                            },
                            content: "Hi Dr. Patel,\n\nThank you for following up. We are still waiting on the CBC and metabolic panel from LabCorp, as well as the recent MRI imaging. I will reach out to the referring provider to expedite these.\n\nBest,\nSarah",
                          },
                          {
                            id: "showcase-ticket",
                            type: "ticket",
                            label: "Create Zendesk ticket",
                            status: "pending",
                            followUp: { enabled: false, days: 1 },
                            ticket: {
                              system: "Zendesk",
                              priority: "High",
                              type: "Support Request",
                              subject: "James Liu - Missing documentation for referral REF-1894",
                              description: "Missing lab results (CBC, metabolic panel) and recent MRI imaging for patient referral. Referring provider has not responded to initial request.",
                            },
                          },
                          {
                            id: "showcase-slack",
                            type: "slack",
                            label: "Message team on Slack",
                            status: "pending",
                            followUp: { enabled: true, days: 1 },
                            replyTo: {
                              from: "Michael Chen",
                              channel: "#referrals",
                              time: "Yesterday",
                              content: "Has anyone been able to get the missing docs for the Liu referral?",
                            },
                            content: "Hey team - I am following up with LabCorp directly for the missing results on REF-1894. Should have an update by end of day.",
                          },
                        ] satisfies SuggestedAction[]}
                      />
                    </SignalApprovalGate>
                  </SignalApprovalRoot>
                </div>
              </div>
            </div>

            {/* Suggested Actions Showcase */}
            <div id="custom-suggested-actions" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Suggested Actions</h3>
              <p className="text-sm text-muted-foreground">
                Action cards for email thread replies, new email drafts, call talk tracks, and Zendesk tickets. Includes recipient confirmation, Cc/Bcc management, email signatures, duplicate actions, and account contact pickers.
              </p>
              <SuggestedActionsShowcase />
            </div>

            <QuickActionComponentsShowcase />

            <QuickActionSidebarShowcase />

            <ItemListShowcase />

            <DataTableShowcase />

            <PerformanceMetricsTableShowcase />

            {/* Dashboard Cards */}
            <div id="custom-dashboard-cards" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Dashboard Cards</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <TopTasksCard />
                <div className="grid grid-cols-1 gap-6">
                  <UpcomingMeetingsCard />
                  <RecentlyCompletedCard />
                  <CheckInsCard />
                </div>
              </div>
            </div>

            {/* Activity Detail */}
            <div id="custom-activity-detail" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Activity Detail</h3>
              <p className="text-sm text-muted-foreground">Click &ldquo;Back to activity&rdquo; to toggle the detail view. In the Entity Panel below, click any activity row to see the inline transition.</p>
              <div className="border p-5 rounded-lg bg-card max-w-xl">
                <ActivityDetailShowcase />
              </div>
            </div>

            {/* Contact List */}
            <div id="custom-contact-list" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Contact List</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="border p-5 rounded-lg bg-card">
                  <ContactList
                    title="Contacts"
                    count="3 contacts"
                    contacts={[
                      {
                        id: "c1",
                        name: "Jackie Lee",
                        role: "VP Finance",
                        badge: { label: "Engaged", color: "green" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                      },
                      {
                        id: "c2",
                        name: "Marcus Webb",
                        role: "CEO",
                        badge: { label: "Take Action", color: "amber" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "salesforce", icon: <img src={BRAND_ICONS.salesforce} alt="Salesforce" className="w-3.5 h-3.5 object-contain" />, label: "Salesforce" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                      },
                      {
                        id: "c3",
                        name: "Priya Shah",
                        role: "Head of Ops",
                        badge: { label: "Not Engaged", color: "muted" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                        ],
                      },
                    ] satisfies ContactItem[]}
                  />
                </div>
                <div className="border p-5 rounded-lg bg-card">
                  <ContactList
                    title="Potential Contacts"
                    count="3 identified"
                    contacts={[
                      {
                        id: "p1",
                        name: "Sarah Kim",
                        role: "CFO",
                        badge: { label: "Primary", color: "indigo" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                        action: { label: "Add to SF" },
                      },
                      {
                        id: "p2",
                        name: "David Chen",
                        role: "VP Engineering",
                        badge: { label: "82%", color: "green" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                        ],
                        action: { label: "Add" },
                      },
                      {
                        id: "p3",
                        name: "Ana Torres",
                        role: "Director of Sales",
                        badge: { label: "67%", color: "amber" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                        action: { label: "Add" },
                      },
                    ] satisfies ContactItem[]}
                  />
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div id="custom-view-mode-toggle" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">View Mode Toggle</h3>
              <p className="text-sm text-muted-foreground">A compact pill-style toggle for switching between view layouts. Used in the inbox header to switch between the split inbox view and the list view.</p>
              <div className="border p-5 rounded-lg bg-card">
                <ViewModeToggleShowcase />
              </div>
            </div>

            {/* Entity Panel */}
            <div id="custom-entity-panel" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Entity Panel Sections</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8 border p-6 rounded-lg bg-card">
                  <EntityDetails />
                </div>
                <div className="space-y-8 border p-6 rounded-lg bg-card">
                  <ContactList
                    title="Contacts"
                    count="3 contacts"
                    contacts={[
                      {
                        id: "entity-contact-1",
                        name: "Jackie Lee",
                        role: "VP Finance",
                        badge: { label: "Engaged", color: "green" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                      },
                      {
                        id: "entity-contact-2",
                        name: "Marcus Webb",
                        role: "CEO",
                        badge: { label: "Take Action", color: "amber" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                          { type: "salesforce", icon: <img src={BRAND_ICONS.salesforce} alt="Salesforce" className="w-3.5 h-3.5 object-contain" />, label: "Salesforce" },
                          { type: "gmail", icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" />, label: "Email" },
                        ],
                      },
                      {
                        id: "entity-contact-3",
                        name: "Priya Shah",
                        role: "Head of Ops",
                        badge: { label: "Not Engaged", color: "muted" },
                        channels: [
                          { type: "linkedin", icon: <img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" />, label: "LinkedIn" },
                        ],
                      },
                    ] satisfies ContactItem[]}
                  />
                  <PotentialContacts />
                  <RecentActivity 
                    items={[
                      {
                        id: "1",
                        icon: <img src={BRAND_ICONS.gong} alt="Gong" className="w-4 h-4 object-contain" />,
                        title: <span>Call summary logged for <span className="font-medium text-foreground">Sarah Chen</span></span>,
                        time: "335d ago",
                        preview: "Treasury strategy discussion and technical review planning.",
                        source: {
                          label: "Gong",
                          url: "https://app.gong.io/call/0987654321",
                        },
                        content: (
                          <div className="space-y-2">
                            <p className="font-medium text-foreground">Strong interest in yield optimization.</p>
                            <p>Sarah discussed their current treasury setup and pain points around manual reconciliation. She wants to schedule a deeper technical review.</p>
                          </div>
                        ),
                        isInteractive: true,
                        defaultExpanded: true,
                      },
                      {
                        id: "2",
                        icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-4 h-4 object-contain" />,
                        title: <span>Email thread: <span className="font-medium text-foreground">Treasury deep-dive follow-up</span></span>,
                        time: "Today",
                        preview: "Latest reply confirms next Tuesday deep-dive and API doc request.",
                        email: {
                          from: "Jordan Park",
                          fromEmail: "jordan@handled.ai",
                          to: "sarah.chen@cloudkitchen.com",
                          cc: "marcus.webb@cloudkitchen.com",
                          bcc: "deal-notes@handled.ai",
                          date: "Today, 9:15 AM",
                          subject: "Re: Treasury deep-dive follow-up",
                          body: "Hi Sarah,\n\nPerfect - confirmed for Tuesday at 2 PM. API docs attached. Happy to set up a sandbox for your engineering team.\n\nBest,\nJordan",
                        },
                        isInteractive: true,
                      },
                      {
                        id: "3",
                        icon: <img src={BRAND_ICONS.zendesk} alt="Zendesk" className="w-4 h-4 object-contain" />,
                        title: <span>Ticket updated: <span className="font-medium text-foreground">#1024 - API Rate Limiting</span></span>,
                        time: "343d ago",
                        preview: "Status: Open · Priority: High",
                        source: {
                          label: "Zendesk",
                          url: "https://acme.zendesk.com/agent/tickets/1024",
                        },
                        content: (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="rounded-md bg-yellow-100 px-1.5 py-0.5 font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">Open</span>
                              <span className="rounded-md bg-red-100 px-1.5 py-0.5 font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">High Priority</span>
                              <span className="text-muted-foreground">&middot;</span>
                              <span className="text-muted-foreground">Assignee: Support Team</span>
                            </div>
                            <p className="text-sm">
                              Engineering is investigating recurring 429 errors during load testing. Early findings point to sandbox quota configuration.
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Latest comment by <span className="font-medium text-foreground">Alex Chen</span> &middot; 2h ago
                            </div>
                          </div>
                        ),
                        isInteractive: true,
                      }
                    ]}
                  />
                  <ConnectedApps />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">Chart Components</h2>
          <div className="grid grid-cols-1 gap-8">
            <ChartShowcase />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">Assets</h2>

          <div id="assets-icons" className="border rounded-xl p-6 space-y-4 scroll-m-20">
            <h3 className="font-semibold text-lg">Icon Assets + URLs</h3>
            <p className="text-sm text-muted-foreground">
              Storage bucket base URL:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{iconBucketBaseUrl}</code>
            </p>

            <div className="overflow-x-auto rounded-md border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-medium text-muted-foreground">Preview</th>
                    <th className="px-3 py-2 font-medium text-muted-foreground">Asset</th>
                    <th className="px-3 py-2 font-medium text-muted-foreground">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {iconAssets.map((asset) => (
                    <tr key={asset.key} className="border-t border-border/40 align-middle">
                      <td className="px-3 py-2">
                        <div className="w-8 h-8 rounded-md border border-border/60 bg-muted/20 flex items-center justify-center">
                          <img src={asset.url} alt={asset.label} className="w-4 h-4 object-contain" />
                        </div>
                      </td>
                      <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{asset.label}</td>
                      <td className="px-3 py-2">
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline break-all"
                        >
                          {asset.url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="assets-graphics" className="border rounded-xl p-6 space-y-4 scroll-m-20">
            <h3 className="font-semibold text-lg">Graphic Assets + URLs</h3>
            <p className="text-sm text-muted-foreground">
              Storage bucket base URL:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{graphicBucketBaseUrl}</code>
            </p>

            <div className="overflow-x-auto rounded-md border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-medium text-muted-foreground">Preview</th>
                    <th className="px-3 py-2 font-medium text-muted-foreground">Asset</th>
                    <th className="px-3 py-2 font-medium text-muted-foreground">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {graphicAssets.map((asset) => (
                    <tr key={asset.key} className="border-t border-border/40 align-middle">
                      <td className="px-3 py-2">
                        <div className="w-48 h-28 rounded-md border border-border/60 bg-muted/20 p-3 flex items-center justify-center">
                          <img src={asset.url} alt={asset.label} className="max-w-full max-h-full object-contain" />
                        </div>
                      </td>
                      <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{asset.label}</td>
                      <td className="px-3 py-2">
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline break-all"
                        >
                          {asset.url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
