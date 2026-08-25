<!-- gen-project-docs:start -->
# SETUP - restoring this project

Generated 2026-07-29 by `gen-project-docs.ps1` during a disk cleanup. Everything below is read from this project's own manifest files.

## What was removed

These directories held build output only. **No source file was touched.**

| Directory | Size at deletion |
|---|---|
| `node_modules` | 0.57 GB |
| `.next` | 0.66 GB |
| **Total** | **1.23 GB** |

## Restore

```powershell
cd "C:\Users\austi\OneDrive\Desktop\career\Profile\Portfolio-v1"
pnpm install --frozen-lockfile
```

Lockfile present (`pnpm-lock.yaml`), so this reproduces the **exact** dependency versions that were installed.

## Commands (from `package.json` scripts)

| Script | Runs |
|---|---|
| `pnpm run dev` | `next dev` |
| `pnpm run build` | `next build` |
| `pnpm run start` | `next start` |
| `pnpm run lint` | `next lint` |
| `pnpm run create-project` | `node scripts/create-project.js` |
| `pnpm run validate-projects` | `node scripts/validate-projects.js` |

## Verify

Run `pnpm run build` - it should complete without errors.

