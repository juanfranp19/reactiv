# 3. Archivos de configuración

Cada parte tiene su archivo de entorno `.env` donde se encuantra la configuración necesaria para su funcionamiento:

## API

> Archivo en [`api/.env.example`](../api/.env.example)

### Configuración de la API
```conf
APP_NAME=Reactiv                # Nombre de la API
APP_ENV=local                   # Entorno de ejecución
APP_KEY=                        # Clave de seguridad de Laravel
APP_DEBUG=true                  # Laravel muestra errores en el navegador
APP_URL=http://localhost:8000   # URL de la API
```

### Localización y traducciones

```conf
APP_LOCALE=es
APP_FALLBACK_LOCALE=es
APP_FAKER_LOCALE=es_ES
```

### Mantenimientos y servidor PHP

```conf
APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4
```

### Seguridad y logs

```conf
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug
```

### Base de datos

```conf
DB_CONNECTION=pgsql
DB_PORT=5432
DB_HOST=127.0.0.1
DB_DATABASE=reactiv
DB_USERNAME=username
DB_PASSWORD=password
```

### Sesiones y caché

```conf
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

CACHE_STORE=database
```

### Datos de prueba (número de socios y entrenadores)

```conf
FACTORY_SOCIOS_NUM=100
FACTORY_ENTRENADORES_NUM=3
```

### Datos de administrador (solo útil en producción)

```conf
ADMIN_USERNAME=admin_username
ADMIN_PASSWORD=admin_password
ADMIN_NOMBRE=Admin
ADMIN_EMAIL=admin@reactv.fit
ADMIN_TELEFONO=999999999
```

## Web

> Archivo en [`web/.env.example`](../web/.env.example)

```conf
# URL de la aplicación de acceso
VITE_ACCESO_URL=http://localhost:5174

# URL de la API
VITE_API_URL=http://localhost:8000
```

## Acceso

> Archivo en [`acceso/.env.example`](../acceso/.env.example)


```conf
# URL de la API de accesos
VITE_API_URL_ACCESOS=http://localhost:8000/api/v1/accesos

# URL de la web principal (en este caso el dashboard)
VITE_WEB_URL=http://localhost:5173/dashboard
```
