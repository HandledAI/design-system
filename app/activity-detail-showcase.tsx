"use client"

import * as React from "react"
import { MessageCircle, Mail } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button"
import { ActivityDetail, type ActivityDetailData } from "@/registry/new-york/ui/activity-detail"
import { BRAND_ICONS } from "@/lib/icons"

const callActivity: ActivityDetailData = {
  icon: <img src={BRAND_ICONS.gong} alt="Gong" className="w-4 h-4 object-contain" />,
  title: "Call with Sarah Chen — Treasury strategy discussion",
  details: "Strong interest in yield optimization and cash management. Sarah mentioned they're evaluating 3 vendors for treasury management and wants to schedule a deeper technical review next week.",
  content: "Key takeaways:\n\n• Currently managing $12M in operating cash across 4 bank accounts\n• Pain point: manual reconciliation taking 2+ hours daily\n• Decision timeline: Q2 board meeting (6 weeks out)\n• Budget holder: CFO (Marcus Webb) has pre-approved evaluation",
  time: "Yesterday at 2:30 PM",
  source: "Gong",
  type: "call",
  sourceIcon: <img src={BRAND_ICONS.gong} alt="Gong" className="w-4 h-4 object-contain" />,
  externalUrl: "#",
  tags: ["Treasury", "High Intent", "Technical Review"],
  participants: [
    { name: "Sarah Chen", role: "VP Finance" },
    { name: "You" },
    { name: "Alex Rivera", role: "Solutions Engineer" },
  ],
  thread: [
    { id: "1", sender: "Alex Rivera", time: "2:30 PM", content: "Kicked off with product overview and treasury management capabilities." },
    { id: "2", sender: "Sarah Chen", time: "2:45 PM", content: "Asked about API integrations with their existing ERP system and real-time balance visibility across accounts." },
    { id: "3", sender: "You", time: "2:52 PM", content: "Walked through the API documentation and showed the live dashboard. Sarah was particularly interested in the automated sweep functionality.", isCurrent: true },
    { id: "4", sender: "Sarah Chen", time: "3:05 PM", content: "Wants to schedule a follow-up with their CFO and IT team for a technical deep-dive next Tuesday." },
  ],
}

const emailActivity: ActivityDetailData = {
  icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-4 h-4 object-contain" />,
  title: "Re: Q2 Treasury Review — Next Steps",
  details: "Email thread discussing follow-up from the treasury strategy call and scheduling a technical deep-dive.",
  time: "Today at 9:15 AM",
  source: "Gmail",
  type: "email",
  sourceIcon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-4 h-4 object-contain" />,
  externalUrl: "#",
  tags: ["Follow-up", "Treasury", "Scheduling"],
  thread: [
    {
      id: "e1",
      sender: "You",
      to: "sarah.chen@cloudkitchen.com",
      cc: "alex.rivera@company.com",
      time: "Yesterday, 4:12 PM",
      subject: "Q2 Treasury Review — Next Steps",
      content: "Hi Sarah,\n\nGreat speaking with you earlier today. As discussed, I wanted to follow up with a summary and proposed next steps.\n\nWe'd love to schedule a technical deep-dive with your IT team to walk through the API integration and automated sweep functionality you were interested in.\n\nWould next Tuesday at 2 PM work for your team?\n\nBest,\nJordan",
    },
    {
      id: "e2",
      sender: "Sarah Chen",
      to: "you@company.com",
      cc: "alex.rivera@company.com, marcus.webb@cloudkitchen.com",
      time: "Yesterday, 6:45 PM",
      content: "Hi Jordan,\n\nThanks for the quick follow-up. Tuesday at 2 PM works on our end. I've looped in Marcus (our CFO) — he'll want to join for the ROI discussion portion.\n\nCould you also send over the API documentation ahead of time? Our engineering lead, Mike Rodriguez, would like to review it beforehand.\n\nThanks,\nSarah",
    },
    {
      id: "e3",
      sender: "You",
      to: "sarah.chen@cloudkitchen.com",
      cc: "alex.rivera@company.com, marcus.webb@cloudkitchen.com",
      time: "Today, 9:15 AM",
      content: "Hi Sarah,\n\nPerfect — Tuesday at 2 PM is confirmed. I'll send a calendar invite shortly.\n\nI've attached our API documentation and a sample integration guide. Happy to set up a sandbox environment for Mike's team if that would be helpful.\n\nLooking forward to it!\n\nBest,\nJordan",
    },
  ],
}

export function ActivityDetailShowcase() {
  const [activeTab, setActiveTab] = React.useState<"call" | "email">("call")
  const [showDetail, setShowDetail] = React.useState(true)

  const activity = activeTab === "call" ? callActivity : emailActivity

  if (!showDetail) {
    return (
      <div className="flex items-center justify-center py-12">
        <Button variant="outline" onClick={() => setShowDetail(true)}>
          Show Activity Detail
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        <button
          onClick={() => { setActiveTab("call"); setShowDetail(true) }}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            activeTab === "call"
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted/50"
          }`}
        >
          Call Thread
        </button>
        <button
          onClick={() => { setActiveTab("email"); setShowDetail(true) }}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            activeTab === "email"
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted/50"
          }`}
        >
          Email Thread
        </button>
      </div>

      <ActivityDetail
        key={activeTab}
        activity={activity}
        onBack={() => setShowDetail(false)}
        actions={
          activeTab === "email" ? (
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-medium shadow-none">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Reply
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-none">
                Reply All
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground">
                Forward
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-medium shadow-none">
                Draft Follow-up
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-none">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                Share to Slack
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground">
                Create Task
              </Button>
            </div>
          )
        }
      />
    </div>
  )
}
