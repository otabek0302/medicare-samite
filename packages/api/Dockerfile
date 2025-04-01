# First stage: Build
FROM composer:latest AS build

# Set the working directory
WORKDIR /var/www/api-build

# Copy the application code
COPY . .

# Install application dependencies
RUN composer install --no-dev --optimize-autoloader

# Second stage: Production
FROM php:8.2-fpm

# Set the working directory
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

# Install PHP extensions one by one
RUN docker-php-ext-install gd
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install ctype
RUN docker-php-ext-install fileinfo
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install xml
RUN docker-php-ext-install zip
RUN docker-php-ext-install sodium

# Configure and install GD separately
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Copy the application code from the build stage
COPY --from=build /var/www/api-build /var/www/api

# Expose port 8000 and start php-fpm server
EXPOSE 8000

CMD ["php", "-S", "localhost:8000"]