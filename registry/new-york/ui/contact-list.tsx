"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"

export interface ContactChannel {
  type: "linkedin" | "gmail" | "salesforce" | "phone" | "custom"
  icon: React.ReactNode
  label?: string
  onClick?: () => void
}

export interface ContactItem {
  id: string
  name: string
  role: string
  badge?: {
    label: string
    color?: "indigo" | "green" | "amber" | "red" | "muted"
  }
  channels?: ContactChannel[]
  action?: {
    label: string
    onClick?: () => void
  }
  description?: string
  onDismiss?: () => void
}

export interface ContactListProps {
  title?: string
  count?: string
  contacts: ContactItem[]
  onAdd?: () => void
  addLabel?: string
}

const badgeColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  green: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  muted: "bg-muted text-muted-foreground border-border",
}

function ContactRow({ contact }: { contact: ContactItem }) {
  return (
    <div className="flex items-center justify-between gap-3 group py-2.5 border-b border-border/30 last:border-0 hover:bg-muted/20 -mx-2 px-2 rounded-sm transition-colors">
      <div className="flex items-center gap-2.5 min-w-0">
        {contact.badge && (
          <Badge
            variant="outline"
            className={`shadow-none px-2 py-0 text-[11px] font-medium shrink-0 ${badgeColors[contact.badge.color ?? "muted"]}`}
          >
            {contact.badge.label}
          </Badge>
        )}
        <span className="font-medium text-sm text-foreground truncate">{contact.name}</span>
        <span className="text-muted-foreground text-sm shrink-0">&middot;</span>
        <span className="text-muted-foreground text-sm truncate">{contact.role}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {contact.channels?.map((ch, i) => (
          <button
            key={i}
            onClick={ch.onClick}
            className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors"
            title={ch.label}
          >
            {ch.icon}
          </button>
        ))}
        {contact.action && (
          <Button
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 h-6 text-[11px] font-medium shadow-none ml-1"
            onClick={contact.action.onClick}
          >
            <Plus className="w-3 h-3 mr-1" />
            {contact.action.label}
          </Button>
        )}
        {contact.onDismiss && (
          <button
            onClick={contact.onDismiss}
            className="h-6 w-6 flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:bg-muted rounded-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  )
}

export function ContactList({ title, count, contacts, onAdd, addLabel }: ContactListProps) {
  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">{title}</h3>
        <div className="flex items-center gap-3">
          {count && <span className="text-xs text-muted-foreground">{count}</span>}
          {onAdd && (
            <Button variant="ghost" size="sm" onClick={onAdd} className="h-7 text-xs font-medium hover:bg-muted/50">
              <Plus className="w-3.5 h-3.5 mr-1" /> {addLabel ?? "Add"}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-0">
        {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}
