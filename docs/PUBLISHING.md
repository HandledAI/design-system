# Publishing and Safe Updates

## Section 1: Publishing (for the package owner)

### 1) Pre-publish checklist

1. Confirm your branch is clean and all intended changes are committed.
2. Confirm checks pass locally (same baseline as CI):
   - `pnpm typecheck`
   - `pnpm lint`
3. If you added new components:
   - Verify they are exported in `index.ts`.
   - Verify the library build still passes.
4. Build the package locally:
   - `npm run build:lib`
5. Confirm build artifacts exist:
   - `dist/index.js`
   - `dist/index.d.ts`

### 2) Version bumping (semver for this library)

- **PATCH** (`0.1.0` -> `0.1.1`)
  - Bug fixes, style tweaks, refactors with no API change.
  - Example: fixing border radius in `card.tsx`.
- **MINOR** (`0.1.0` -> `0.2.0`)
  - Additive, non-breaking changes (new components, new props, new variants).
  - Example: adding a `loading` prop to `Button`.
- **MAJOR** (`0.1.0` -> `1.0.0`)
  - Breaking API changes (removed/renamed exports, renamed props, removed variants, changed defaults that break existing usage).
  - Example: renaming `MetricCardProps.change` to `MetricCardProps.trend`.

### 3) Publishing steps

1. Update `version` in `package.json`.
2. Confirm npm auth:
   - `npm whoami`
   - if needed: `npm login`
3. Publish:
   - `npm publish`
4. Notes:
   - `prepublishOnly` runs `build:lib` automatically.
   - Do not pass `--access public`; `publishConfig.access` already handles this.

### 4) Post-publish verification

1. Confirm the new version is visible on npm for `@handled-ai/design-system`.
2. Validate installation in a consuming app:
   - `pnpm add @handled-ai/design-system@{new-version}`
3. Run the consuming app typecheck to catch API breakage quickly:
   - `tsc --noEmit` (or project equivalent)

### 5) Registry/showcase sync (optional, recommended)

If your changes affect gallery/showcase output:

1. Build registry artifacts:
   - `pnpm run registry:build`
2. Commit updated `public/r/*.json`.
3. Push to `main` (Vercel auto-deploys the showcase site).
4. Keep the channel distinction explicit:
   - npm package is the production distribution channel.
   - registry/Vercel is documentation/showcase/discovery.

## Section 2: Updating Safely (for consuming apps)

### 1) Version pinning policy

- Always pin exact versions in `package.json`.
- Use:
  - `"@handled-ai/design-system": "0.2.0"`
- Avoid:
  - `"@handled-ai/design-system": "^0.2.0"`
- Exact pinning prevents surprise updates during `pnpm install` and lets each app adopt changes on its own schedule.

### 2) Safe update workflow

1. Create an update branch:
   - `chore/design-system-{version}`
2. Install the exact target version:
   - `pnpm add @handled-ai/design-system@{version}`
3. Run typecheck immediately:
   - `tsc --noEmit` (or project equivalent)
4. Perform visual QA on pages that use updated components.
5. Merge only after type + visual checks pass.
6. Other apps remain unaffected until they choose to update.

### 3) Checking what changed

1. Compare old and new versions in the design-system repo commit history.
2. Identify release type (patch/minor/major) and calibrate review depth:
   - patch: targeted regression checks
   - minor: additive API and UI checks
   - major: full migration pass

### 4) Handling breaking changes (major versions)

1. Find all imports:
   - `rg "import.*from ['\"]@handled-ai/design-system['\"]" --type ts --type tsx`
2. Update renamed/removed imports and prop usage.
3. Run full test suite and typecheck before merge.

### 5) Peer dependencies

If the design system introduces or changes peers, install/update them in the consuming app.

Current peer set:

- `react`
- `react-dom`
- `@radix-ui/react-slot`
- `@radix-ui/react-label`
- `@tanstack/react-table`
- `radix-ui`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `date-fns`
- `recharts`
- `@nivo/sankey`
- `@nivo/core`
- `zod`

After dependency updates, check `pnpm install` output for peer warnings.

### 6) Tailwind configuration

- Ensure your app scans built package files:
  - `node_modules/@handled-ai/design-system/dist/**/*.js`
- Components are token-driven (`bg-primary`, `text-muted-foreground`, `border-border`, etc.).
- Consuming apps own token values in their `globals.css` theme variables.
- Do not hard-code colors where semantic tokens already exist.

### 7) Rollback

If an update causes issues:

1. Reinstall previous version:
   - `pnpm add @handled-ai/design-system@{previous-version}`
2. Commit lockfile updates (`pnpm-lock.yaml`) so dependency resolution stays reproducible.

## Section 3: Multi-Project Coordination

### 1) Independence principle

Each consuming app pins its own version and updates independently. Publishing a new package version does not force updates in other apps.

### 2) Rollout pattern

```text
Component change merged to design-system main
-> npm publish with version bump
-> For each consuming app:
   -> Branch: chore/design-system-{version}
   -> pnpm add @handled-ai/design-system@{version}
   -> pnpm typecheck
   -> Visual verification of affected pages
   -> Merge when ready (independently per app)
```

### 3) Divergence policy (intentional eject)

If one app needs deep customization that the shared package should not absorb:

1. Eject that specific component locally with shadcn:
   - `npx shadcn@latest add @handled/{name}`
2. Treat it as intentional divergence.
3. That app now owns maintenance for the local copy.
4. Use this as an exception path, not the default workflow.
