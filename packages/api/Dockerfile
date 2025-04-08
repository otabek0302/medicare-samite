# First stage: Build
FROM composer:latest AS build

WORKDIR /var/www/api-build

# Copy composer.json and composer.lock from the right location
COPY packages/api/composer.json packages/api/composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --prefer-dist

# Then copy the entire API project
COPY packages/api .

# Second stage: Production
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    zip \
    unzip \
    libmagic-dev \
    libsodium-dev \
    build-essential

# Install PHP extensions
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Copy the built application
COPY --from=build /var/www/api-build /var/www/api

# Expose port 8000
EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000"]