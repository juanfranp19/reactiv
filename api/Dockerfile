# Usa la imagen de PHP 8.2 con Apache
FROM php:8.2-apache

# Instala las dependencias del sistema y extensiones necesarias para Laravel y PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql

# Habilita mod_rewrite de Apache
RUN a2enmod rewrite

# Cambia el DocumentRoot de Apache a /var/www/html/public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Copia los archivos de la app
COPY . /var/www/html

WORKDIR /var/www/html

# Instala Composer globalmente copiándolo desde la imagen oficial de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instala dependencias de PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Crea el enlace simbólico de storage
RUN php artisan storage:link

# Da permisos a todo el directorio y especialmente a storage y bootstrap/cache
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

EXPOSE 80

# Comando por defecto para iniciar PHP-FPM
CMD ["apache2-foreground"]
