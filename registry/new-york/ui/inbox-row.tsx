import * as React from "react"
import { Phone, Mail, MessageSquare, AlertCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InboxRowProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string
  statusColor: "red" | "orange" | "gray"
  primaryText: string
  secondaryText: string
  tertiaryText: string
  isAtRisk?: boolean
  contactMethods?: { phone?: boolean; email?: boolean; message?: boolean }
  interactionCount: number | string
  assignee: string
  status: string
  time: string
}

export const InboxRow = React.forwardRef<HTMLDivElement, InboxRowProps>(
  (
    {
      className,
      itemId,
      statusColor,
      primaryText,
      secondaryText,
      tertiaryText,
      isAtRisk = false,
      contactMethods = { phone: true, email: true, message: true },
      interactionCount,
      assignee,
      status,
      time,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group flex items-center gap-4 py-3 px-4 border-b border-border hover:bg-muted/50 cursor-pointer bg-background transition-colors text-sm",
          className
        )}
        {...props}
      >
        {/* ID */}
        <div className="w-24 shrink-0 text-muted-foreground font-medium text-[13px]">
          {itemId}
        </div>

        {/* Main Content (Status + Name via Facility -> Specialty) */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div
            className={cn("w-2 h-2 rounded-full shrink-0", {
              "bg-red-500": statusColor === "red",
              "bg-orange-500": statusColor === "orange",
              "bg-gray-300": statusColor === "gray",
            })}
          />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-foreground">{primaryText}</span>
            <span className="text-muted-foreground">via {secondaryText}</span>
            <span className="text-muted-foreground">&rarr;</span>
            <span className="text-muted-foreground">{tertiaryText}</span>
          </div>
        </div>

        {/* Badges / Risk */}
        <div className="w-24 shrink-0 flex items-center justify-end px-2">
          {isAtRisk && (
            <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-md text-[11px] font-medium border border-red-100">
              <AlertCircle className="w-3 h-3" />
              At Risk
            </div>
          )}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-2 text-muted-foreground/40 shrink-0 w-20 justify-center">
          <Phone className={cn("w-3.5 h-3.5", contactMethods.phone && "text-muted-foreground/80")} />
          <Mail className={cn("w-3.5 h-3.5", contactMethods.email && "text-muted-foreground/80")} />
          <MessageSquare className={cn("w-3.5 h-3.5", contactMethods.message && "text-muted-foreground/80")} />
        </div>

        {/* Interaction Count */}
        <div className="w-12 shrink-0 flex items-center justify-center">
          <div
            className={cn(
              "text-[11px] font-medium px-1.5 py-0.5 rounded border",
              typeof interactionCount === "string" && interactionCount.includes("+")
                ? "bg-red-50 border-red-200 text-red-700"
                : Number(interactionCount) > 2
                ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                : "bg-muted border-border text-foreground"
            )}
          >
            {interactionCount}
          </div>
        </div>

        {/* Assignee */}
        <div className="w-32 shrink-0 text-[13px] font-medium text-foreground truncate">
          {assignee}
        </div>

        {/* Status */}
        <div className="w-28 shrink-0">
          <div className="inline-flex items-center bg-muted/80 px-2 py-0.5 rounded text-[11px] font-medium text-muted-foreground">
            {status}
          </div>
        </div>

        {/* Time */}
        <div className="w-24 shrink-0 text-right text-[12px] text-muted-foreground">
          {time}
        </div>
      </div>
    )
  }
)

InboxRow.displayName = "InboxRow"

export function InboxGroupHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-2 py-2 px-4 bg-muted/30 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
      <ChevronDown className="w-3.5 h-3.5" />
      {title}
      <span className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">
        {count}
      </span>
    </div>
  )
}
