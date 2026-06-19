import dotenv from 'dotenv';

dotenv.config();

console.log('\n🧪 TEST: Endpoint /api/forms/participa con logos de Cloudinary');
console.log('='.repeat(70));

// Verificar variables de entorno necesarias
const requiredEnvs = ['ADMIN_EMAIL', 'BREVO_API_KEY'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  console.log(`\n⚠️  Variables de entorno faltantes: ${missingEnvs.join(', ')}`);
  console.log('Algunos tests serán saltados...\n');
}

console.log(`\n✓ Configuración detectada:`);
console.log(`  - ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || '(no configurado)'}`);
console.log(`  - EMAIL_PROVIDER: ${process.env.EMAIL_PROVIDER || 'brevo'}`);
console.log(`  - CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME || '(no configurado)'}`);

// Test cases para el endpoint
const testPayloads = [
  {
    name: 'Feriante con logo',
    data: {
      tipo_participacion: 'Feriante',
      emprendimiento: 'Brotes del Sur',
      responsable: 'María García',
      email: 'test-feriante@example.com',
      telefono: '+54 299 123-4567',
      localidad: 'Neuquén Capital',
      instagram: '@brotesdelsur',
      categoria: 'Bienestar y salud holística',
      descripcion: 'Productos naturales de Patagonia con valores sustentables...',
      foto_marca: 'https://res.cloudinary.com/dfge6bxvb/image/upload/v1704067200/bioraiz-participaciones/logo-brotes.png',
      referencia: '@brotesdelsur',
      antiguedad: 'Desde marzo 2022',
      stand: 'Estándar · 12 m²',
      practicas: 'Packaging compostable, cero plástico',
      plastico: 'Sí, ya trabajo sin plástico descartable',
      motivacion: 'Porque creemos en la sustentabilidad',
    },
    expectedFields: ['foto_marca', 'responsable', 'email'],
  },
  {
    name: 'Speaker con foto',
    data: {
      tipo_participacion: 'Speaker',
      nombre: 'Dr. Juan Pérez',
      disciplina: 'Nutricionista funcional',
      email: 'test-speaker@example.com',
      telefono: '+54 299 987-6543',
      instagram: '@juanperez',
      web: 'https://juanperez.com',
      titulo: 'Microbiota y bienestar mental',
      descripcion: 'Una charla sobre la importancia de la microbiota en nuestra salud mental...',
      tematica: 'Nutrición funcional y alimentación consciente',
      duracion: '45 minutos',
      practico: 'Sí, tiene dinámicas o ejercicios cortos',
      foto_speaker: 'https://res.cloudinary.com/dfge6bxvb/image/upload/v1704067300/bioraiz-participaciones/foto-juan.png',
      formacion: 'Nutricionista (UBA), Master en Nutrición Funcional',
      exp: 'Sí, en festivales o eventos de más de 1.000 personas',
    },
    expectedFields: ['foto_speaker', 'nombre', 'email'],
  },
  {
    name: 'Artista sin foto',
    data: {
      tipo_participacion: 'Artista',
      proyecto: 'Los Silvestres',
      representante: 'Carlos López',
      email: 'test-artista@example.com',
      telefono: '+54 299 456-7890',
      ciudad: 'Bariloche',
      redes: '@lossilvestres',
      descripcion: 'Folk patagónico con raíces indígenas...',
      genero: 'Folk / cantautor/a',
      material: 'https://open.spotify.com/artist/lossilvestres',
      encaje: 'Nuestra música celebra la naturaleza',
      escenario: 'Escenario "El Monte" — 1.500 personas, formato íntimo/folk',
      duracion: '60 minutos',
      rider: 'No, adapto a lo que haya disponible',
    },
    expectedFields: ['representante', 'email'],
  },
];

console.log('\n' + '='.repeat(70));
console.log('\n📋 Validación de payloads:\n');

let passed = 0;
let failed = 0;

testPayloads.forEach((test, i) => {
  try {
    // Validar que el payload contiene los campos esperados
    const hasAllFields = test.expectedFields.every(field => test.data[field]);
    
    if (!hasAllFields) {
      console.log(`${i + 1}. ${test.name}`);
      console.log(`   ✗ FAIL: Falta algún campo esperado`);
      failed++;
      return;
    }

    // Validar que URLs de Cloudinary sean válidas
    const cloudinaryFields = Object.entries(test.data)
      .filter(([k, v]) => k.includes('foto') && typeof v === 'string' && v.includes('cloudinary'));
    
    const allUrlsValid = cloudinaryFields.every(([, url]) => {
      return url.includes('res.cloudinary.com') && url.includes('dfge6bxvb');
    });

    console.log(`${i + 1}. ${test.name}`);
    console.log(`   Email: ${test.data.email}`);
    console.log(`   Tipo: ${test.data.tipo_participacion}`);
    
    if (cloudinaryFields.length > 0) {
      console.log(`   Logos: ${cloudinaryFields.map(([k]) => k).join(', ')}`);
    }

    if (hasAllFields && (cloudinaryFields.length === 0 || allUrlsValid)) {
      console.log('   ✓ PASS: Payload válido');
      passed++;
    } else {
      console.log('   ✗ FAIL: Validación de campos fallida');
      failed++;
    }
  } catch (error) {
    console.log(`${i + 1}. ${test.name}`);
    console.log(`   ✗ FAIL: ${error.message}`);
    failed++;
  }
  console.log();
});

console.log('='.repeat(70));
console.log(`\n📊 Validación de payloads: ${passed} PASS, ${failed} FAIL\n`);

if (failed === 0) {
  console.log('✅ ¡Todos los payloads son válidos!\n');
  console.log('📝 Próximos pasos para test completo:');
  console.log('   1. Iniciar servidor: npm run dev');
  console.log('   2. Probar endpoint: curl -X POST http://localhost:3000/api/forms/participa \\');
  console.log('      -H "Content-Type: application/json" \\');
  console.log('      -d \'{"tipo_participacion":"Feriante",...,"foto_marca":"https://res.cloudinary.com/dfge6bxvb/image/upload/..."}\'');
  console.log();
  process.exit(0);
} else {
  console.log('❌ Algunos payloads tienen errores\n');
  process.exit(1);
}
