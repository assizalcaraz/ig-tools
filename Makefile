# Makefile para Instagram Tools
# Comandos de desarrollo y producción

.PHONY: help up-dev down logs ps build clean rebuild fresh-build

# Comando por defecto
help:
	@echo "🚀 Instagram Tools - Comandos disponibles:"
	@echo ""
	@echo "📋 Desarrollo:"
	@echo "  make up-dev      - Inicia en modo desarrollo (App Shell + todos los módulos)"
	@echo "  make build       - Construye todas las imágenes Docker"
	@echo "  make rebuild     - Reconstruye todas las imágenes sin cache"
	@echo "  make fresh-build - Build completo con npm install y reconstrucción"
	@echo ""
	@echo "🔧 Gestión:"
	@echo "  make down        - Detiene todos los servicios"
	@echo "  make logs        - Muestra logs en tiempo real"
	@echo "  make ps          - Muestra estado de los servicios"
	@echo "  make clean       - Limpia contenedores y volúmenes"
	@echo ""
	@echo "🌐 URLs disponibles:"
	@echo "  App Shell: http://localhost:3000"
	@echo "  Dashboard: http://localhost:5174"
	@echo "  Scraper: http://localhost:5173/scraper"
	@echo "  API Scraper: http://localhost:8000"

# Inicio rápido en modo desarrollo
up-dev:
	@echo "🚀 Iniciando Instagram Tools en modo desarrollo..."
	@echo "📋 Perfiles: App Shell + Dashboard + Scraper"
	@docker compose --profile shell --profile dashboard --profile scraper --profile scraper-ui up -d
	@echo ""
	@echo "✅ Servicios iniciados correctamente!"
	@echo ""
	@echo "🌐 URLs disponibles:"
	@echo "   App Shell: http://localhost:3000"
	@echo "   Dashboard: http://localhost:5174"
	@echo "   Scraper: http://localhost:5173/scraper"
	@echo "   API Scraper: http://localhost:8000"

# Detener servicios
down:
	@echo "🛑 Deteniendo servicios..."
	@docker compose down
	@echo "✅ Servicios detenidos"

# Ver logs
logs:
	@echo "📋 Mostrando logs en tiempo real..."
	@docker compose logs -f

# Estado de servicios
ps:
	@echo "📊 Estado de los servicios:"
	@docker compose ps

# Construir imágenes
build:
	@echo "🔨 Construyendo todas las imágenes..."
	@docker compose build --no-cache
	@echo "✅ Imágenes construidas"

# Reconstruir sin cache
rebuild:
	@echo "🔄 Reconstruyendo todas las imágenes sin cache..."
	@docker compose build --no-cache
	@echo "✅ Reconstrucción completada"

# Build completo con npm install
fresh-build:
	@echo "🧹 Limpiando contenedores anteriores..."
	@docker compose down -v
	@docker system prune -f
	@echo ""
	@echo "📦 Instalando dependencias y construyendo..."
	@echo "   - Dashboard..."
	@docker run --rm -v $(PWD)/dashboard_web:/app -w /app node:18 npm install
	@echo "   - Scraper Frontend..."
	@docker run --rm -v $(PWD)/scraper/frontend:/app -w /app node:18 npm install
	@echo "   - App Shell..."
	@docker run --rm -v $(PWD)/app-shell:/app -w /app node:18 npm install
	@echo ""
	@echo "🔨 Construyendo imágenes Docker..."
	@docker compose build --no-cache
	@echo ""
	@echo "🚀 Iniciando servicios..."
	@docker compose --profile shell --profile dashboard --profile scraper --profile scraper-ui up -d
	@echo ""
	@echo "✅ Build completo finalizado!"
	@echo ""
	@echo "🌐 URLs disponibles:"
	@echo "   App Shell: http://localhost:3000"
	@echo "   Dashboard: http://localhost:5174"
	@echo "   Scraper: http://localhost:5173/scraper"
	@echo "   API Scraper: http://localhost:8000"

# Limpiar todo
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	@docker compose down -v
	@docker system prune -f
	@echo "✅ Limpieza completada" 