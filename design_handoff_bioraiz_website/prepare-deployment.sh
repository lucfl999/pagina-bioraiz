#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Preparando BIORAIZ para production...${NC}\n"

# 1. Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js encontrado: $(node --version)${NC}"

# 2. Instalar dependencias
echo -e "\n${YELLOW}Instalando dependencias...${NC}"
npm install --workspaces

# 3. Build
echo -e "\n${YELLOW}Compilando proyecto...${NC}"
npm run build

# 4. Verificación de variables de entorno
echo -e "\n${YELLOW}Verificando variables de entorno...${NC}"

required_vars=(
  "DATABASE_URL"
  "RESEND_API_KEY"
  "JWT_SECRET"
  "CLOUDFLARE_API_TOKEN"
  "STRIPE_SECRET_KEY"
)

missing_vars=0
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo -e "${RED}✗ Falta: $var${NC}"
    ((missing_vars++))
  else
    echo -e "${GREEN}✓ $var configurada${NC}"
  fi
done

if [ $missing_vars -gt 0 ]; then
  echo -e "\n${RED}Error: Faltan variables de entorno${NC}"
  exit 1
fi

echo -e "\n${GREEN}✓ Preparación completada${NC}"
echo -e "${YELLOW}Pasos siguientes:${NC}"
echo "1. Commit en GitHub: git add . && git commit -m 'Deploy production' && git push"
echo "2. GitHub Actions ejecutará el deployment automáticamente"
echo "3. Verifica el status en: https://github.com/tu-usuario/bioraiz-website/actions"
