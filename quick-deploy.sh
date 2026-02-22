#!/bin/bash

# Fast deployment - doesn't rebuild from scratch
# Use this for quick restarts

set -e

echo "⚡ Quick deployment for portal.securiverse.com.au..."
echo "=================================================="

# Stop existing containers
echo "🛑 Stopping containers..."
docker compose down

# Start containers (uses existing image if available)
echo "🚀 Starting containers..."
docker compose up -d

# Wait for startup
echo "⏳ Waiting for startup..."
sleep 5

# Check status
echo ""
echo "✅ Container Status:"
docker compose ps

echo ""
echo "📋 Recent Logs:"
docker compose logs --tail=20 web

echo ""
echo "=================================================="
echo "✨ Quick deployment complete!"
echo "🌐 Visit: https://portal.securiverse.com.au"
echo ""
echo "View logs: docker compose logs -f web"
echo "=================================================="
