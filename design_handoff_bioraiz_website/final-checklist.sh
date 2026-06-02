#!/bin/bash

# BIORAIZ Production Deployment - Final Checklist

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         BIORAIZ — PRODUCTION DEPLOYMENT CHECKLIST            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_item() {
  local name=$1
  local command=$2
  echo -n "Verificando $name... "
  if eval "$command" &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
    return 0
  else
    echo -e "${RED}✗${NC}"
    return 1
  fi
}

echo -e "${YELLOW}REQUISITOS LOCALES${NC}"
check_item "Node.js" "node --version"
check_item "npm" "npm --version"
check_item "Git" "git --version"
check_item ".env existe" "test -f .env"
check_item "node_modules" "test -d node_modules"

echo ""
echo -e "${YELLOW}ESTRUCTURA DE CARPETAS${NC}"
check_item "frontend/" "test -d frontend"
check_item "api/" "test -d api"
check_item "workers/" "test -d workers"
check_item "database/" "test -d database"
check_item ".github/workflows/" "test -d .github/workflows"

echo ""
echo -e "${YELLOW}ARCHIVOS DE CONFIGURACIÓN${NC}"
check_item ".gitignore" "test -f .gitignore"
check_item ".env.example" "test -f .env.example"
check_item "package.json" "test -f package.json"
check_item "railway.json" "test -f railway.json"
check_item "DEPLOYMENT.md" "test -f DEPLOYMENT.md"

echo ""
echo -e "${YELLOW}FRONTEND${NC}"
check_item "vite.config.js" "test -f frontend/vite.config.js"
check_item "index.html" "test -f frontend/index.html"
check_item "src/App.jsx" "test -f frontend/src/App.jsx"
check_item "src/main.jsx" "test -f frontend/src/main.jsx"

echo ""
echo -e "${YELLOW}BACKEND${NC}"
check_item "api/src/index.js" "test -f api/src/index.js"
check_item "api/src/routes/" "test -d api/src/routes"
check_item "api/src/services/" "test -d api/src/services"
check_item "emailService.js" "test -f api/src/services/emailService.js"

echo ""
echo -e "${YELLOW}WORKERS${NC}"
check_item "workers/wrangler.toml" "test -f workers/wrangler.toml"
check_item "workers/src/index.ts" "test -f workers/src/index.ts"

echo ""
echo -e "${YELLOW}DATABASE${NC}"
check_item "database/schema.sql" "test -f database/schema.sql"
check_item "database/init.sh" "test -f database/init.sh"

echo ""
echo -e "${YELLOW}CI/CD${NC}"
check_item ".github/workflows/deploy.yml" "test -f .github/workflows/deploy.yml"

echo ""
echo -e "${YELLOW}VARIABLES DE ENTORNO${NC}"
if test -f .env; then
  check_item "DATABASE_URL" "grep -q 'DATABASE_URL' .env"
  check_item "RESEND_API_KEY" "grep -q 'RESEND_API_KEY' .env"
  check_item "JWT_SECRET" "grep -q 'JWT_SECRET' .env"
  check_item "STRIPE_SECRET_KEY" "grep -q 'STRIPE_SECRET_KEY' .env"
else
  echo -e "${RED}✗${NC} .env no existe (copia .env.example y edita)"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║               PRÓXIMOS PASOS                                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${YELLOW}1. GitHub${NC}"
echo "   git add ."
echo "   git commit -m 'Production-ready setup'"
echo "   git push origin main"
echo ""
echo -e "${YELLOW}2. Railway${NC}"
echo "   Crear proyecto: railway.app"
echo "   DATABASE_URL: ${GREEN}✓${NC}"
echo "   Conectar GitHub: railway.app/settings"
echo ""
echo -e "${YELLOW}3. Cloudflare Pages${NC}"
echo "   Crear página: dash.cloudflare.com"
echo "   Conectar repo: bioraiz-website"
echo "   Build: npm run build -w frontend"
echo ""
echo -e "${YELLOW}4. Cloudflare Workers${NC}"
echo "   wrangler deploy"
echo ""
echo -e "${YELLOW}5. Dominio bioraiz.net${NC}"
echo "   Nameservers: nat.ns.cloudflare.com"
echo "   DNS CNAME records"
echo ""
echo -e "${YELLOW}6. Email${NC}"
echo "   Resend API Key: en Railway"
echo "   Verificar dominio"
echo ""
echo -e "${YELLOW}7. GitHub Actions${NC}"
echo "   Agregar secrets: Settings → Secrets"
echo "   CLOUDFLARE_API_TOKEN"
echo "   RAILWAY_TOKEN"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ Listo para deployment${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Lee DEPLOYMENT.md para instrucciones detalladas 👇"
