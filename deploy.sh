#!/bin/bash

# Siruvapuri Deployment Script for EC2
# Run this script on your EC2 instance after uploading files

set -e

echo "=== Siruvapuri Deployment Script ==="

# Variables
APP_DIR="/var/www/siruvapuri"
DOMAIN="siruvapuri.webexcel.in"

# Create directories
echo "Creating directories..."
sudo mkdir -p $APP_DIR/client
sudo mkdir -p $APP_DIR/server
sudo mkdir -p /var/log/pm2

# Set ownership
sudo chown -R $USER:$USER $APP_DIR
sudo chown -R $USER:$USER /var/log/pm2

echo "=== Step 1: Enable Apache modules ==="
sudo a2enmod rewrite proxy proxy_http headers deflate ssl
sudo systemctl restart apache2

echo "=== Step 2: Copy Apache config ==="
sudo cp siruvapuri.webexcel.in.conf /etc/apache2/sites-available/
sudo a2ensite siruvapuri.webexcel.in.conf

echo "=== Step 3: Get SSL certificate (run this first without SSL in config) ==="
echo "If SSL cert doesn't exist yet, run:"
echo "  sudo certbot --apache -d $DOMAIN"

echo "=== Step 4: Copy files ==="
echo "Copy client/dist/* to $APP_DIR/client/"
echo "Copy server/* to $APP_DIR/server/"

echo "=== Step 5: Install server dependencies ==="
cd $APP_DIR/server
npm install --production

echo "=== Step 6: Copy production .env ==="
cp .env.production .env

echo "=== Step 7: Start with PM2 ==="
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "=== Step 8: Restart Apache ==="
sudo systemctl restart apache2

echo "=== Deployment Complete! ==="
echo "Visit: https://$DOMAIN"
