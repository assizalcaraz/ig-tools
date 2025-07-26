#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar el menú
show_menu() {
    echo -e "${BLUE}🚀 Instagram Tools - Selector de Módulos${NC}"
    echo ""
    echo -e "${YELLOW}Selecciona una opción:${NC}"
    echo ""
    echo "1) Solo Dashboard"
    echo "2) Solo Scraper"
    echo "3) Dashboard + Scraper"
    echo "4) App Shell (navegador principal)"
    echo "5) App Shell + todos los módulos"
    echo "6) Build completo (recomendado para cambios)"
    echo "7) Ver estado de servicios"
    echo "8) Detener todos los servicios"
    echo "9) Salir"
    echo ""
}

# Función para build completo
full_build() {
    echo -e "${BLUE}🧹 Limpiando contenedores anteriores...${NC}"
    docker compose down -v
    docker system prune -f
    
    echo ""
    echo -e "${BLUE}📦 Instalando dependencias y construyendo...${NC}"
    echo "   - Dashboard..."
    docker run --rm -v $(pwd)/dashboard_web:/app -w /app node:18 npm install
    echo "   - Scraper Frontend..."
    docker run --rm -v $(pwd)/scraper/frontend:/app -w /app node:18 npm install
    echo "   - App Shell..."
    docker run --rm -v $(pwd)/app-shell:/app -w /app node:18 npm install
    
    echo ""
    echo -e "${BLUE}🔨 Construyendo imágenes Docker...${NC}"
    docker compose build --no-cache
    
    echo ""
    echo -e "${BLUE}🚀 Iniciando servicios...${NC}"
    docker compose --profile shell --profile dashboard --profile scraper --profile scraper-ui up -d
    
    echo ""
    echo -e "${GREEN}✅ Build completo finalizado!${NC}"
    echo ""
    echo -e "${YELLOW}🌐 URLs disponibles:${NC}"
    echo "   App Shell: http://localhost:3000"
    echo "   Dashboard: http://localhost:5174"
    echo "   Scraper: http://localhost:5173/scraper"
    echo "   API Scraper: http://localhost:8000"
}

# Función para mostrar estado
show_status() {
    echo -e "${BLUE}📊 Estado de los servicios:${NC}"
    docker compose ps
    echo ""
    echo -e "${YELLOW}🌐 URLs disponibles:${NC}"
    echo "   App Shell: http://localhost:3000"
    echo "   Dashboard: http://localhost:5174"
    echo "   Scraper: http://localhost:5173/scraper"
    echo "   API Scraper: http://localhost:8000"
}

# Función para detener servicios
stop_services() {
    echo -e "${YELLOW}🛑 Deteniendo todos los servicios...${NC}"
    docker compose down
    echo -e "${GREEN}✅ Servicios detenidos${NC}"
}

# Bucle principal
while true; do
    show_menu
    read -p "Ingresa tu opción (1-9): " choice
    
    case $choice in
        1)
            echo -e "${BLUE}🚀 Iniciando solo Dashboard...${NC}"
            docker compose --profile dashboard up -d
            echo -e "${GREEN}✅ Dashboard iniciado en http://localhost:5174${NC}"
            ;;
        2)
            echo -e "${BLUE}🚀 Iniciando solo Scraper...${NC}"
            docker compose --profile scraper --profile scraper-ui up -d
            echo -e "${GREEN}✅ Scraper iniciado en http://localhost:5173/scraper${NC}"
            ;;
        3)
            echo -e "${BLUE}🚀 Iniciando Dashboard + Scraper...${NC}"
            docker compose --profile dashboard --profile scraper --profile scraper-ui up -d
            echo -e "${GREEN}✅ Servicios iniciados${NC}"
            ;;
        4)
            echo -e "${BLUE}🚀 Iniciando App Shell...${NC}"
            docker compose --profile shell up -d
            echo -e "${GREEN}✅ App Shell iniciado en http://localhost:3000${NC}"
            ;;
        5)
            echo -e "${BLUE}🚀 Iniciando App Shell + todos los módulos...${NC}"
            docker compose --profile shell --profile dashboard --profile scraper --profile scraper-ui up -d
            echo -e "${GREEN}✅ Todos los servicios iniciados${NC}"
            ;;
        6)
            echo -e "${BLUE}🚀 Iniciando build completo...${NC}"
            full_build
            ;;
        7)
            show_status
            ;;
        8)
            stop_services
            ;;
        9)
            echo -e "${GREEN}👋 ¡Hasta luego!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Opción inválida. Por favor selecciona 1-9.${NC}"
            ;;
    esac
    
    echo ""
    read -p "Presiona Enter para continuar..."
    clear
done 