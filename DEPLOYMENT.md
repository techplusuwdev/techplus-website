# Vercel Deployment Guide

## Configuration

The project is configured for Vercel deployment with the following settings:

### vercel.json

```json
{
  "buildCommand": "npx turbo run build --filter=@apps/portal",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "outputDirectory": "apps/portal/.next"
}
```

### Key Settings

1. **Build Command**: `npx turbo run build --filter=@apps/portal`
   - This runs the Turborepo build for the portal app directly
   - Uses `npx` to ensure turbo is available in Vercel environment

2. **Install Command**: `pnpm install --no-frozen-lockfile`
   - Required because we're in a monorepo and lockfile may differ
   - Ensures all dependencies are installed correctly

3. **Output Directory**: `apps/portal/.next`
   - Points to the Next.js build output in the portal app
   - Required for monorepo structure

4. **Root Directory**: Should be set to repository root (not `apps/portal`)
   - Vercel needs access to the full monorepo for Turborepo to work

## Vercel Project Settings

In your Vercel project dashboard, ensure these settings:

### General Settings

**CRITICAL**: Make sure these are set correctly in Vercel dashboard:

- **Framework Preset**: Next.js
- **Root Directory**: **LEAVE EMPTY** or set to `.` (DO NOT set to `apps/portal`)
- **Build Command**: Leave empty (uses vercel.json)
- **Output Directory**: Leave empty (uses vercel.json)
- **Install Command**: Leave empty (uses vercel.json)

**Why this matters**: If you set Root Directory to `apps/portal`, Vercel will look for the output at `apps/portal/apps/portal/.next` (duplicated path), which causes the "output directory not found" error.

### Environment Variables
Add these to your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FLAGSMITH_ENV_KEY=your_flagsmith_key
```

## Turborepo Configuration

The `turbo.json` defines build outputs:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```

This tells Turborepo to cache the `.next` directory (excluding cache folder) for faster builds.

## Troubleshooting

### Error: Output directory not found at `/vercel/path0/apps/portal/apps/portal/.next`

**Problem**: Path is duplicated - looking in `apps/portal/apps/portal/.next` instead of `apps/portal/.next`

**Root Cause**: The **Root Directory** setting in Vercel dashboard is set to `apps/portal`, causing Vercel to look for the output directory relative to that path.

**Solution**:
1. Go to your Vercel project → **Settings** → **General**
2. Find **Root Directory** setting
3. **CLEAR IT COMPLETELY** or set it to `.` (just a dot)
4. Click **Save**
5. Redeploy

**Verification**:
- Root Directory: ` ` (empty) or `.`
- Output Directory: Leave empty (will use `apps/portal/.next` from vercel.json)
- Build Command: Leave empty (will use vercel.json)

### Error: Frozen lockfile

**Problem**: `Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date`

**Solution**:
- Use `pnpm install --no-frozen-lockfile` in vercel.json
- Or commit updated `pnpm-lock.yaml` to git

### Error: Command "build:web" not found

**Problem**: `ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL Command "build:web" not found`

**Solution**:
- Use `npx turbo run build --filter=@apps/portal` instead of `pnpm build:web`
- The workspace scripts in root `package.json` aren't available in Vercel's build context
- Using `npx turbo` directly ensures the command works in any environment

### Build fails with Turbopack error

**Problem**: Next.js 16 Turbopack errors

**Solution**:
- Ensure `turbopack: {}` is in `next.config.ts`
- Remove any custom webpack configs

## Manual Deployment

To deploy manually:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy from root directory
vercel --prod
```

## CI/CD Pipeline

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

Each deployment runs:
1. `pnpm install --no-frozen-lockfile`
2. `npx turbo run build --filter=@apps/portal` (runs Turbo build for portal)
3. Next.js build in `apps/portal`
4. Deploy `.next` directory

## Build Time Optimization

Turborepo caches builds between deployments for faster CI:
- First build: ~2-3 minutes
- Cached builds: ~30 seconds - 1 minute
- Only rebuilds changed packages

## Next Steps After Deployment

1. ✅ Verify environment variables are set
2. ✅ Test authentication flow (Supabase)
3. ✅ Check API routes work
4. ✅ Test calendar, team pages
5. ✅ Verify signup forms work
6. ✅ Check admin dashboard (if applicable)
