import * as React from "react"
import { cn } from "@/lib/utils"

export function PreviewList({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const items = React.Children.toArray(children)
  const visibleItems = items.slice(0, 8)

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {visibleItems}
    </div>
  )
}

export interface PreviewListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  meta?: React.ReactNode // e.g. time, badges on the right
  action?: React.ReactNode // hover action like a "Join" button
  isHoverable?: boolean
}

export const PreviewListItem = React.forwardRef<HTMLDivElement, PreviewListItemProps>(
  ({ className, icon, title, subtitle, meta, action, isHoverable = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between group relative bg-background transition-colors",
          "px-6 h-16 border-b border-border last:border-0",
          isHoverable && "hover:bg-muted/30 cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 overflow-hidden min-w-0 h-full py-2">
          {icon && <div className="shrink-0 flex items-center justify-center">{icon}</div>}
          <div className="min-w-0 flex flex-col justify-center gap-1">
            <div className="text-sm font-semibold text-foreground truncate leading-snug">{title}</div>
            {subtitle && <div className="text-xs text-muted-foreground truncate leading-snug">{subtitle}</div>}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 pl-4">
          {meta && <div className={cn("flex items-center gap-2", action && "group-hover:opacity-0 transition-opacity")}>{meta}</div>}
          
          {action && (
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center bg-background/95 backdrop-blur-sm pl-2">
              {action}
            </div>
          )}
        </div>
      </div>
    )
  }
)
PreviewListItem.displayName = "PreviewListItem"
