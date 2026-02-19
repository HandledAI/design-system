# @cory Design System

A shared design system built on [shadcn/ui](https://ui.shadcn.com), hosted as a custom shadcn registry. Components are customized shadcn primitives distributed via the `shadcn` CLI.

## Architecture

- **Registry format:** Static JSON files served at `/r/{name}.json`
- **Component source:** `registry/new-york/ui/` — standard shadcn components
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

## Usage in a Consuming Project

### 1. Add the registry namespace

In your project's `components.json`:

```json
{
  "registries": {
    "@cory": "https://corypitt-design-system.vercel.app/r/{name}.json"
  }
}
```

### 2. Install components

```bash
npx shadcn@latest add @cory/button @cory/card @cory/input
```

### 3. Set your theme

Override CSS variables in your `globals.css` — see the Theming Contract section in `docs/processes/design-system.md` (Barb repo).

## Development

```bash
pnpm install
pnpm run dev            # Start dev server (preview at localhost:3000)
pnpm run registry:build # Build registry JSON files
```

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
