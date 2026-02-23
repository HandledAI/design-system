# NPM Package: @handled-ai/design-system

## 1. Publish flow

What to do when you make changes in this package and need to republish with a different version:

1. **Make your changes** in `registry/new-york/ui/`, `lib/`, `hooks/`, or other source files.

2. **Bump the version** in `package.json`:
   - Patch (bug fixes): `0.1.0` → `0.1.1`
   - Minor (new features, non-breaking): `0.1.0` → `0.2.0`
   - Major (breaking changes): `0.1.0` → `1.0.0`

3. **Build the library** (optional; it also runs automatically on publish):
   ```bash
   npm run build:lib
   ```
   This outputs `dist/index.js` and `dist/index.d.ts`.

4. **Publish to npm**:
   ```bash
   npm publish
   ```
   This runs `prepublishOnly` (which runs `npm run build:lib`) and then publishes. Ensure you’re logged in with `npm login` if needed.

5. **Update consuming apps** when you want them on the new version:
   ```bash
   pnpm add @handled-ai/design-system@latest
   # or npm install @handled-ai/design-system@latest
   ```

---

## 2. How to use this package in other apps

### Install the package

In each app:

```bash
pnpm add @handled-ai/design-system
# or
npm install @handled-ai/design-system
# or
yarn add @handled-ai/design-system
```

### Install peer dependencies

If not already in the app, install the peer dependencies:

```bash
pnpm add react react-dom @radix-ui/react-slot @radix-ui/react-label radix-ui class-variance-authority clsx tailwind-merge lucide-react
```

If you use **Chart**, **ActivityLog**, or **MetricCard** in that app, also install:

```bash
pnpm add date-fns recharts zod
```

### Configure Tailwind

Components use Tailwind classes. Add the package to Tailwind’s `content` so those classes are not purged.

**Tailwind v3** (`tailwind.config.js` or `tailwind.config.ts`):

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@handled-ai/design-system/dist/**/*.js",
  ],
  // ... rest of config
}
```

**Tailwind v4:** Include the same path in your `content` configuration (format depends on your setup).

### Add the theme (CSS variables)

Components rely on CSS variables for colors and spacing. In your app’s global CSS (e.g. `globals.css` or `app/globals.css`), define the same variables.

Copy the `:root` and `.dark` blocks from this repo’s **`app/globals.css`** into your app, or define your own values for at least:

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--border`, `--input`, `--ring`
- `--radius`

### Use the components

```tsx
import { Button, Card, cn } from "@handled-ai/design-system"

export function MyPage() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```
