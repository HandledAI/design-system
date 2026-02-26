"use client"

import * as React from "react"

export function NetworkErrorLogger({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async (...args) => {
      const [input, init] = args
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
      const method = init?.method ?? "GET"

      try {
        const res = await originalFetch(...args)

        if (!res.ok && isLocalhost(url)) {
          reportError({
            url,
            method,
            status: res.status,
            statusText: res.statusText,
            message: `HTTP ${res.status} ${res.statusText}`,
            source: "fetch-interceptor",
          })
        }

        return res
      } catch (err: unknown) {
        if (isLocalhost(url)) {
          reportError({
            url,
            method,
            message: err instanceof Error ? err.message : String(err),
            source: "fetch-interceptor",
          })
        }
        throw err
      }
    }

    function handleUnhandledRejection(e: PromiseRejectionEvent) {
      if (e.reason instanceof TypeError && e.reason.message.includes("fetch")) {
        reportError({
          url: "unknown",
          message: e.reason.message,
          source: "unhandled-rejection",
        })
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.fetch = originalFetch
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}

function isLocalhost(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin)
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "0.0.0.0" ||
      parsed.hostname === "[::1]"
    )
  } catch {
    return url.startsWith("/")
  }
}

function reportError(entry: Record<string, unknown>) {
  try {
    navigator.sendBeacon(
      "/api/logs",
      new Blob([JSON.stringify(entry)], { type: "application/json" })
    )
  } catch {
    // last resort: fire and forget fetch (won't recurse because the interceptor checks isLocalhost on failures)
  }
}
