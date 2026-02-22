#!/bin/bash

# Deployment script for portal.securiverse.com.au
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment for portal.securiverse.com.au..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file with required variables"
    exit 1
fi

# Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker compose down

# Build new image
echo -e "${YELLOW}📦 Building Docker image (this may take a few minutes)...${NC}"
docker compose build --no-cache

# Start containers
echo -e "${YELLOW}🚀 Starting containers...${NC}"
docker compose up -d

# Wait for application to be ready
echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
sleep 15

# Check container status
echo -e "${GREEN}✅ Container Status:${NC}"
docker compose ps

# Show recent logs
echo ""
echo -e "${GREEN}📋 Recent Logs:${NC}"
docker compose logs --tail=30 web

# Test if application is responding
echo ""
echo -e "${YELLOW}🔍 Testing application...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
    echo -e "${GREEN}✅ Application is responding (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}⚠️  Application might not be ready yet (HTTP $HTTP_CODE)${NC}"
    echo "Check logs with: docker-compose logs -f web"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✨ Deployment Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "  1. Visit: https://portal.securiverse.com.au"
echo "  2. Check logs: docker compose logs -f web"
echo "  3. Check status: docker compose ps"
echo ""
echo "🔧 Useful Commands:"
echo "  • View logs: docker compose logs -f web"
echo "  • Restart: docker compose restart"
echo "  • Stop: docker compose down"
echo "  • Status: docker compose ps"
echo "=================================================="
