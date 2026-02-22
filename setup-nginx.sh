#!/bin/bash

# Simple nginx setup script for portal.securiverse.com.au
# This script sets up nginx and then adds SSL

set -e

echo "🔧 Setting up Nginx for portal.securiverse.com.au"
echo "=================================================="

# Remove old symlink if exists
if [ -L /etc/nginx/sites-enabled/portal.securiverse.com.au ]; then
    echo "Removing old configuration..."
    sudo rm /etc/nginx/sites-enabled/portal.securiverse.com.au
fi

# Copy nginx config
echo "📋 Copying nginx configuration..."
sudo cp nginx.conf /etc/nginx/sites-available/portal.securiverse.com.au

# Create symlink
echo "🔗 Creating symlink..."
sudo ln -sf /etc/nginx/sites-available/portal.securiverse.com.au /etc/nginx/sites-enabled/

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Reload nginx
    echo "🔄 Reloading nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully"
    
    # Check nginx status
    if sudo systemctl is-active --quiet nginx; then
        echo "✅ Nginx is running"
    else
        echo "⚠️  Starting nginx..."
        sudo systemctl start nginx
    fi
    
    echo ""
    echo "=================================================="
    echo "✅ Nginx setup complete!"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Make sure your Docker container is running: docker compose ps"
    echo "  2. Test HTTP: curl -I http://portal.securiverse.com.au"
    echo "  3. Add SSL with: sudo certbot --nginx -d portal.securiverse.com.au"
    echo ""
    echo "🌐 Your site should now be accessible at:"
    echo "   http://portal.securiverse.com.au (will upgrade to HTTPS after certbot)"
    echo "=================================================="
else
    echo "❌ Nginx configuration test failed!"
    echo "Please check the error messages above."
    exit 1
fi
