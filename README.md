# Instagram Tools - Sistema Integrado

Este proyecto integra el Dashboard Web y el Scraper de Instagram en un sistema unificado usando Docker Compose.

## 🏗️ Arquitectura

```
Instagram Tools/
├── dashboard_web/          # Dashboard principal
├── scraper/               # Scraper con backend Django y frontend SvelteKit
├── docker-compose.yaml    # Configuración principal
├── nginx.conf            # Proxy reverso
└── env.example           # Variables de entorno
```

## 🚀 Servicios

### App Shell (Integradora Principal)
- **Puerto**: 3000
- **URL**: http://localhost:3000
- **Descripción**: Aplicación integradora con navegación unificada

### Dashboard Web
- **Puerto**: 5174
- **URL**: http://localhost:5174
- **Descripción**: Dashboard con visualización de datos

### Scraper Backend (API)
- **Puerto**: 8000
- **URL**: http://localhost:8000
- **Admin**: http://localhost:8000/admin/
- **Descripción**: API Django para scraping de Instagram

### Scraper Frontend (Opcional)
- **Puerto**: 5173
- **URL**: http://localhost:5173
- **Perfil**: scraper-ui
- **Descripción**: Interfaz independiente del scraper

### Nginx (Producción)
- **Puerto**: 80
- **URL**: http://localhost
- **Perfil**: production
- **Descripción**: Proxy reverso para producción

## 📋 Comandos de Uso

### Configuración Inicial
```bash
# Copiar variables de entorno
cp env.example .env

# Editar configuración si es necesario
nano .env
```

### Desarrollo (Dashboard + Backend)
```bash
# Iniciar servicios principales
docker compose up -d

# Ver logs
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f dashboard
docker compose logs -f scraper-backend
```

### Desarrollo Completo (incluye Scraper Frontend)
```bash
# Iniciar todos los servicios incluyendo scraper frontend
docker compose --profile scraper-ui up -d
```

### Producción (con Nginx)
```bash
# Iniciar con proxy reverso
docker compose --profile production up -d
```

### Gestión de Contenedores
```bash
# Detener servicios
docker compose down

# Reconstruir imágenes
docker compose build

# Reconstruir y reiniciar
docker compose up --build -d

# Limpiar volúmenes
docker compose down -v
```

## 🔗 Conexiones

### Dashboard → Scraper Backend
- El dashboard se conecta al backend del scraper via `VITE_SCRAPER_API_URL`
- URL interna: `http://scraper-backend:8000`
- URL externa: `http://localhost:8000`

### Scraper Frontend → Scraper Backend
- El frontend del scraper se conecta a su propio backend
- URL interna: `http://scraper-backend:8000`
- URL externa: `http://localhost:8000`

## 🌐 URLs de Acceso

### Desarrollo
- **App Shell (Principal)**: http://localhost:3000
- **Dashboard**: http://localhost:5174
- **Scraper Backend API**: http://localhost:8000
- **Scraper Admin**: http://localhost:8000/admin/
- **Scraper Frontend**: http://localhost:5173 (con perfil scraper-ui)

### Producción (con Nginx)
- **Dashboard**: http://localhost
- **API**: http://localhost/api/
- **Admin**: http://localhost/admin/
- **Scraper UI**: http://localhost/scraper/

## 📁 Variables de Entorno

### Dashboard
- `VITE_SCRAPER_API_URL`: URL del backend del scraper

### Scraper Backend
- `DEBUG`: True/False
- `SECRET_KEY`: Clave secreta de Django
- `CORS_ALLOWED_ORIGINS`: Orígenes permitidos para CORS
- `DATABASE_URL`: URL de la base de datos
- `TIME_ZONE`: Zona horaria
- `LANGUAGE_CODE`: Código de idioma

### Scraper Frontend
- `VITE_API_URL`: URL del backend
- `NODE_ENV`: Entorno de Node.js

## 🔧 Perfiles Disponibles

### `scraper-ui`
Incluye el frontend del scraper:
```bash
docker compose --profile scraper-ui up -d
```

### `production`
Incluye Nginx como proxy reverso:
```bash
docker compose --profile production up -d
```

## 📊 Volúmenes

- `scraper_backend_data`: Base de datos del scraper
- `scraper_frontend_svelte_kit`: Archivos generados por SvelteKit

## 🌐 Redes

- `instagram-network`: Red interna para comunicación entre servicios

## 🔍 Troubleshooting

### Si el dashboard no puede conectar con el scraper:
1. Verifica que el scraper-backend esté corriendo: `docker compose logs scraper-backend`
2. Verifica la variable `VITE_SCRAPER_API_URL` en el dashboard
3. Asegúrate de que CORS esté configurado correctamente

### Si hay problemas con CORS:
1. Verifica que `CORS_ALLOWED_ORIGINS` incluya las URLs correctas
2. Reinicia el contenedor del backend: `docker compose restart scraper-backend`

### Para reiniciar desde cero:
```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

## 🚀 Próximos Pasos

1. **Configurar el dashboard** para usar la API del scraper
2. **Implementar autenticación** entre servicios
3. **Configurar SSL** para producción
4. **Agregar monitoreo** y logs centralizados 