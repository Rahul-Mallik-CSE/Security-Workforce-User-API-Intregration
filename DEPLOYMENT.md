# Deployment Guide for portal.securiverse.com.au

## ✅ Configuration Completed

All HTTPS and domain configurations have been updated:

### Updated Files:
1. ✅ **ChatWindow.tsx** - WebSocket using `wss://api.securiverse.com.au`
2. ✅ **ChatLayout.tsx** - WebSocket using `wss://api.securiverse.com.au` (FIXED)
3. ✅ **next.config.ts** - Image domains using HTTPS
4. ✅ **utils.ts** - Fallback API URL using HTTPS
5. ✅ **ReferralModal.tsx** - Using `https://portal.securiverse.com.au`
6. ✅ **.env** - Already configured with `https://api.securiverse.com.au`

### WebSocket Configuration ✅
- **ChatWindow.tsx**: `wss://api.securiverse.com.au/ws/asc/update_chat_messages/`
- **ChatLayout.tsx**: `wss://api.securiverse.com.au/ws/asc/update_chat_messages/`
- Both are using secure WebSocket (wss://) with proper domain

---

## 🚀 Deployment Steps

### 1. SSL Certificate Setup

First, install Certbot for free SSL certificates:

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d portal.securiverse.com.au

# Auto-renewal (Certbot sets this up automatically)
sudo certbot renew --dry-run
```

### 2. Nginx Configuration

```bash
# Copy the nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/portal.securiverse.com.au

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/portal.securiverse.com.au /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

If using Certbot, it will automatically update the SSL certificate paths in your nginx config.

### 3. Update Environment Variables

Make sure your `.env` file has:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.securiverse.com.au
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### 4. Build and Run Docker Container

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up -d

# Check logs
docker-compose logs -f
```

### 5. Verify Deployment

Check that everything is running:

```bash
# Check Docker container
docker-compose ps

# Check Nginx status
sudo systemctl status nginx

# Check application logs
docker-compose logs -f web

# Test HTTPS
curl -I https://portal.securiverse.com.au
```

---

## 🔧 Alternative: Using Certbot Standalone (Without Manual Nginx Config)

If you want Certbot to handle everything automatically:

```bash
# Stop nginx temporarily
sudo systemctl stop nginx

# Get certificate with standalone mode
sudo certbot certonly --standalone -d portal.securiverse.com.au

# Start nginx
sudo systemctl start nginx

# Or let Certbot configure nginx automatically
sudo certbot --nginx -d portal.securiverse.com.au
```

---

## 🔥 Quick Deploy Script

```bash
#!/bin/bash

# Quick deployment script
echo "🚀 Deploying portal.securiverse.com.au..."

# Pull latest changes (if using git)
# git pull origin main

# Build and restart containers
echo "📦 Building Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check status
echo "✅ Checking status..."
docker-compose ps

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=50 web

echo "✨ Deployment complete!"
echo "🌐 Visit: https://portal.securiverse.com.au"
```

---

## 📝 Google OAuth Update

Don't forget to update your Google OAuth settings:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add to **Authorized JavaScript origins**:
   - `https://portal.securiverse.com.au`
6. Add to **Authorized redirect URIs**:
   - `https://portal.securiverse.com.au`

---

## 🔍 Troubleshooting

### WebSocket Connection Issues
If WebSocket fails to connect:
```bash
# Check if API server supports WebSocket
curl -I https://api.securiverse.com.au

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check application logs
docker-compose logs -f web
```

### SSL Certificate Issues
```bash
# Test SSL certificate
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Check certificate details
openssl s_client -connect portal.securiverse.com.au:443 -servername portal.securiverse.com.au
```

### Container Not Starting
```bash
# Check Docker logs
docker-compose logs web

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎯 Post-Deployment Checklist

- [ ] HTTPS is working on `https://portal.securiverse.com.au`
- [ ] HTTP redirects to HTTPS
- [ ] WebSocket connections are working (check chat functionality)
- [ ] Google OAuth login works
- [ ] Images load correctly from API
- [ ] SSL certificate is valid and not expired
- [ ] Auto-renewal is set up for SSL certificate

---

## 📞 Support

If you encounter any issues:
1. Check nginx logs: `/var/log/nginx/portal.securiverse.com.au-error.log`
2. Check application logs: `docker-compose logs -f web`
3. Verify DNS points to your server: `dig portal.securiverse.com.au`
4. Test API connectivity: `curl https://api.securiverse.com.au`
