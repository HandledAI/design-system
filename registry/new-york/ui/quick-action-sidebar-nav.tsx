"use client"

import * as React from "react"
import {
  Activity,
  BarChart2,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Inbox,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { QuickActionModal, type QuickActionTaskDraft } from "./quick-action-modal"

type NavBadge = "for-review" | "coming-soon" | null

interface QuickActionSidebarNavProps extends React.ComponentProps<"aside"> {
  onCreateTask?: (draft: QuickActionTaskDraft) => void
  defaultCollapsed?: boolean
}

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge: NavBadge
  active?: boolean
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2, badge: "for-review", active: true },
  { id: "conversations", label: "Conversations", icon: MessageSquare, badge: "for-review" },
  { id: "inbox", label: "My Inbox", icon: Inbox, badge: "coming-soon" },
  { id: "insights", label: "Insights", icon: Activity, badge: "for-review" },
]

const WORK_QUEUE_ITEMS: NavItem[] = [
  { id: "referrals", label: "Referrals", icon: FileText, badge: "coming-soon" },
  { id: "intake", label: "Intake", icon: ClipboardList, badge: "coming-soon" },
]

function NavBadgePill({ badge }: { badge: NavBadge }) {
  if (!badge) {
    return null
  }

  if (badge === "for-review") {
    return (
      <span className="rounded-full border border-[#b7cdfb] bg-[#eef5ff] px-3 py-1 text-xs font-semibold text-[#466dcf]">
        For Review
      </span>
    )
  }

  return (
    <span className="rounded-full border border-[#efcf7f] bg-[#fff8e8] px-3 py-1 text-xs font-semibold text-[#bd7704]">
      Coming Soon
    </span>
  )
}

function SidebarNavRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  if (collapsed) {
    return (
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-center rounded-md p-2.5 transition-colors",
          item.active ? "bg-[#ebf7f1]" : "hover:bg-slate-100"
        )}
        title={item.label}
      >
        <item.icon className={cn("h-5 w-5", item.active ? "text-[#2c9b69]" : "text-[#74839d]")} />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors",
        item.active ? "bg-[#ebf7f1]" : "hover:bg-slate-100"
      )}
    >
      <span className="flex items-center gap-3">
        <item.icon className={cn("h-4 w-4", item.active ? "text-[#2c9b69]" : "text-[#74839d]")} />
        <span className={cn("text-base font-semibold", item.active ? "text-[#2b6b53]" : "text-[#4b5b78]")}>
          {item.label}
        </span>
      </span>
      <NavBadgePill badge={item.badge} />
    </button>
  )
}

export function QuickActionSidebarNav({
  className,
  onCreateTask,
  defaultCollapsed = false,
  ...props
}: QuickActionSidebarNavProps) {
  const [isQuickActionOpen, setIsQuickActionOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <>
      <aside
        className={cn(
          "flex h-[860px] flex-col overflow-hidden rounded-md border border-slate-200 bg-[#f8f9fb] shadow-sm transition-all duration-300",
          isCollapsed ? "w-[72px]" : "w-[340px]",
          className,
        )}
        {...props}
      >
        <div className={cn(
          "relative flex shrink-0 items-center transition-all duration-300",
          isCollapsed ? "justify-center h-16" : "justify-center h-auto pt-4 pb-2",
        )}>
          {!isCollapsed ? (
            <div className="w-full px-5 text-center">
              <h2 className="text-5xl font-black tracking-tight text-[#111827]">ACME</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7ea095]">
                Company
              </p>
            </div>
          ) : null}

          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className={cn("flex-1 overflow-y-auto pb-6", isCollapsed ? "px-2 pt-2" : "px-5")}>
          {!isCollapsed ? (
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:bg-slate-50"
            >
              <div className="rounded-md bg-[#1f4f3d] p-2 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-[#1f314a]">Patient Access</span>
            </button>
          ) : (
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-slate-200 bg-white p-2.5 shadow-sm transition-colors hover:bg-slate-50"
              title="Patient Access"
            >
              <div className="rounded-md bg-[#1f4f3d] p-2 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
            </button>
          )}

          <div className={cn("space-y-1.5", isCollapsed ? "mt-4" : "mt-10")}>
            {PRIMARY_NAV_ITEMS.map((item) => (
              <SidebarNavRow key={item.id} item={item} collapsed={isCollapsed} />
            ))}
          </div>

          <div className={cn(isCollapsed ? "mt-4" : "mt-8")}>
            {!isCollapsed ? (
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ea0be]">
                  Work Queues
                </span>
                <ChevronDown className="h-4 w-4 text-[#8ea0be]" />
              </div>
            ) : (
              <div className="mb-2 h-px bg-slate-200" />
            )}
            <div className="space-y-1.5">
              {WORK_QUEUE_ITEMS.map((item) => (
                <SidebarNavRow key={item.id} item={item} collapsed={isCollapsed} />
              ))}
            </div>
          </div>

          {!isCollapsed ? (
            <div className="mt-8 space-y-5 px-2">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#8ea0be]"
              >
                <span>Platform</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#8ea0be]"
              >
                <span>Admin</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>

        <div className={cn(
          "space-y-4 border-t border-slate-200 bg-[#f8f9fb] py-4",
          isCollapsed ? "px-2" : "px-5",
        )}>
          {!isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsQuickActionOpen(true)}
              className="flex w-full items-center justify-between rounded-md bg-[#1b4332] px-4 py-3 text-white shadow-sm transition-colors hover:bg-[#245240]"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-4 w-4" />
                Quick Action
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded-md border border-white/25 bg-white/10 px-2 py-0.5 text-[11px] font-semibold">
                  CMD
                </span>
                <span className="rounded-md border border-white/25 bg-white/10 px-2 py-0.5 text-[11px] font-semibold">
                  K
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsQuickActionOpen(true)}
              className="flex w-full items-center justify-center rounded-md bg-[#1b4332] p-2.5 text-white shadow-sm transition-colors hover:bg-[#245240]"
              title="Quick Action (⌘K)"
            >
              <Zap className="h-5 w-5" />
            </button>
          )}

          {!isCollapsed ? (
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left shadow-sm transition-colors hover:bg-slate-50"
            >
              <span className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                  JC
                </div>
                <span className="flex flex-col">
                  <span className="text-base font-semibold text-[#1f314a]">Jay Corralejo</span>
                  <span className="text-sm text-[#6c7b95]">jcorralejo@acmeco.com</span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-[#8ea0be]" />
            </button>
          ) : (
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 shadow-sm transition-colors hover:bg-slate-50"
              title="Jay Corralejo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                JC
              </div>
            </button>
          )}
        </div>
      </aside>

      <QuickActionModal
        open={isQuickActionOpen}
        onOpenChange={setIsQuickActionOpen}
        onCreateTask={onCreateTask}
      />
    </>
  )
}
