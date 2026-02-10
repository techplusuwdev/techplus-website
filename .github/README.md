# GitHub Actions CI/CD

This directory contains automated workflows for continuous integration and deployment.

## 📋 Workflows

### 1. CI Tests (`ci.yml`)
Runs on every push and pull request to main, staging, and develop branches.

**Jobs:**
- **Lint Check** ⚠️ (continue on error)
  - Runs ESLint on the codebase
  - Reports time taken
  - Does not fail the pipeline

- **Type Check** ⚠️ (continue on error)
  - Runs TypeScript compiler in check mode
  - Reports time taken
  - Does not fail the pipeline

- **Build Test** ⚠️ (continue on error)
  - Runs production build
  - Measures build time
  - Verifies output directory exists
  - Does not fail the pipeline

- **Dev Server Check** ✅ (REQUIRED)
  - Starts development server
  - Verifies it runs without crashing
  - **This MUST pass for CI to succeed**

- **Summary**
  - Reports overall results
  - Only fails if dev server check fails

### 2. Performance Tests (`performance.yml`)
Runs on pushes and PRs to main branch.

**Analysis:**
- Dependency installation time
- Cold build time (no cache)
- Warm build time (with cache)
- Cache speedup calculation
- Build output size
- File count analysis

## 🎯 Philosophy

Our CI/CD follows a **pragmatic approach**:

### ✅ Must Pass
- Dev server starts without errors

### ⚠️  Optional (informational only)
- Linting (may have warnings)
- Type checking (may have errors being fixed)
- Build (may fail during development)

This allows development to continue while providing visibility into code quality metrics.

## 🚀 Running Locally

Test the same checks locally before pushing:

```bash
# Lint check
pnpm lint:web

# Type check
pnpm type-check:web

# Build test
pnpm build:web

# Dev server check
pnpm dev:web
```

## 📊 CI Status

Add this badge to your README.md:

```markdown
![CI Tests](https://github.com/YOUR_USERNAME/techplus-website/workflows/CI%20Tests/badge.svg)
```

## 🔧 Configuration

### Environment Variables
No secrets required - all tests run without external dependencies.

### Node Version
- **Required:** Node.js 22+
- Uses pnpm 9 for package management

### Cache Strategy
- pnpm cache is enabled for faster installs
- Turbo cache speeds up subsequent builds

## 📝 Adding New Checks

To add a new check:

1. Add the job to `.github/workflows/ci.yml`
2. Set `continue-on-error: true` if optional
3. Add timing measurements:
   ```yaml
   - name: Run check
     run: |
       START_TIME=$(date +%s)
       your-command-here
       END_TIME=$(date +%s)
       DURATION=$((END_TIME - START_TIME))
       echo "✅ Check completed in ${DURATION}s"
   ```
4. Update the summary job's `needs` array

## 🐛 Troubleshooting

### Dev server check fails
- Check that all dependencies are installed correctly
- Verify environment variables if needed
- Look for syntax errors in the code

### Build fails but dev works
- This is expected! Build errors don't fail CI
- Check the build logs for warnings
- Fix at your convenience

### Workflows not running
- Check that the branch name matches the trigger
- Verify `.github/workflows/` is committed
- Check GitHub Actions tab for errors

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [pnpm with GitHub Actions](https://pnpm.io/continuous-integration#github-actions)
- [Turborepo CI Documentation](https://turbo.build/repo/docs/ci)
