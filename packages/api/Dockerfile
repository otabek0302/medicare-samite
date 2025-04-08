# Build stage
FROM composer:latest AS build

WORKDIR /var/www/api

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy the full source code
COPY . .

# Production stage
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install PHP system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev curl

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium

# Copy code from build stage
COPY --from=build /var/www/api /var/www/api

# Expose port
EXPOSE 8000

# Run Laravel server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]