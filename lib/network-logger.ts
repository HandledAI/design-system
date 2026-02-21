import fs from "fs"
import path from "path"

const LOG_DIR = path.join(process.cwd(), ".logs")
const LOG_FILE = path.join(LOG_DIR, "network-errors.jsonl")
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const MAX_FILE_SIZE = 1024 * 1024 // 1 MB

export interface NetworkErrorEntry {
  timestamp: string
  url: string
  method?: string
  status?: number
  statusText?: string
  message: string
  source?: string
}

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
}

export function writeNetworkError(entry: NetworkErrorEntry) {
  ensureLogDir()
  const line = JSON.stringify(entry) + "\n"
  fs.appendFileSync(LOG_FILE, line, "utf-8")
  pruneIfNeeded()
}

function pruneIfNeeded() {
  if (!fs.existsSync(LOG_FILE)) return

  const stat = fs.statSync(LOG_FILE)
  if (stat.size < MAX_FILE_SIZE) return

  const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean)
  const cutoff = Date.now() - MAX_AGE_MS
  const kept = lines.filter((line) => {
    try {
      const entry = JSON.parse(line) as NetworkErrorEntry
      return new Date(entry.timestamp).getTime() > cutoff
    } catch {
      return false
    }
  })

  if (kept.length === 0) {
    fs.unlinkSync(LOG_FILE)
  } else {
    fs.writeFileSync(LOG_FILE, kept.join("\n") + "\n", "utf-8")
  }
}

export function readRecentErrors(limit = 25): NetworkErrorEntry[] {
  if (!fs.existsSync(LOG_FILE)) return []

  const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean)
  const entries: NetworkErrorEntry[] = []

  for (const line of lines) {
    try {
      entries.push(JSON.parse(line))
    } catch {
      // skip malformed lines
    }
  }

  return entries.slice(-limit).reverse()
}

export function clearAllErrors() {
  if (fs.existsSync(LOG_FILE)) {
    fs.unlinkSync(LOG_FILE)
  }
}
