# First stage: Build dependencies
FROM composer:latest AS build

WORKDIR /var/www/api-build

COPY packages/api/composer.json packages/api/composer.lock ./
RUN composer install --no-dev --optimize-autoloader --prefer-dist

COPY packages/api .

RUN composer dump-autoload

# Final production stage
FROM php:8.2-cli

WORKDIR /var/www/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev build-essential curl

# Install PHP extensions
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Copy built app from previous stage
COPY --from=build /var/www/api-build /var/www/api

# Expose port 8000
EXPOSE 8000

# Start simple PHP server
CMD ["php", "-S", "0.0.0.0:8000", "index.php"]