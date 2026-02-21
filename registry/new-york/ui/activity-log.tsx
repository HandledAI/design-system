import * as React from "react"
import { Activity, Scale, Heart, MessageSquare, ArrowRight, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface ActivityLogItem {
  id: string
  type: "workout" | "weighin" | "biometric" | "checkin" | string
  title: string
  details: string
  date: string
  time: string
}

export interface ActivityLogProps {
  items: ActivityLogItem[]
  title?: string
  initialLimit?: number
}

const getIcon = (type: string) => {
  switch (type) {
    case "workout":
      return <Activity size={16} className="text-orange-500" />
    case "weighin":
      return <Scale size={16} className="text-blue-500" />
    case "biometric":
      return <Heart size={16} className="text-rose-500" />
    case "checkin":
      return <MessageSquare size={16} className="text-indigo-500" />
    default:
      return <Activity size={16} className="text-gray-500" />
  }
}

export function ActivityRow({ item }: { item: ActivityLogItem }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded-md transition-colors group">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
        {getIcon(item.type)}
      </div>

      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span className="font-medium text-sm text-gray-900">{item.title}</span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="text-xs text-gray-500 truncate">{item.details}</span>

        {item.type === "checkin" && (
          <button className="ml-auto sm:ml-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            view <ArrowRight size={10} />
          </button>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-xs text-gray-500">{format(new Date(item.date), "MMM d")}</div>
        <div className="text-[10px] text-gray-400">{item.time}</div>
      </div>
    </div>
  )
}

export function ActivityLog({ items, title = "Recent Activity", initialLimit = 5 }: ActivityLogProps) {
  const [limit, setLimit] = React.useState(initialLimit)
  const displayedLogs = items.slice(0, limit)
  const hasMore = limit < items.length

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>

      <div className="flex flex-col">
        {displayedLogs.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setLimit((prev) => prev + 5)}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors border border-dashed border-gray-200"
        >
          <ChevronDown size={14} />
          Show more
        </button>
      )}
    </div>
  )
}
