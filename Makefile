.PHONY: up-dev down logs ps build clean help

# Variables
SHELL := /bin/bash

# Comando principal para desarrollo
up-dev:
	@echo "🚀 Iniciando Instagram Tools en modo desarrollo..."
	@echo "📋 Perfiles: App Shell + Dashboard + Scraper"
	@echo ""
	docker compose --profile shell --profile dashboard --profile scraper --profile scraper-ui up -d
	@echo ""
	@echo "✅ Servicios iniciados correctamente!"
	@echo ""
	@echo "🌐 URLs disponibles:"
	@echo "   App Shell: http://localhost:3000"
	@echo "   Dashboard: http://localhost:5174"
	@echo "   Scraper: http://localhost:5173/scraper"
	@echo "   API Scraper: http://localhost:8000"
	@echo ""

# Detener todos los servicios
down:
	@echo "🛑 Deteniendo todos los servicios..."
	docker compose down
	@echo "✅ Servicios detenidos"

# Ver logs de todos los servicios
logs:
	@echo "📋 Mostrando logs de todos los servicios..."
	docker compose logs -f

# Ver estado de los servicios
ps:
	@echo "📊 Estado de los servicios:"
	docker compose ps

# Reconstruir todas las imágenes
build:
	@echo "🔨 Reconstruyendo todas las imágenes..."
	docker compose build --no-cache
	@echo "✅ Imágenes reconstruidas"

# Limpiar contenedores y volúmenes
clean:
	@echo "🧹 Limpiando contenedores y volúmenes..."
	docker compose down -v
	docker system prune -f
	@echo "✅ Limpieza completada"

# Mostrar ayuda
help:
	@echo "📖 Instagram Tools - Comandos disponibles:"
	@echo ""
	@echo "  make up-dev    - Iniciar en modo desarrollo (App Shell + Dashboard + Scraper)"
	@echo "  make down      - Detener todos los servicios"
	@echo "  make logs      - Ver logs de todos los servicios"
	@echo "  make ps        - Ver estado de los servicios"
	@echo "  make build     - Reconstruir todas las imágenes"
	@echo "  make clean     - Limpiar contenedores y volúmenes"
	@echo "  make help      - Mostrar esta ayuda"
	@echo ""
	@echo "🌐 URLs de acceso:"
	@echo "   App Shell: http://localhost:3000"
	@echo "   Dashboard: http://localhost:5174"
	@echo "   Scraper: http://localhost:5173/scraper"
	@echo "   API Scraper: http://localhost:8000" 