# 🚀 Quick Start - Deploy in 2 Commands

## Just run these 2 commands and everything works:

### 1. Start Docker (builds and runs your app)
```bash
./deploy.sh
```

### 2. Setup Nginx with SSL
```bash
./setup-nginx.sh
sudo certbot --nginx -d portal.securiverse.com.au
```

---

## ✅ That's it! Your site is now live at:
- 🌐 **https://portal.securiverse.com.au**

---

## 📋 Useful Commands

### Docker Management
```bash
# View logs
docker compose logs -f web

# Check status
docker compose ps

# Restart
docker compose restart

# Stop
docker compose down

# Rebuild (after code changes)
docker compose down && docker compose build --no-cache && docker compose up -d
```

### Nginx Management
```bash
# Check nginx status
sudo systemctl status nginx

# Reload nginx (after config changes)
sudo systemctl reload nginx

# Test nginx config
sudo nginx -t

# View nginx logs
sudo tail -f /var/log/nginx/portal.securiverse.com.au-error.log
```

### SSL Certificate Management
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates (auto-renewal is already set up)
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🔍 Troubleshooting

### If Docker fails to start:
```bash
# Check Docker is running
sudo systemctl status docker

# View detailed logs
docker compose logs web

# Rebuild from scratch
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

### If Certbot fails:
1. Make sure your domain DNS points to this server: `dig portal.securiverse.com.au`
2. Make sure nginx is running: `sudo systemctl status nginx`
3. Make sure port 80 is not blocked by firewall
4. Try again: `sudo certbot --nginx -d portal.securiverse.com.au`

### If site is not accessible:
```bash
# Check if Docker container is running
docker compose ps

# Check if nginx is running
sudo systemctl status nginx

# Check nginx error logs
sudo tail -f /var/log/nginx/portal.securiverse.com.au-error.log

# Check Docker logs
docker compose logs -f web

# Test local connection
curl -I http://localhost:3000
```

---

## 🎯 What Each Script Does

### `./deploy.sh`
- Stops old Docker containers
- Builds fresh Docker image with your latest code
- Starts containers in background
- Shows status and logs

### `./setup-nginx.sh`
- Copies nginx config to correct location
- Tests nginx configuration
- Reloads nginx
- Prepares for SSL setup

### `sudo certbot --nginx -d portal.securiverse.com.au`
- Gets free SSL certificate from Let's Encrypt
- Automatically configures nginx for HTTPS
- Sets up auto-renewal
- Redirects HTTP to HTTPS

---

## 📝 Configuration Files

- **`.env`** - Environment variables (API URL, Google OAuth)
- **`docker-compose.yml`** - Docker container configuration
- **`nginx.conf`** - Nginx reverse proxy configuration
- **`Dockerfile`** - Docker image build instructions

---

## 🔐 Environment Variables

Make sure your `.env` file has:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.securiverse.com.au
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## ✨ All Features Configured

✅ HTTPS with free SSL certificate  
✅ Secure WebSocket (wss://)  
✅ Docker deployment  
✅ Nginx reverse proxy  
✅ Auto-redirect HTTP → HTTPS  
✅ SSL certificate auto-renewal  
✅ Gzip compression  
✅ Security headers  
✅ Static file caching  

---

## 🆘 Need Help?

If something goes wrong:
1. Check Docker logs: `docker compose logs -f web`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/portal.securiverse.com.au-error.log`
3. Check if services are running: `docker compose ps` and `sudo systemctl status nginx`
4. Verify DNS: `dig portal.securiverse.com.au`
