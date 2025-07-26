#!/bin/bash

echo "🚀 Instagram Tools - Gestor de Módulos"
echo "======================================"
echo ""

# Función para mostrar el menú
show_menu() {
    echo "Selecciona qué módulos quieres ejecutar:"
    echo ""
    echo "1) Solo Dashboard"
    echo "2) Solo Scraper (Backend + Frontend)"
    echo "3) Dashboard + Scraper completo"
    echo "4) App Shell (navegación integrada)"
    echo "5) App Shell + Dashboard + Scraper"
    echo "6) Ver estado actual"
    echo "7) Detener todos los servicios"
    echo "8) Salir"
    echo ""
}

# Función para ejecutar comandos
run_services() {
    local profiles=$1
    echo "🔄 Iniciando servicios con perfiles: $profiles"
    docker compose --profile $profiles up -d
    echo "✅ Servicios iniciados"
    echo ""
    echo "🌐 URLs disponibles:"
    if [[ $profiles == *"shell"* ]]; then
        echo "   App Shell: http://localhost:3000"
    fi
    if [[ $profiles == *"dashboard"* ]]; then
        echo "   Dashboard: http://localhost:5174"
    fi
    if [[ $profiles == *"scraper"* ]]; then
        echo "   Scraper Backend: http://localhost:8000"
    fi
    if [[ $profiles == *"scraper-ui"* ]]; then
        echo "   Scraper Frontend: http://localhost:5173"
    fi
    echo ""
}

# Función para mostrar estado
show_status() {
    echo "📊 Estado actual de los servicios:"
    docker compose ps
    echo ""
}

# Función para detener servicios
stop_services() {
    echo "🛑 Deteniendo todos los servicios..."
    docker compose down
    echo "✅ Servicios detenidos"
    echo ""
}

# Bucle principal
while true; do
    show_menu
    read -p "Selecciona una opción (1-8): " choice
    
    case $choice in
        1)
            run_services "dashboard"
            ;;
        2)
            run_services "scraper scraper-ui"
            ;;
        3)
            run_services "dashboard scraper scraper-ui"
            ;;
        4)
            run_services "shell"
            ;;
        5)
            run_services "shell dashboard scraper scraper-ui"
            ;;
        6)
            show_status
            ;;
        7)
            stop_services
            ;;
        8)
            echo "👋 ¡Hasta luego!"
            exit 0
            ;;
        *)
            echo "❌ Opción inválida. Por favor selecciona 1-8."
            echo ""
            ;;
    esac
    
    read -p "Presiona Enter para continuar..."
    echo ""
done 