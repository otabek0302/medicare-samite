# Build stage
FROM composer:latest AS build

WORKDIR /var/www/api

# Copy ALL project files first
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Production stage
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libsodium-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium

# Copy the build files
COPY --from=build /var/www/api /var/www/api

# Expose port 8000
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]