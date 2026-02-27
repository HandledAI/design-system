"use client"

import * as React from "react"
import { Settings } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import type { AdminViewConfig } from "./prototype-config"

export interface PrototypeAdminViewProps extends AdminViewConfig {
  headerActions?: React.ReactNode
}

export function PrototypeAdminView({
  title = "Admin",
  icon: Icon = Settings,
  tabs,
  defaultTab,
  headerActions,
}: PrototypeAdminViewProps) {
  const resolvedDefault = defaultTab ?? tabs[0]?.id

  if (!tabs.length) return null

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <div className="shrink-0 border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Icon className="h-5 w-5" />
            <span>{title}</span>
          </div>
          {headerActions}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue={resolvedDefault} className="w-full space-y-8">
            <div className="flex justify-start">
              <TabsList className="h-9 rounded-lg border border-border/50 bg-muted/50 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="space-y-6 focus-visible:outline-none"
              >
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
