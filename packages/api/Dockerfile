# Build stage
FROM composer:latest AS build

WORKDIR /var/www/api

# Copy only necessary files first for faster build
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the project files
COPY . .

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
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium

# Copy files from the build stage
COPY --from=build /var/www/api /var/www/api

# Expose port 8000
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]