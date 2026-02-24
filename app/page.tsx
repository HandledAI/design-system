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
  DetailViewThread,
  ThreadMessage,
  Citation,
} from "@/registry/new-york/ui/detail-view"
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
import { QuickActionComponentsShowcase } from "@/app/quick-action-components-showcase"
import { QuickActionSidebarShowcase } from "@/app/quick-action-sidebar-showcase"
import { ItemListShowcase } from "@/app/item-list-showcase"
import { DataTableShowcase } from "@/app/data-table-showcase"
import { PerformanceMetricsTableShowcase } from "@/app/performance-metrics-table-showcase"
import { Clock, Square, FileText } from "lucide-react"

export default function Home() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                <li><a href="#custom-entity-panel" className="hover:text-brand-purple hover:underline">Entity Panel Sections</a></li>
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
              <h3 className="font-semibold text-lg">Detail View (Summary & Citations)</h3>
              <div className="border rounded-lg p-6 max-w-xl">
                <DetailViewSummary title="Here's what I found:">
                  <p className="flex items-center flex-wrap gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-2" />
                    There are <strong>3 unusual signals</strong> detected today.
                    <Citation number={1} />
                    <Citation number={2} />
                  </p>
                </DetailViewSummary>
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
                  <DetailViewHeader
                    title="James Liu"
                    breadcrumbs="REF-1894"
                    badges={
                      <>
                        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-100 hover:bg-red-100">
                          ! Urgent
                        </Badge>
                        <Badge variant="secondary">Review Required</Badge>
                      </>
                    }
                  />
                  <DetailViewSummary title="Here's what I found for this patient:">
                    <p className="flex items-center flex-wrap gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-2" />
                      There are <strong>2 missing documents</strong> including lab results and recent imaging
                      <Citation number={1} />
                    </p>
                  </DetailViewSummary>
                  <DetailViewThread title="Suggested Actions" actionCount={2}>
                    <ThreadMessage subject="Request missing documentation" time="Just now" sender="AI Assistant">
                      <p className="text-sm">
                        I can draft a message to the referring provider requesting the missing lab results and imaging.
                      </p>
                    </ThreadMessage>
                  </DetailViewThread>
                </div>
              </div>
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

            {/* Entity Panel */}
            <div id="custom-entity-panel" className="border rounded-xl p-6 space-y-6 scroll-m-20">
              <h3 className="font-semibold text-lg">Entity Panel Sections</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8 border p-6 rounded-lg bg-card">
                  <EntityDetails />
                </div>
                <div className="space-y-8 border p-6 rounded-lg bg-card">
                  <PotentialContacts />
                  <RecentActivity 
                    items={[
                      {
                        icon: <Clock className="w-4 h-4" />,
                        title: "Call with Sarah Chen",
                        details: "Strong interest in yield optimization.",
                        time: "335d ago",
                        source: "Gong"
                      },
                      {
                        icon: <FileText className="w-4 h-4" />,
                        title: "Payment Operations Manager",
                        details: "Payment ops expansion indicates volume growth.",
                        time: "343d ago",
                        source: "AngelList"
                      }
                    ]}
                  />
                  <ConnectedApps />
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
