# First stage: Build
FROM composer:latest AS build

WORKDIR /var/www/api-build

COPY packages/api/composer.json packages/api/composer.lock ./
RUN composer install --no-dev --optimize-autoloader --prefer-dist --no-scripts
COPY packages/api .

# Second stage: Production
FROM php:8.2-fpm

WORKDIR /var/www/api

RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev libzip-dev \
    libonig-dev zip unzip libmagic-dev libsodium-dev build-essential

RUN docker-php-ext-install gd pdo pdo_mysql bcmath ctype fileinfo mbstring xml zip sodium
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

COPY --from=build /var/www/api-build /var/www/api

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000"]