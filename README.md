# @handled Design System

A shared design system built on [shadcn/ui](https://ui.shadcn.com), hosted as a custom shadcn registry. Components are customized shadcn primitives distributed via the `shadcn` CLI.

## What You Can View

When the app is running locally, there are two main experiences:

- **Component gallery:** `/`  
  Browse individual components and UX blocks rendered directly on the page.
- **Prototype view:** `/preview`  
  See the Mercury-style end-to-end product prototype (sidebar, inbox/work queue, detail view, insights dashboard, meetings, and coaching banner patterns).

If port `3000` is taken, Next.js will auto-pick another port (for example `3001`, `3002`, `3003`). Use whatever port appears in your terminal output.

## Architecture

- **Registry format:** Static JSON files served at `/r/{name}.json`
- **Component source:** `registry/new-york/ui/` — customized shadcn primitives + custom UX blocks
- **Theming:** CSS variables — consuming projects define their own palette
- **Build tool:** `shadcn build` generates distributable JSON from source

## Available Components

| Component | Description |
|-----------|-------------|
| `button` | Button with multiple variants and sizes |
| `card` | Card container with header, content, footer |
| `dialog` | Modal dialog (Radix UI) |
| `input` | Styled text input |
| `label` | Form label |
| `select` | Select dropdown (Radix UI) |
| `table` | Responsive table |
| `tabs` | Tab navigation (Radix UI) |
| `badge` | Status indicator badges |
| `avatar` | Avatar with image/fallback |
| `dropdown-menu` | Dropdown menu with keyboard nav |
| `tooltip` | Hover tooltip |
| `sheet` | Slide-out panel |
| `separator` | Visual divider |
| `skeleton` | Loading placeholder |
| `scroll-area` | Custom scrollable area |
| `textarea` | Multi-line text input |
| `activity-log` | Activity stream row pattern |
| `chart` | Chart container and helpers |
| `detail-view` | Production-style detail panel primitives |
| `inbox-row` | Row-based inbox/work queue item |
| `metric-card` | KPI cards with variants (including donut-style) |
| `sidebar` | App navigation sidebar primitives |

## Usage in a Consuming Project

### 1. Add the registry namespace

In your project's `components.json`:

```json
{
  "registries": {
    "@handled": "https://corypitt-design-system.vercel.app/r/{name}.json"
  }
}
```

### 2. Install components

```bash
npx shadcn@latest add @handled/button @handled/card @handled/input
```

### 3. Set your theme

Override CSS variables in your `globals.css` — see the Theming Contract section in `docs/processes/design-system.md` (Barb repo).

## Development

```bash
pnpm install
pnpm run dev            # Start local app (component gallery at /, prototype at /preview)
pnpm run registry:build # Build registry JSON files
```

### Local URLs

- `http://localhost:3000/` (or the port shown in terminal): component gallery
- `http://localhost:3000/preview` (or same active port): full prototype
- `http://localhost:3000/r/registry.json` (or same active port): built registry index

## Publishing Flow

1. Make component changes in `registry/new-york/ui/` (and app previews as needed).
2. Update `registry.json` entries.
3. Run `pnpm run registry:build`.
4. Validate both `/` and `/preview`.
5. Commit and push to `main` (Vercel deploys automatically).

### Adding a new component

1. Add the component to `registry/new-york/ui/`
2. Register it in `registry.json`
3. Run `pnpm run registry:build`
4. Commit and push — Vercel auto-deploys

## Theme Presets

The `app/themes/` directory contains example theme presets to validate the theming contract:

- **neutral** (default) — Black/white, grayscale accents
- **forest** — Dark green primary, earthy tones
- **ocean** — Deep blue primary, cool tones
