import * as React from "react"

const components = [
  "button", "card", "dialog", "input", "label", "select", "table", "tabs",
  "badge", "avatar", "dropdown-menu", "tooltip", "sheet", "separator",
  "skeleton", "scroll-area", "textarea",
]

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">@handled</h1>
        <p className="text-muted-foreground">
          Design system registry for HandledAI projects. Install components
          with the shadcn CLI.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Quick Start</h2>
          <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
            {`npx shadcn@latest add @handled/button`}
          </pre>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">
            Components ({components.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {components.map((name) => (
              <div
                key={name}
                className="border rounded-md px-3 py-2 text-sm font-mono"
              >
                {name}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
