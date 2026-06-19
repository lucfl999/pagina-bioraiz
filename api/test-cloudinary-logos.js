import dotenv from 'dotenv';
import { validateCloudinaryUrl } from './src/services/cloudinaryService.js';

dotenv.config();

console.log('\n🧪 TEST: Validación de URLs de Cloudinary para Logos');
console.log('='.repeat(60));

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
console.log(`\n📁 Cloud Name configurado: ${CLOUDINARY_CLOUD_NAME}`);

// Test cases
const testCases = [
  {
    name: 'URL válida de Cloudinary con logo',
    url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1234567890/bioraiz-participaciones/logo-feriante.png`,
    expected: true,
  },
  {
    name: 'URL válida de Cloudinary con foto de speaker',
    url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v9876543210/bioraiz-participaciones/foto-speaker.jpg`,
    expected: true,
  },
  {
    name: 'URL válida con path diferente',
    url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v111/otro-folder/imagen.png`,
    expected: true,
  },
  {
    name: 'URL inválida - otro dominio',
    url: 'https://example.com/image.png',
    expected: false,
  },
  {
    name: 'URL inválida - cloud name diferente',
    url: `https://res.cloudinary.com/otro-cloud/image/upload/v123/bioraiz-participaciones/logo.png`,
    expected: false,
  },
  {
    name: 'URL inválida - vacía',
    url: '',
    expected: false,
  },
  {
    name: 'URL inválida - null',
    url: null,
    expected: false,
  },
];

let passed = 0;
let failed = 0;

console.log('\n📋 Ejecutando tests:\n');

testCases.forEach((test, i) => {
  const result = validateCloudinaryUrl(test.url);
  const status = result === test.expected ? '✓ PASS' : '✗ FAIL';
  
  if (result === test.expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${i + 1}. ${test.name}`);
  console.log(`   URL: ${test.url || '(vacío)'}`);
  console.log(`   Esperado: ${test.expected}, Obtenido: ${result}`);
  console.log(`   ${status}\n`);
});

console.log('='.repeat(60));
console.log(`\n📊 Resultados: ${passed} PASS, ${failed} FAIL`);

if (failed === 0) {
  console.log('✅ ¡Todos los tests pasaron!\n');
  process.exit(0);
} else {
  console.log('❌ Algunos tests fallaron\n');
  process.exit(1);
}
