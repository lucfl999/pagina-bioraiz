#!/bin/bash

# Quick start script - ejecuta todo en local con Docker

echo "🚀 Iniciando BIORAIZ en local..."
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    echo "Instálalo desde: https://docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado"
    exit 1
fi

echo "✓ Docker encontrado"

# Iniciar servicios
echo ""
echo "📦 Levantando servicios..."
docker-compose up -d

echo ""
echo "✅ BIORAIZ en local:"
echo "   Frontend:  http://localhost:5173"
echo "   API:       http://localhost:3000"
echo "   Database:  postgresql://bioraiz:dev_password@localhost:5432/bioraiz_dev"
echo ""
echo "📊 Dashboard:"
echo "   npm run dev (en otra terminal para dev mode)"
echo ""
echo "🛑 Para detener:"
echo "   docker-compose down"
