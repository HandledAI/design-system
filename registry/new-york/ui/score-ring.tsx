import * as React from "react"
import { cn } from "../../../lib/utils"

function getScoreColor(score: number, denominator: number) {
  const pct = (score / denominator) * 100
  if (pct >= 70) return "text-emerald-500"
  if (pct >= 40) return "text-amber-500"
  return "text-red-500"
}

function getScoreTrackColor(score: number, denominator: number) {
  const pct = (score / denominator) * 100
  if (pct >= 70) return "text-emerald-500/15"
  if (pct >= 40) return "text-amber-500/15"
  return "text-red-500/15"
}

interface ScoreRingProps {
  score: number
  denominator?: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabel?: boolean
}

function ScoreRing({
  score,
  denominator = 100,
  size = 120,
  strokeWidth = 10,
  className,
  showLabel = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(score / denominator, 1)
  const offset = circumference * (1 - pct)

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={getScoreTrackColor(score, denominator)}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-500", getScoreColor(score, denominator))}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground leading-none">
            {score}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">
            /{denominator}
          </span>
        </div>
      )}
    </div>
  )
}

export { ScoreRing, getScoreColor }
export type { ScoreRingProps }
