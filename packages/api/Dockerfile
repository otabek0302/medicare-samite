# Build stage
FROM composer:latest AS build

WORKDIR /var/www/api

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Production stage
FROM php:8.2-fpm

WORKDIR /var/www/api

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev curl

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium

# Copy application files
COPY --from=build /var/www/api /var/www/api

EXPOSE 8000

CMD ["php-fpm"]