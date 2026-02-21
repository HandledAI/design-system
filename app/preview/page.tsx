"use client"

import * as React from "react"
import PreviewClientPage from "./preview-client"

export default function PreviewPage() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-screen w-full bg-background" />
  }

  return <PreviewClientPage />
}
