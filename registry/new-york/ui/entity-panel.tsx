"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/registry/new-york/ui/sheet"
import { Card, CardContent } from "@/registry/new-york/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/new-york/ui/input"
import { 
  Search, Plus, ExternalLink, Linkedin, Mail, FileText, 
  MessageCircle, Briefcase, Building2, Users, Newspaper,
  X, Phone, CheckCircle2, ChevronDown
} from "lucide-react"

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
      <SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-[540px] overflow-y-auto p-6 bg-background border-l border-border" showCloseButton={false}>
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
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Search className="w-4 h-4 text-muted-foreground" />
          Potential Contacts
        </h3>
        <span className="text-xs text-muted-foreground">3 identified</span>
      </div>
      <div className="space-y-3">
        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent shadow-none px-2 py-0 text-[11px] font-semibold">Primary</Badge>
                <span className="font-bold text-sm">Jackie Lee</span>
                <span className="text-muted-foreground text-sm">&middot; VP Finance</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-6 h-6 text-blue-600 hover:bg-blue-50"><Linkedin className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-6 h-6 text-red-500 hover:bg-red-50"><Mail className="w-4 h-4" /></Button>
              </div>
            </div>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-semibold shadow-none">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add to SF
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-transparent shadow-none px-2 py-0 text-[11px] font-semibold">78%</Badge>
                <span className="font-bold text-sm">Marcus Webb</span>
                <span className="text-muted-foreground text-sm">&middot; CEO</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-6 h-6 text-blue-600 hover:bg-blue-50"><Linkedin className="w-4 h-4" /></Button>
              </div>
            </div>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-semibold shadow-none">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add to SF
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-transparent shadow-none px-2 py-0 text-[11px] font-semibold">65%</Badge>
                <span className="font-bold text-sm">Priya Shah</span>
                <span className="text-muted-foreground text-sm">&middot; Head of Ops</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-6 h-6 text-blue-600 hover:bg-blue-50"><Linkedin className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-6 h-6 text-red-500 hover:bg-red-50"><Mail className="w-4 h-4" /></Button>
              </div>
            </div>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-semibold shadow-none">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add to SF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export type ActivityItem = {
  icon: React.ReactNode
  title: string
  details: string
  time: string
  source: string
}

export function RecentActivity({ 
  title = "RECENT ACTIVITY", 
  count = "10 total events", 
  filters = ["Support Tickets", "Meetings", "Emails", "Calls"], 
  items = [] 
}: { 
  title?: string
  count?: string
  filters?: string[]
  items?: ActivityItem[] 
}) {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{title}</h3>
        {count && <span className="text-xs text-muted-foreground font-medium">{count}</span>}
      </div>
      
      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
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

      <div className="space-y-0 pt-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 group py-3 border-b border-border last:border-0">
            <div className="mt-0.5 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center shrink-0 text-muted-foreground">
              {item.icon}
            </div>
            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground truncate pr-4">{item.title}</span>
                <span className="text-xs font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer hover:text-foreground transition-opacity shrink-0">View</span>
              </div>
              <p className="text-sm text-muted-foreground leading-snug pr-4">{item.details}</p>
              <p className="text-xs text-muted-foreground/80 font-medium">{item.time} &middot; {item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConnectedApps() {
  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">CONNECTED APPS</h3>

      {/* App Group 1 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap w-4 h-4">
               {/* Just a generic icon since we don't have slack icon in lucide */}
               <MessageCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="font-bold text-sm">Slack Channels</span>
            <span className="text-muted-foreground text-sm font-medium">1</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Channel
          </Button>
        </div>
        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <p className="font-bold text-sm">#lunchclub-mercury</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Slack Channel</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* App Group 2 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-sm">Google Docs</span>
            <span className="text-muted-foreground text-sm font-medium">1</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Doc
          </Button>
        </div>
        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <div>
                <p className="font-bold text-sm">Account Strategy Document</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Google Document</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* App Group 3 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-foreground" />
            <span className="font-bold text-sm">Notion Pages</span>
            <span className="text-muted-foreground text-sm font-medium">1</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Page
          </Button>
        </div>
        <Card className="shadow-none border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground shrink-0" />
              <div>
                <p className="font-bold text-sm">Customer Success Playbook</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Notion Page</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold hover:bg-muted/50">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function EntityDetails({ onClose }: { onClose?: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded border border-border bg-muted/30 flex items-center justify-center font-bold text-sm text-foreground">CK</div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">CloudKitchen</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 shadow-none font-semibold px-2 py-0 text-[11px]">Lead</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium mt-1">Last enriched: Today at 10:15 AM</p>
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

      <div className="space-y-4">
        {/* Table rows */}
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Users className="w-4 h-4" /> Lead Name
          </div>
          <div className="col-span-7 font-bold text-foreground">Jackie Lee</div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Briefcase className="w-4 h-4" /> Title
          </div>
          <div className="col-span-7 font-bold text-foreground">VP Finance</div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Building2 className="w-4 h-4" /> Company
          </div>
          <div className="col-span-7 font-bold text-foreground">CloudKitchen</div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Mail className="w-4 h-4" /> Lead Source
          </div>
          <div className="col-span-7 font-bold text-foreground">Inbound — Website form</div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <div className="w-4 h-4 flex items-center justify-center"><div className="w-3 h-3 rounded-full border-[2px] border-amber-500" /></div> Lead Status
          </div>
          <div className="col-span-7">
            <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 shadow-none font-semibold px-2 py-0 text-[11px]">New — Not Contacted</Badge>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Users className="w-4 h-4" /> Lead Owner
          </div>
          <div className="col-span-7 font-bold text-foreground">Sarah Johnson (SDR)</div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Building2 className="w-4 h-4" /> Industry
          </div>
          <div className="col-span-7">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 shadow-none font-semibold px-2 py-0 text-[11px]">Food Tech / Logistics</Badge>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 text-sm py-1">
          <div className="col-span-5 flex items-center gap-3 text-muted-foreground font-medium">
            <Users className="w-4 h-4" /> Company Size
          </div>
          <div className="col-span-7 font-bold text-foreground">200-500 employees</div>
        </div>
        
        <div className="pt-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-muted-foreground hover:text-foreground px-0">
            See more <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      <div className="pt-8 border-t border-border space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">ENRICHMENT DATA</h3>
          <span className="text-[11px] font-medium text-muted-foreground">Last updated: 2h ago</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm">Company Signals</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">Recent funding: $45M Series B, 3 months ago</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">1</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">Hiring: 3 finance/treasury roles in last 30 days</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">2</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">Market expansion: 8 &rarr; 15 US markets planned</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">3</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm">Contact Signals (Jackie Lee)</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">Started role: 12 days ago</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">4</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">Previous: Deel — operations/finance</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">4</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              <span className="text-muted-foreground font-medium">LinkedIn connections to existing customers: 2 detected</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-border text-[9px] font-medium text-muted-foreground bg-muted/30 shrink-0 mt-0.5">4</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm">Estimated Tech Stack</h4>
          {/* Add more here if desired based on screenshot */}
        </div>
      </div>
    </div>
  )
}
