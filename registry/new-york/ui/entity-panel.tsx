"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet"
import { Badge } from "./badge"
import { Button } from "./button"
import { Input } from "./input"
import {
  ArrowLeft,
  Plus,
  ExternalLink,
  Mail,
  FileText,
  MessageCircle,
  Briefcase,
  Building2,
  Users,
  Newspaper,
  X,
  Phone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Maximize2,
  Minimize2,
  Clock,
  CalendarDays,
} from "lucide-react"
import { TimelineActivity, type TimelineEvent } from "./timeline-activity"

// ---------------------------------------------------------------------------
// EntityPanel – supports both Sheet (side panel) and fullscreen modes
// ---------------------------------------------------------------------------

export function EntityPanel({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: (open: boolean) => void
  children?: React.ReactNode
}) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) setIsFullscreen(false)
  }, [isOpen])

  const handleClose = React.useCallback(() => {
    setIsFullscreen(false)
    onClose(false)
  }, [onClose])

  const panelContent = (
    <EntityPanelContext.Provider value={{ isFullscreen, setIsFullscreen, onClose: handleClose }}>
      {children}
    </EntityPanelContext.Provider>
  )

  if (isFullscreen && isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background">
        <div className="flex-1 overflow-y-auto px-6 py-6">{panelContent}</div>
      </div>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[500px] sm:max-w-[600px] overflow-hidden p-0 bg-background border-l border-border flex flex-col"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only p-0">
          <SheetTitle>Entity panel</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">{panelContent}</div>
      </SheetContent>
    </Sheet>
  )
}

const EntityPanelContext = React.createContext<{
  isFullscreen: boolean
  setIsFullscreen: (v: boolean) => void
  onClose: () => void
}>({
  isFullscreen: false,
  setIsFullscreen: () => {},
  onClose: () => {},
})

function useEntityPanel() {
  return React.useContext(EntityPanelContext)
}

// ---------------------------------------------------------------------------
// EntityPanelHeader – MeetingDetail-inspired header bar
// ---------------------------------------------------------------------------

export function EntityPanelHeader({
  icon,
  title,
  badgeLabel,
  subtitle,
  headerAction,
}: {
  icon?: React.ReactNode
  title: string
  badgeLabel?: string
  subtitle?: string
  headerAction?: React.ReactNode
}) {
  const { isFullscreen, setIsFullscreen, onClose } = useEntityPanel()

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 min-w-0">
        {icon ?? <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0" />}
        <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
        {badgeLabel && (
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-300 dark:border-blue-700 dark:text-blue-400 shadow-none px-2 py-0.5 text-[11px] font-medium shrink-0"
          >
            {badgeLabel}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-4 text-muted-foreground">
        {headerAction}
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-secondary transition-colors"
          title="Copy Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded-md hover:bg-secondary transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-secondary transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EntityPanelTabs – Overview/Details tab bar
// ---------------------------------------------------------------------------

export function EntityPanelTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-6 border-b border-border mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// EntityMetadataGrid – key/value metadata rows with icons
// ---------------------------------------------------------------------------

export interface EntityMetadataField {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
}

export function EntityMetadataGrid({ fields }: { fields: EntityMetadataField[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-4 gap-x-6 mb-8 text-sm">
      {fields.map((field, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <field.icon className="w-4 h-4" />
            <span>{field.label}</span>
          </div>
          <div className="text-foreground">{field.value}</div>
        </React.Fragment>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// EntitySection – clean section with title (MeetingDetail-style)
// ---------------------------------------------------------------------------

export function EntitySection({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// EntityActivityItem – clean activity row (MeetingDetail-style)
// ---------------------------------------------------------------------------

export function EntityActivityItem({
  icon,
  title,
  description,
  date,
}: {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  date?: string
}) {
  return (
    <div className="flex gap-3 text-[13px]">
      <div className="mt-0.5 text-muted-foreground shrink-0">
        {icon ?? <CalendarDays className="w-4 h-4" />}
      </div>
      <div>
        <p className="text-foreground leading-relaxed">{title}</p>
        {description && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{description}</p>}
        {date && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{date}</p>}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SystemActivity – standalone section for bottom of entity panel
// ---------------------------------------------------------------------------

export function SystemActivity() {
  return (
    <EntitySection title="System Activity">
      <div className="space-y-4">
        <EntityActivityItem
          title={<><span className="font-medium">System</span> enriched the lead</>}
          date="Today at 10:15 AM"
        />
        <EntityActivityItem
          icon={<Mail className="w-4 h-4" />}
          title={<><span className="font-medium">Jackie Lee</span> submitted website form</>}
          date="Yesterday at 3:22 PM"
        />
      </div>
    </EntitySection>
  )
}

// ---------------------------------------------------------------------------
// PotentialContacts – unchanged from original
// ---------------------------------------------------------------------------

export interface EntityPanelBrandIcons {
  linkedin?: string
  gmail?: string
  slack?: string
  gdoc?: string
}

function EntityPanelBrandIcon({
  src,
  alt,
  className,
  fallback,
}: {
  src?: string
  alt: string
  className: string
  fallback: React.ReactNode
}) {
  if (!src) {
    return <>{fallback}</>
  }

  return <img src={src} alt={alt} className={className} />
}

export function PotentialContacts({
  icons,
}: {
  icons?: Pick<EntityPanelBrandIcons, "linkedin" | "gmail">
}) {
  return (
    <div className="space-y-3 mb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Potential Contacts</h3>
        <span className="text-xs text-muted-foreground">3 identified</span>
      </div>
      <div className="space-y-0 pt-1">
        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800 shadow-none px-2 py-0 text-[11px] font-medium shrink-0">Primary</Badge>
            <span className="font-medium text-sm text-foreground truncate">Jackie Lee</span>
            <span className="text-muted-foreground text-sm shrink-0">&middot;</span>
            <span className="text-muted-foreground text-sm truncate">VP Finance</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
              <EntityPanelBrandIcon
                src={icons?.linkedin}
                alt="LinkedIn"
                className="w-3.5 h-3.5 object-contain"
                fallback={<LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />}
              />
            </button>
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
              <EntityPanelBrandIcon
                src={icons?.gmail}
                alt="Gmail"
                className="w-3.5 h-3.5 object-contain"
                fallback={<Mail className="w-3.5 h-3.5 text-muted-foreground" />}
              />
            </button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-6 text-[11px] font-medium shadow-none ml-1">
              <Plus className="w-3 h-3 mr-1" /> Add to SF
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 shadow-none px-2 py-0 text-[11px] font-medium shrink-0">78%</Badge>
            <span className="font-medium text-sm text-foreground truncate">Marcus Webb</span>
            <span className="text-muted-foreground text-sm shrink-0">&middot;</span>
            <span className="text-muted-foreground text-sm truncate">CEO</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
              <EntityPanelBrandIcon
                src={icons?.linkedin}
                alt="LinkedIn"
                className="w-3.5 h-3.5 object-contain"
                fallback={<LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />}
              />
            </button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-6 text-[11px] font-medium shadow-none ml-1">
              <Plus className="w-3 h-3 mr-1" /> Add to SF
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 last:border-0 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 shadow-none px-2 py-0 text-[11px] font-medium shrink-0">65%</Badge>
            <span className="font-medium text-sm text-foreground truncate">Priya Shah</span>
            <span className="text-muted-foreground text-sm shrink-0">&middot;</span>
            <span className="text-muted-foreground text-sm truncate">Head of Ops</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
              <EntityPanelBrandIcon
                src={icons?.linkedin}
                alt="LinkedIn"
                className="w-3.5 h-3.5 object-contain"
                fallback={<LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />}
              />
            </button>
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
              <EntityPanelBrandIcon
                src={icons?.gmail}
                alt="Gmail"
                className="w-3.5 h-3.5 object-contain"
                fallback={<Mail className="w-3.5 h-3.5 text-muted-foreground" />}
              />
            </button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-6 text-[11px] font-medium shadow-none ml-1">
              <Plus className="w-3 h-3 mr-1" /> Add to SF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// RecentActivity
// ---------------------------------------------------------------------------

export type ActivityItem = TimelineEvent

export function RecentActivity({
  title = "Recent Activity",
  count = "10 total events",
  filters = [],
  items = [],
}: {
  title?: string
  count?: string
  filters?: string[]
  items?: TimelineEvent[]
}) {
  return (
    <div id="entity-recent-activity" className="space-y-4 mb-8 scroll-m-20">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {count && <span className="text-xs text-muted-foreground">{count}</span>}
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="h-7 text-xs rounded-md shadow-none font-medium border-border text-muted-foreground hover:text-foreground"
            >
              {filter}
            </Button>
          ))}
        </div>
      )}

      <div className="relative">
        <Input
          placeholder="Search activity..."
          className="h-9 text-sm bg-background border-border shadow-none"
        />
      </div>

      <div>
        <TimelineActivity events={items} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ConnectedApps
// ---------------------------------------------------------------------------

export function ConnectedApps({
  icons,
}: {
  icons?: Pick<EntityPanelBrandIcons, "slack" | "gdoc">
}) {
  return (
    <div className="space-y-3 mb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Connected Apps</h3>
        <span className="text-xs text-muted-foreground">3 connected</span>
      </div>

      <div className="space-y-0 pt-1">
        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md border border-border/60 bg-muted/30 flex items-center justify-center shrink-0">
              <EntityPanelBrandIcon
                src={icons?.slack}
                alt="Slack"
                className="w-4 h-4 object-contain"
                fallback={<MessageCircle className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground leading-snug truncate">#lunchclub-acmeco</p>
              <p className="text-xs text-muted-foreground/60">Slack Channel</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-foreground">Open</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md border border-border/60 bg-muted/30 flex items-center justify-center shrink-0">
              <EntityPanelBrandIcon
                src={icons?.gdoc}
                alt="Google Docs"
                className="w-4 h-4 object-contain"
                fallback={<FileText className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground leading-snug truncate">Account Strategy Document</p>
              <p className="text-xs text-muted-foreground/60">Google Document</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-foreground">Open</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 last:border-0 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md border border-border/60 bg-muted/30 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground leading-snug truncate">Customer Success Playbook</p>
              <p className="text-xs text-muted-foreground/60">Notion Page</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-foreground">Open</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EntityDetails – updated with MeetingDetail-inspired metadata grid + tabs
// ---------------------------------------------------------------------------

export function EntityDetails({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "details">("overview")
  const [showMore, setShowMore] = React.useState(false)

  const leadFields: EntityMetadataField[] = [
    { icon: Users, label: "Lead Name", value: <span className="font-medium">Jackie Lee</span> },
    { icon: Briefcase, label: "Title", value: <span className="font-medium">VP Finance</span> },
    { icon: Building2, label: "Company", value: <span className="font-medium">CloudKitchen</span> },
    { icon: Mail, label: "Lead Source", value: <span className="font-medium">Inbound — Website form</span> },
    {
      icon: ({ className }) => (
        <div className={className}>
          <div className="w-3 h-3 rounded-full border-[2px] border-amber-500" />
        </div>
      ),
      label: "Lead Status",
      value: (
        <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 shadow-none font-medium px-2 py-0 text-[11px]">
          New — Not Contacted
        </Badge>
      ),
    },
    { icon: Users, label: "Lead Owner", value: <span className="font-medium">Sarah Johnson (SDR)</span> },
    {
      icon: Building2,
      label: "Industry",
      value: (
        <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 shadow-none font-medium px-2 py-0 text-[11px]">
          Food Tech / Logistics
        </Badge>
      ),
    },
    { icon: Users, label: "Company Size", value: <span className="font-medium">200-500 employees</span> },
  ]

  const visibleFields = showMore ? leadFields : leadFields.slice(0, 6)

  return (
    <div className="space-y-0">
      {/* Header */}
      <EntityPanelHeader
        icon={
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
            CK
          </div>
        }
        title="CloudKitchen"
        badgeLabel="Lead"
        subtitle="Last enriched: Today at 10:15 AM"
      />

      {/* Tabs */}
      <EntityPanelTabs
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "details", label: "Details" },
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as "overview" | "details")}
      />

      {activeTab === "overview" ? (
        <div className="space-y-0">
          {/* Metadata Grid */}
          <EntityMetadataGrid fields={visibleFields} />

          {leadFields.length > 6 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              {showMore ? "See less" : "See more"}
              {showMore ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {/* Enrichment as sections */}
          <EntitySection title="Company Signals">
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  Recent funding: $45M Series B, 3 months ago
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">1</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  Hiring: 3 finance/treasury roles in last 30 days
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">2</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  Market expansion: 8 &rarr; 15 US markets planned
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">3</span>
                </span>
              </li>
            </ul>
          </EntitySection>

          <EntitySection title="Contact Signals (Jackie Lee)">
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  Started role: 12 days ago
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  Previous: Deel — operations/finance
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span>
                  LinkedIn connections to existing customers: 2 detected
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
                </span>
              </li>
            </ul>
          </EntitySection>

          <SourcesToggle />
        </div>
      ) : (
        <div className="space-y-0">
          <EntitySection title="Estimated Tech Stack">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span className="text-muted-foreground min-w-[100px] shrink-0">Banking:</span>
                <span className="text-muted-foreground/50 italic">Unknown</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span className="text-muted-foreground min-w-[100px] shrink-0">Corporate Cards:</span>
                <span className="text-foreground font-medium">
                  Brex <span className="text-muted-foreground font-normal">(from job posting requirements)</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">2</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
                <span className="text-muted-foreground min-w-[100px] shrink-0">Payroll:</span>
                <span className="text-foreground font-medium">
                  Gusto <span className="text-muted-foreground font-normal">(from LinkedIn integrations)</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">5</span>
                </span>
              </div>
            </div>
          </EntitySection>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SourcesToggle – collapsible sources list
// ---------------------------------------------------------------------------

function SourcesToggle() {
  const [expanded, setExpanded] = React.useState(false)

  const sources = [
    { name: "Crunchbase", type: "Funding data", lastPull: "2h ago" },
    { name: "LinkedIn", type: "People & company", lastPull: "12h ago" },
    { name: "LinkedIn Jobs", type: "Hiring signals", lastPull: "1d ago" },
    { name: "PR Newswire", type: "News & press", lastPull: "6h ago" },
    { name: "Clearbit", type: "Tech stack & firmographics", lastPull: "2h ago" },
  ]

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Sources
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="pt-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {sources.map((src, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-muted-foreground py-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 text-[9px] font-medium text-muted-foreground/50 border border-border rounded-full">
                  {idx + 1}
                </span>
                <span className="font-medium text-foreground">{src.name}</span>
                <span className="text-muted-foreground/60">&middot;</span>
                <span>{src.type}</span>
              </div>
              <span className="text-muted-foreground/50">{src.lastPull}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
