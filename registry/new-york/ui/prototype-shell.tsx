"use client"

import * as React from "react"
import {
  QuickActionSidebarNav,
} from "./quick-action-sidebar-nav"
import {
  EntityPanel,
  EntityDetails,
  PotentialContacts,
  RecentActivity,
  ConnectedApps,
  SystemActivity,
} from "./entity-panel"
import { PrototypeInboxView } from "./prototype-inbox-view"
import { PrototypeInsightsView } from "./prototype-insights-view"
import { PrototypeAccountsView } from "./prototype-accounts-view"
import { PrototypeWorkQueueView } from "./prototype-work-queue-view"
import { PrototypeAdminView } from "./prototype-admin-view"
import type { PrototypeConfig, EntityPanelSection } from "./prototype-config"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrototypeShellProps {
  config: PrototypeConfig
  /**
   * Optional ReactNode rendered in the header area of each view.
   * Useful for adding an "Exit Preview" button in the design system showcase.
   */
  headerActions?: React.ReactNode
  /**
   * Custom content to render inside the EntityPanel.
   * When provided, overrides the default section-based rendering.
   * Receives `onClose` so children can close the panel.
   */
  entityPanelChildren?: React.ReactNode | ((ctx: { onClose: () => void }) => React.ReactNode)
  /**
   * Fired on every sidebar navigation click (both navigable and non-navigable views).
   * Useful for intercepting clicks on product-specific views like "settings"
   * that live outside the shell.
   */
  onNavigate?: (viewId: string) => void
}

// ---------------------------------------------------------------------------
// View ID → config key mapping
// ---------------------------------------------------------------------------

const VIEW_KEY_MAP: Record<string, keyof PrototypeConfig["views"]> = {
  inbox: "inbox",
  dashboard: "insights",
  insights: "insights",
  accounts: "accounts",
  activity: "workQueue",
  workQueue: "workQueue",
  "work-queue": "workQueue",
  admin: "admin",
  settings: "admin",
}

// ---------------------------------------------------------------------------
// Default entity panel sections
// ---------------------------------------------------------------------------

const DEFAULT_ENTITY_SECTIONS: EntityPanelSection[] = [
  { type: "details" },
  { type: "contacts" },
  { type: "recentActivity" },
  { type: "connectedApps" },
  { type: "systemActivity" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PrototypeShell({
  config,
  headerActions,
  entityPanelChildren,
  onNavigate,
}: PrototypeShellProps) {
  const [currentView, setCurrentView] = React.useState(config.defaultView)
  const [isEntityPanelOpen, setIsEntityPanelOpen] = React.useState(false)

  const navigableViews = React.useMemo(() => {
    if (config.navigableViews) return config.navigableViews
    const keys: string[] = []
    if (config.views.inbox) keys.push("inbox")
    if (config.views.accounts) keys.push("accounts")
    if (config.views.workQueue) keys.push("activity", "workQueue", "work-queue")
    if (config.views.insights) keys.push("dashboard", "insights")
    if (config.views.admin) keys.push("admin", "settings")
    return keys
  }, [config.navigableViews, config.views])

  const handleNavigate = React.useCallback(
    (id: string) => {
      if (navigableViews.includes(id)) {
        setCurrentView(id)
      }
      onNavigate?.(id)
    },
    [navigableViews, onNavigate],
  )

  const handleOpenEntityPanel = React.useCallback(() => setIsEntityPanelOpen(true), [])
  const handleOpenRecentActivity = React.useCallback(() => {
    setIsEntityPanelOpen(true)
    setTimeout(() => {
      document.getElementById("entity-recent-activity")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)
  }, [])

  const resolvedViewKey = VIEW_KEY_MAP[currentView] ?? currentView

  const entitySections = config.entityPanel?.sections ?? DEFAULT_ENTITY_SECTIONS
  const entityIcons = config.entityPanel?.icons ?? {}

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans">
      <QuickActionSidebarNav
        className="z-20 h-screen shrink-0"
        brandLabel={config.brand?.name}
        brandSubtitle=""
        navSections={config.sidebar}
        activeItemId={currentView}
        onNavigate={handleNavigate}
        onCreateTask={(draft) => {
          console.log("Quick action created:", draft)
        }}
      />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
        <div className="relative h-full flex-1 overflow-auto">
          {resolvedViewKey === "insights" && config.views.insights ? (
            <PrototypeInsightsView
              {...config.views.insights}
              assistantName={config.brand?.assistantName}
              headerActions={headerActions}
              onNavigateToInbox={() => setCurrentView("inbox")}
            />
          ) : resolvedViewKey === "inbox" && config.views.inbox ? (
            <PrototypeInboxView
              {...config.views.inbox}
              headerActions={headerActions}
              onOpenEntityPanel={handleOpenEntityPanel}
              onOpenRecentActivity={handleOpenRecentActivity}
            />
          ) : resolvedViewKey === "accounts" && config.views.accounts ? (
            <PrototypeAccountsView
              {...config.views.accounts}
              headerActions={headerActions}
              onRowClick={handleOpenEntityPanel}
            />
          ) : resolvedViewKey === "workQueue" && config.views.workQueue ? (
            <PrototypeWorkQueueView
              headerActions={headerActions}
            />
          ) : resolvedViewKey === "admin" && config.views.admin ? (
            <PrototypeAdminView
              {...config.views.admin}
              headerActions={headerActions}
            />
          ) : null}
        </div>
      </main>

      <EntityPanel isOpen={isEntityPanelOpen} onClose={setIsEntityPanelOpen}>
        {(typeof entityPanelChildren === "function"
          ? entityPanelChildren({ onClose: () => setIsEntityPanelOpen(false) })
          : entityPanelChildren) ?? (
          <>
            {entitySections.map((section, i) => {
              switch (section.type) {
                case "details":
                  return <EntityDetails key={i} onClose={() => setIsEntityPanelOpen(false)} />
                case "contacts":
                  return (
                    <PotentialContacts
                      key={i}
                      icons={{
                        linkedin: entityIcons.linkedin,
                        gmail: entityIcons.gmail,
                      }}
                    />
                  )
                case "recentActivity":
                  return (
                    <RecentActivity
                      key={i}
                      items={(section.props?.items as React.ComponentProps<typeof RecentActivity>["items"]) ?? []}
                    />
                  )
                case "connectedApps":
                  return (
                    <ConnectedApps
                      key={i}
                      icons={{
                        slack: entityIcons.slack,
                        gdoc: entityIcons.gdoc,
                      }}
                    />
                  )
                case "systemActivity":
                  return <SystemActivity key={i} />
                default:
                  return null
              }
            })}
          </>
        )}
      </EntityPanel>
    </div>
  )
}
