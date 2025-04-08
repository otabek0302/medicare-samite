#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Install Composer dependencies
echo "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# Generate application key if not already set
echo "Generating application key..."
php artisan key:generate

# Clear and cache the configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
echo "Setting permissions..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Create storage link if it doesn't exist
echo "Creating storage link..."
php artisan storage:link

echo "Deployment completed successfully!" 