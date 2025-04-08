# First stage: Build
FROM composer:latest AS build

WORKDIR /var/www/api-build

COPY packages/api/composer.json packages/api/composer.lock ./
RUN composer install --no-dev --optimize-autoloader --prefer-dist

COPY packages/api .
RUN composer dump-autoload

# Second stage: Production
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev build-essential \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Create non-root user
RUN groupadd -r www && useradd -r -g www www \
    && chown -R www:www /var/www

# Copy application files
COPY --from=build /var/www/api-build /var/www/api
COPY packages/api/docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set proper permissions
RUN chown -R www:www /var/www/api

# Switch to non-root user
USER www

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8000/health || exit 1

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]