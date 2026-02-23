import path from "node:path"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  dts: { tsconfig: "tsconfig.build.json" },
  outDir: "dist",
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  splitting: false,
  bundle: true,
  esbuildOptions(options) {
    const root = path.resolve(__dirname)
    options.alias = {
      "@/lib/utils": path.join(root, "lib/utils.ts"),
      "@/hooks/use-mobile": path.join(root, "hooks/use-mobile.ts"),
      "@/registry/new-york/ui/button": path.join(root, "registry/new-york/ui/button.tsx"),
    }
  },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@radix-ui/react-slot",
    "@radix-ui/react-label",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "date-fns",
    "recharts",
    "zod",
    "radix-ui",
  ],
})
