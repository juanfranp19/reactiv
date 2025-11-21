# 2. Instalación y arranque en local

Clonar repositorio y acceder a su directorio.

```bash
git clone https://github.com/juanfranp19/reactiv.git && cd reactiv
```

## API

Desde `reactiv/api/` seguir los siguientes pasos:

1. Instalar las dependencias.

   ```bash
   composer install
   ```

2. Crear archivo de entorno `.env`.

   Duplicar el archivo de ejemplo

   ```bash
   cp .env.example .env
   ```

   > Si estás en Windows y falla, prueba con:  
   > `copy .env.example .env`

3. Generar la clave.

   ```bash
   php artisan key:generate
   ```

4. Configurar la conexión a la base de datos descomentando y completando las siguientes líneas del `.env`.

   Para **PostgreSQL** (por ejemplo):
   ```conf
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=reactiv
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   ```

   Para **MySQL**/**MariaDB** (por ejemplo):
   ```conf
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=reactiv
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

5. Cargar toda la base de datos.

   ```bash
   php artisan load-database
   ```

   > Este comando **es igual** a ejecutar los siguientes:  
   > `php artisan migrate:fresh`  
   > `php artisan db:seed`  
   > `php artisan db:triggers`

6. Crear enlace simbólico para `storage`.

   ```bash
   php artisan storage:link
   ```

7. Iniciar servidor local de Laravel.

   ```bash
   php artisan serve
   ```

## Web

Desde `reactiv/web/` seguir los siguientes pasos:

1. Instalar las dependencias.

   ```bash
   npm install
   ```

2. Crear archivo de entorno `.env`.

   Duplicar el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   > Si estás en Windows y falla, prueba con:  
   > `copy .env.example .env`

3. Arrancar entorno de desarrollo.

   ```bash
   npm run dev
   ```

4. Para el correcto funcionamiento, leer el apartado de [configuración](./3-configuracion.md).

## Acceso

Desde `reactiv/acceso/` seguir los siguientes pasos:

1. Instalar las dependencias.

   ```bash
   npm install
   ```

2. Crear archivo de entorno `.env`.

   Duplicar el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   > Si estás en Windows y falla, prueba con:  
   > `copy .env.example .env`

3. Arrancar entorno de desarrollo.

   ```bash
   npm run dev
   ```

4. Para el correcto funcionamiento, leer el apartado de [configuración](./3-configuracion.md).
