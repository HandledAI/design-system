"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/registry/new-york/ui/sheet"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/new-york/ui/input"
import { 
  ArrowLeft, Plus, ExternalLink, Mail, FileText, 
  MessageCircle, Briefcase, Building2, Users, Newspaper,
  X, Phone, CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react"
import { BRAND_ICONS } from "@/lib/icons"
import { TimelineActivity, type TimelineEvent } from "@/registry/new-york/ui/timeline-activity"

export function EntityPanel({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean
  onClose: (open: boolean) => void
  children?: React.ReactNode 
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[420px] sm:max-w-[420px] overflow-y-auto px-5 py-6 bg-background border-l border-border" showCloseButton={false}>
        <SheetHeader className="sr-only p-0">
          <SheetTitle>Entity panel</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export function PotentialContacts() {
  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">Potential Contacts</h3>
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
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"><img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" /></button>
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"><img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" /></button>
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
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"><img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" /></button>
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
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"><img src={BRAND_ICONS.linkedin} alt="LinkedIn" className="w-3.5 h-3.5 object-contain" /></button>
            <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"><img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-3.5 h-3.5 object-contain" /></button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-6 text-[11px] font-medium shadow-none ml-1">
              <Plus className="w-3 h-3 mr-1" /> Add to SF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export type ActivityItem = TimelineEvent

export function RecentActivity({ 
  title = "RECENT ACTIVITY", 
  count = "10 total events", 
  filters = [], 
  items = [] 
}: { 
  title?: string
  count?: string
  filters?: string[]
  items?: TimelineEvent[] 
}) {
  return (
    <div id="entity-recent-activity" className="space-y-4 mt-8 scroll-m-20">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">{title}</h3>
        {count && <span className="text-xs text-muted-foreground">{count}</span>}
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map(filter => (
            <Button key={filter} variant="outline" size="sm" className="h-7 text-xs rounded-md shadow-none font-medium border-border text-muted-foreground hover:text-foreground">
              {filter}
            </Button>
          ))}
        </div>
      )}

      <div className="relative">
        <Input placeholder="Search activity..." className="h-9 text-sm bg-background border-border shadow-none" />
      </div>

      <div>
        <TimelineActivity events={items} />
      </div>
    </div>
  )
}


export function ConnectedApps() {
  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">Connected Apps</h3>
        <span className="text-xs text-muted-foreground">3 connected</span>
      </div>

      <div className="space-y-0 pt-1">
        <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md border border-border/60 bg-muted/30 flex items-center justify-center shrink-0">
              <img src={BRAND_ICONS.slack} alt="Slack" className="w-4 h-4 object-contain" />
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
              <img src={BRAND_ICONS.gdoc} alt="Google Docs" className="w-4 h-4 object-contain" />
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

export function EntityDetails({ onClose }: { onClose?: () => void }) {
  const [showMore, setShowMore] = React.useState(false)

  const leadFields = [
    { icon: Users, label: "Lead Name", value: "Jackie Lee" },
    { icon: Briefcase, label: "Title", value: "VP Finance" },
    { icon: Building2, label: "Company", value: "CloudKitchen" },
    { icon: Mail, label: "Lead Source", value: "Inbound — Website form" },
    { icon: "status" as const, label: "Lead Status", value: "New — Not Contacted", badge: "amber" as const },
    { icon: Users, label: "Lead Owner", value: "Sarah Johnson (SDR)" },
    { icon: Building2, label: "Industry", value: "Food Tech / Logistics", badge: "blue" as const },
    { icon: Users, label: "Company Size", value: "200-500 employees" },
  ]

  const visibleFields = showMore ? leadFields : leadFields.slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">CK</div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium tracking-tight">CloudKitchen</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-300 dark:border-blue-700 dark:text-blue-400 shadow-none px-2 py-0.5 text-[11px] font-medium">Lead</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Last enriched: Today at 10:15 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-1 -mt-1 -mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-50 hover:text-blue-600"><MessageCircle className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted"><ExternalLink className="w-4 h-4" /></Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:bg-muted"><X className="w-4 h-4" /></Button>
          )}
        </div>
      </div>

      {/* Lead Fields */}
      <div className="space-y-0">
        {visibleFields.map((field, idx) => {
          const isStatusIcon = field.icon === "status"
          const Icon = isStatusIcon ? null : field.icon
          return (
            <div key={idx} className="flex items-start gap-3 py-2.5 border-b border-border/30 last:border-b-0">
              {isStatusIcon ? (
                <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-3 h-3 rounded-full border-[2px] border-amber-500" />
                </div>
              ) : (
                Icon && <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              )}
              <span className="text-sm text-muted-foreground min-w-[100px] shrink-0">{field.label}</span>
              <div className="flex-1 text-sm">
                {field.badge === "amber" ? (
                  <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 shadow-none font-medium px-2 py-0 text-[11px]">{field.value}</Badge>
                ) : field.badge === "blue" ? (
                  <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 shadow-none font-medium px-2 py-0 text-[11px]">{field.value}</Badge>
                ) : (
                  <span className="text-foreground font-medium">{field.value}</span>
                )}
              </div>
            </div>
          )
        })}

        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
        >
          {showMore ? "See less" : "See more"}
          {showMore ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Enrichment Data */}
      <div className="pt-6 border-t border-border space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">Enrichment Data</h3>
          <span className="text-[11px] text-muted-foreground">Last updated: 2h ago</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground">Company Signals</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>Recent funding: $45M Series B, 3 months ago
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">1</span>
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>Hiring: 3 finance/treasury roles in last 30 days
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">2</span>
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>Market expansion: 8 &rarr; 15 US markets planned
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">3</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground">Contact Signals (Jackie Lee)</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>Started role: 12 days ago
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>Previous: Deel — operations/finance
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span>LinkedIn connections to existing customers: 2 detected
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">4</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-foreground">Estimated Tech Stack</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span className="text-muted-foreground min-w-[100px] shrink-0">Banking:</span>
              <span className="text-muted-foreground/50 italic">Unknown</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span className="text-muted-foreground min-w-[100px] shrink-0">Corporate Cards:</span>
              <span className="text-foreground font-medium">Brex <span className="text-muted-foreground font-normal">(from job posting requirements)</span>
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">2</span>
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground/50 mt-1 shrink-0">&bull;</span>
              <span className="text-muted-foreground min-w-[100px] shrink-0">Payroll:</span>
              <span className="text-foreground font-medium">Gusto <span className="text-muted-foreground font-normal">(from LinkedIn integrations)</span>
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1.5 align-text-top text-[9px] font-medium text-muted-foreground bg-muted/30 border border-border/50 rounded-full">5</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sources toggle */}
        <SourcesToggle />
      </div>
    </div>
  )
}

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
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-wider"
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
