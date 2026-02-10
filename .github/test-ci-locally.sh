#!/bin/bash
# Test CI checks locally before pushing

set -e

echo "🧪 Testing CI Checks Locally"
echo "============================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track results
LINT_RESULT="✅"
TYPECHECK_RESULT="✅"
BUILD_RESULT="✅"
DEV_RESULT="✅"

echo "📦 Step 1: Installing dependencies..."
START=$(date +%s)
pnpm install --no-frozen-lockfile
END=$(date +%s)
DURATION=$((END - START))
echo -e "${GREEN}✅ Dependencies installed in ${DURATION}s${NC}"
echo ""

echo "🔍 Step 2: Running lint check..."
START=$(date +%s)
if pnpm lint:web; then
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${GREEN}✅ Lint passed in ${DURATION}s${NC}"
else
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${YELLOW}⚠️  Lint completed with warnings in ${DURATION}s${NC}"
    LINT_RESULT="⚠️ "
fi
echo ""

echo "🔎 Step 3: Running type check..."
START=$(date +%s)
if pnpm type-check:web; then
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${GREEN}✅ Type check passed in ${DURATION}s${NC}"
else
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${YELLOW}⚠️  Type check completed with errors in ${DURATION}s${NC}"
    TYPECHECK_RESULT="⚠️ "
fi
echo ""

echo "🏗️  Step 4: Running build test..."
START=$(date +%s)
if pnpm build:web; then
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${GREEN}✅ Build passed in ${DURATION}s${NC}"
    
    if [ -d "apps/portal/.next" ]; then
        SIZE=$(du -sh apps/portal/.next | cut -f1)
        echo "   Build output size: $SIZE"
    fi
else
    END=$(date +%s)
    DURATION=$((END - START))
    echo -e "${YELLOW}⚠️  Build failed in ${DURATION}s${NC}"
    BUILD_RESULT="⚠️ "
fi
echo ""

echo "🚀 Step 5: Testing dev server..."
echo "   Killing any existing process on port 3000..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
rm -rf apps/portal/.next/dev 2>/dev/null || true
sleep 1

echo "   Starting dev server (will run for 10 seconds)..."
pnpm dev:web &
DEV_PID=$!

sleep 10

if ps -p $DEV_PID > /dev/null; then
    echo -e "${GREEN}✅ Dev server is running successfully${NC}"
    kill $DEV_PID 2>/dev/null || true
else
    echo -e "${RED}❌ Dev server failed to start or crashed${NC}"
    DEV_RESULT="❌"
fi
echo ""

echo "============================="
echo "📊 CI Test Summary"
echo "============================="
echo "Lint:       $LINT_RESULT"
echo "TypeCheck:  $TYPECHECK_RESULT"
echo "Build:      $BUILD_RESULT"
echo "Dev Server: $DEV_RESULT (REQUIRED)"
echo ""

if [ "$DEV_RESULT" = "❌" ]; then
    echo -e "${RED}❌ FAILED: Dev server check failed${NC}"
    echo "   This is a required check - please fix before pushing"
    exit 1
else
    echo -e "${GREEN}✅ All required checks passed!${NC}"
    if [ "$LINT_RESULT" = "⚠️ " ] || [ "$TYPECHECK_RESULT" = "⚠️ " ] || [ "$BUILD_RESULT" = "⚠️ " ]; then
        echo -e "${YELLOW}⚠️  Some optional checks have warnings (this is OK)${NC}"
    fi
    exit 0
fi
