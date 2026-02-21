import { NextRequest, NextResponse } from "next/server"
import {
  writeNetworkError,
  readRecentErrors,
  clearAllErrors,
  type NetworkErrorEntry,
} from "@/lib/network-logger"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const entry: NetworkErrorEntry = {
      timestamp: new Date().toISOString(),
      url: body.url ?? "unknown",
      method: body.method,
      status: body.status,
      statusText: body.statusText,
      message: body.message ?? "Unknown network error",
      source: body.source ?? "client",
    }
    writeNetworkError(entry)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 25)
  const errors = readRecentErrors(limit)
  return NextResponse.json({ errors, count: errors.length })
}

export async function DELETE() {
  clearAllErrors()
  return NextResponse.json({ ok: true, message: "All logs cleared" })
}
