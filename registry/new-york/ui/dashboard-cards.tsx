import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { PreviewList, PreviewListItem } from "./preview-list"
import { Square, Clock, Video, CheckCircle2, CheckSquare, Eye } from "lucide-react"

export function TopTasksCard({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <Card className="rounded-xl border border-border shadow-sm overflow-hidden gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between pt-4 pb-3 px-6 border-b border-border bg-muted/20">
        <CardTitle className="text-sm font-bold tracking-tight">Top Tasks</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll} 
          className="text-xs h-7 text-brand-purple hover:text-brand-purple/80 hover:bg-brand-purple/10"
        >
          View all tasks &rarr;
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <PreviewList>
          <PreviewListItem
            icon={<Square className="w-4 h-4 text-muted-foreground hover:text-brand-purple transition-colors" />}
            title="Follow up with Lunchclub"
            subtitle="Churn Mitigation"
            meta={
              <>
                <span className="text-[11px] font-medium text-muted-foreground">Due in 2h</span>
                <Badge variant="destructive" className="text-[10px] px-2 py-0 h-4 uppercase tracking-wider rounded-full shadow-none font-bold bg-foreground text-background hover:bg-foreground/90">Urgent</Badge>
              </>
            }
            onClick={onViewAll}
          />
          <PreviewListItem
            icon={<Square className="w-4 h-4 text-muted-foreground hover:text-brand-purple transition-colors" />}
            title="Outbound opportunity: CloudKitchen"
            subtitle="Outbound"
            meta={<span className="text-[11px] font-medium text-muted-foreground">Due tomorrow</span>}
            onClick={onViewAll}
          />
          <PreviewListItem
            icon={<Square className="w-4 h-4 text-muted-foreground hover:text-brand-purple transition-colors" />}
            title="New CFO welcome: Loom"
            subtitle="Relationship"
            meta={<span className="text-[11px] font-medium text-muted-foreground">Due next week</span>}
            onClick={onViewAll}
          />
        </PreviewList>
      </CardContent>
    </Card>
  )
}

export function UpcomingMeetingsCard() {
  return (
    <Card className="rounded-xl border border-border shadow-sm overflow-hidden gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between pt-4 pb-3 px-6 border-b border-border bg-muted/20">
        <CardTitle className="text-sm font-bold tracking-tight">Upcoming Meetings</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-7 text-brand-purple hover:text-brand-purple/80 hover:bg-brand-purple/10">
          View all meetings &rarr;
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <PreviewList>
          <PreviewListItem
            icon={<Clock className="w-4 h-4 text-blue-500" />}
            title="Q3 Review - Acme Corp"
            subtitle="2:00 PM - 3:00 PM"
            meta={<span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Starts in 10 mins</span>}
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <Video className="w-3.5 h-3.5 mr-1.5" /> Join
              </Button>
            }
          />
          <PreviewListItem
            icon={<Clock className="w-4 h-4 text-blue-500" />}
            title="Initial Sync - Initech"
            subtitle="4:30 PM - 5:00 PM"
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <Video className="w-3.5 h-3.5 mr-1.5" /> Join
              </Button>
            }
          />
        </PreviewList>
      </CardContent>
    </Card>
  )
}

export function RecentlyCompletedCard() {
  return (
    <Card className="rounded-xl border border-border shadow-sm overflow-hidden opacity-80 bg-muted/5 gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between pt-4 pb-3 px-6 border-b border-border bg-muted/10">
        <CardTitle className="text-sm font-bold tracking-tight text-muted-foreground">Recently Completed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <PreviewList>
          <PreviewListItem
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            title={<span className="text-muted-foreground font-medium">Sync - Globex Inc</span>}
            subtitle="10:00 AM"
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <Eye className="w-3.5 h-3.5 mr-1.5" /> View
              </Button>
            }
          />
          <PreviewListItem
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            title={<span className="text-muted-foreground font-medium">Check-in - Pied Piper</span>}
            subtitle="9:00 AM"
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <Eye className="w-3.5 h-3.5 mr-1.5" /> View
              </Button>
            }
          />
        </PreviewList>
      </CardContent>
    </Card>
  )
}

export function CheckInsCard() {
  return (
    <Card className="rounded-xl border border-border shadow-sm overflow-hidden gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between pt-4 pb-3 px-6 border-b border-border bg-muted/20">
        <CardTitle className="text-sm font-bold tracking-tight">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <PreviewList>
          <PreviewListItem
            icon={
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
              </div>
            }
            title="Morning Standup"
            subtitle="9:00 AM"
            meta={<Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-none border-transparent font-semibold text-[10px]">Done</Badge>}
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <Eye className="w-3.5 h-3.5 mr-1.5" /> View
              </Button>
            }
          />
          <PreviewListItem
            icon={
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
            }
            title="Evening Wrap-up"
            subtitle="5:00 PM"
            meta={<Badge variant="outline" className="text-muted-foreground shadow-none font-semibold text-[10px]">Pending</Badge>}
            action={
              <Button size="sm" variant="outline" className="h-7 text-xs shadow-sm bg-background hover:bg-muted">
                <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Complete
              </Button>
            }
          />
        </PreviewList>
      </CardContent>
    </Card>
  )
}
