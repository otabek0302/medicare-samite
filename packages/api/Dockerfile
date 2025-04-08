# First stage: Build PHP dependencies
FROM composer:latest AS build

WORKDIR /var/www/api-build

# Copy only composer files first for caching
COPY packages/api/composer.json packages/api/composer.lock ./

# Install dependencies without running scripts (no artisan yet)
RUN composer install --no-dev --optimize-autoloader --prefer-dist --no-scripts

# Copy the rest of the application
COPY packages/api .

# Now regenerate optimized autoloader
RUN composer dump-autoload
RUN composer install --no-dev --optimize-autoloader --prefer-dist

# Second stage: Production PHP-FPM
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev build-essential \
    supervisor curl && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Create non-root user for better security
RUN groupadd -r www && useradd -r -g www www

# Copy application from build stage
COPY --from=build /var/www/api-build /var/www/api
COPY packages/api/docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Fix ownership and permissions
RUN chown -R www:www /var/www/api

# Switch to non-root user
USER www

# Expose API port
EXPOSE 8000

# Health check - checks if server responds
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8000 || exit 1

# Start supervisor to manage PHP server
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]