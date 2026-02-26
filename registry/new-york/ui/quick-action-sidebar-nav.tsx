"use client"

import * as React from "react"
import {
  Activity,
  BarChart2,
  Building,
  ChevronDown,
  Code,
  Inbox,
  Link as LinkIcon,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback } from "./avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { QuickActionModal, type QuickActionTaskDraft } from "./quick-action-modal"

export interface SidebarNavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SidebarNavSection {
  title?: string
  items: SidebarNavItem[]
  moreItems?: SidebarNavItem[]
}

export interface SidebarUserProfile {
  name: string
  email: string
  initials?: string
}

export interface UserMenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  destructive?: boolean
}

interface QuickActionSidebarNavProps extends React.ComponentProps<"aside"> {
  brandLabel?: string
  brandSubtitle?: string
  navSections?: SidebarNavSection[]
  activeItemId?: string
  onNavigate?: (itemId: string) => void
  user?: SidebarUserProfile
  userMenuItems?: UserMenuItem[]
  onUserMenuAction?: (itemId: string) => void
  onCreateTask?: (draft: QuickActionTaskDraft) => void
  defaultCollapsed?: boolean
}

const DEFAULT_NAV_SECTIONS: SidebarNavSection[] = [
  {
    items: [
      { id: "home", label: "Home", icon: Inbox },
      { id: "inbox", label: "Inbox", icon: Inbox },
    ],
  },
  {
    title: "Focus",
    items: [
      { id: "inbox", label: "Unibox", icon: Inbox },
      { id: "accounts", label: "My Accounts", icon: Building },
      { id: "activity", label: "Activity", icon: Activity },
      { id: "dashboard", label: "Insights", icon: BarChart2 },
    ],
    moreItems: [
      { id: "search", label: "Search", icon: Search },
    ],
  },
  {
    title: "Assistant",
    items: [
      { id: "new-chat", label: "New chat", icon: Plus },
      { id: "chats", label: "Chats", icon: MessageSquare },
    ],
  },
  {
    title: "Your Teams",
    items: [
      { id: "account-dev", label: "Account Development", icon: Users },
      { id: "rel-mgmt", label: "Relationship Management", icon: Users },
    ],
    moreItems: [
      { id: "more-teams", label: "More", icon: MoreHorizontal },
    ],
  },
]

const DEFAULT_USER: SidebarUserProfile = {
  name: "John Doe",
  email: "jdoe@acmeco.com",
  initials: "JD",
}

const DEFAULT_USER_MENU: UserMenuItem[] = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "dev", label: "Dev", icon: Code },
  { id: "integrations", label: "Integrations", icon: LinkIcon },
  { id: "sign-out", label: "Sign out", icon: LogOut, destructive: true },
]

function NavItemRow({
  item,
  isActive,
  isCollapsed,
  onClick,
}: {
  item: SidebarNavItem
  isActive: boolean
  isCollapsed: boolean
  onClick?: () => void
}) {
  const content = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg text-sm font-medium transition-colors",
        isCollapsed ? "justify-center p-2" : "px-3 py-2",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
      )}
    >
      <item.icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
      {!isCollapsed && <span className="flex-1 truncate text-left">{item.label}</span>}
    </button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}

function NavSection({
  section,
  activeItemId,
  isCollapsed,
  onNavigate,
}: {
  section: SidebarNavSection
  activeItemId?: string
  isCollapsed: boolean
  onNavigate?: (id: string) => void
}) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const hasTitle = !isCollapsed && section.title

  return (
    <div className="px-3 py-2">
      {hasTitle && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between mb-1 px-3 group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-widest text-sidebar-foreground/50 uppercase">
            {section.title}
          </span>
          <ChevronDown
            className={cn(
              "w-3 h-3 text-sidebar-foreground/40 transition-transform duration-200",
              !isExpanded && "-rotate-90",
            )}
          />
        </button>
      )}
      {(isExpanded || isCollapsed || !section.title) && (
        <div className="space-y-0.5">
          {section.items.map((item) => (
            <NavItemRow
              key={item.id}
              item={item}
              isActive={activeItemId === item.id}
              isCollapsed={isCollapsed}
              onClick={() => onNavigate?.(item.id)}
            />
          ))}
          {!isCollapsed && section.moreItems && section.moreItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors outline-none">
                <MoreHorizontal className="shrink-0 w-4 h-4" />
                <span className="flex-1 text-left">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-48">
                {section.moreItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => onNavigate?.(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon className="mr-2 w-4 h-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {isCollapsed &&
            section.moreItems?.map((item) => (
              <NavItemRow
                key={item.id}
                item={item}
                isActive={activeItemId === item.id}
                isCollapsed={isCollapsed}
                onClick={() => onNavigate?.(item.id)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export function QuickActionSidebarNav({
  className,
  brandLabel = "ACME CO",
  brandSubtitle = "Relationship Intelligence",
  navSections = DEFAULT_NAV_SECTIONS,
  activeItemId = "inbox",
  onNavigate,
  user = DEFAULT_USER,
  userMenuItems = DEFAULT_USER_MENU,
  onUserMenuAction,
  onCreateTask,
  defaultCollapsed = false,
  ...props
}: QuickActionSidebarNavProps) {
  const [isQuickActionOpen, setIsQuickActionOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const initials =
    user.initials ??
    (user.name
      ? user.name.charAt(0).toUpperCase()
      : user.email
        ? user.email.charAt(0).toUpperCase()
        : "U")

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div
          className={cn(
            "relative flex shrink-0 items-center border-b border-sidebar-border",
            isCollapsed ? "justify-center h-16 px-2" : "h-20 px-5",
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 pr-10">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sidebar-foreground text-sidebar">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold tracking-tight">
                  {brandLabel}
                </span>
                {brandSubtitle && (
                  <span className="text-[10px] font-medium text-sidebar-foreground/50 uppercase tracking-wide">
                    {brandSubtitle}
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1.5 rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              isCollapsed ? "" : "absolute right-4 top-4",
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-1">
          {navSections.map((section, idx) => (
            <React.Fragment key={section.title ?? idx}>
              {idx > 0 && <div className="mx-4 my-2 border-t border-sidebar-border" />}
              <NavSection
                section={section}
                activeItemId={activeItemId}
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Quick Action Button */}
        <div className={cn("px-3 pb-3", isCollapsed ? "hidden" : "block")}>
          <button
            type="button"
            onClick={() => setIsQuickActionOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-sidebar-primary-foreground/80 group-hover:text-sidebar-primary-foreground transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium">Quick Action</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-mono rounded bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </button>
        </div>

        {isCollapsed && (
          <div className="px-2 pb-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setIsQuickActionOpen(true)}
                  className="flex w-full items-center justify-center rounded-lg bg-sidebar-primary p-2.5 text-sidebar-primary-foreground shadow-sm transition-colors hover:bg-sidebar-primary/90"
                  title="Quick Action (⌘K)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Quick Action (⌘K)</TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* User Profile Footer */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center w-full rounded-lg hover:bg-sidebar-accent transition-colors outline-none",
                isCollapsed ? "justify-center p-1" : "p-2 gap-3",
              )}
            >
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarFallback className="rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <div className="flex flex-col items-start flex-1 truncate">
                  <span className="text-sm font-medium leading-none truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-sidebar-foreground/50 truncate mt-0.5">
                    {user.email}
                  </span>
                </div>
              )}

              {!isCollapsed && (
                <MoreVertical className="w-4 h-4 text-sidebar-foreground/50 shrink-0" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right" sideOffset={8} className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userMenuItems.map((item, idx) => {
                const isLast = idx === userMenuItems.length - 1
                const showSepBefore = item.destructive && idx > 0
                return (
                  <React.Fragment key={item.id}>
                    {showSepBefore && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={() => onUserMenuAction?.(item.id)}
                      className={cn(
                        "cursor-pointer",
                        item.destructive && "text-destructive focus:text-destructive",
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  </React.Fragment>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <QuickActionModal
        open={isQuickActionOpen}
        onOpenChange={setIsQuickActionOpen}
        onCreateTask={onCreateTask}
      />
    </TooltipProvider>
  )
}
