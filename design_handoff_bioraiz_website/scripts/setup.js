#!/usr/bin/env node

/**
 * Script de setup inicial
 * Uso: npm run setup (desde root)
 */

const fs = require('fs');
const path = require('path');

console.log('🌱 BIORAIZ Setup Inicial\n');

// 1. Crear .env si no existe
const envExamplePath = path.join(__dirname, '.env.example');
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✓ Archivo .env creado (reemplaza los valores)');
} else if (fs.existsSync(envPath)) {
  console.log('✓ Archivo .env ya existe');
}

// 2. Crear directorio de logs
const logsDir = path.join(__dirname, 'api', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
  console.log('✓ Directorio de logs creado');
}

// 3. Instalar dependencias
console.log('\n📦 Instalando dependencias...');
console.log('   npm install --workspaces');

// 4. Build
console.log('\n🔨 Build...');
console.log('   npm run build');

console.log('\n✅ Setup completado!');
console.log('\n📝 Próximos pasos:');
console.log('   1. Edita .env con tus valores reales');
console.log('   2. npm install --workspaces');
console.log('   3. npm run dev (para desarrollo local)');
console.log('   4. Lee DEPLOYMENT.md para información de producción');
