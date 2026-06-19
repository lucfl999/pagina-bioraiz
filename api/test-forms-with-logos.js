import { buildAdminHtml } from './src/services/htmlBuilder.js';

console.log('\n🧪 TEST: Emails con Logos de Cloudinary embebidos');
console.log('='.repeat(60));

// Simulamos datos de participación con logos
const testCases = [
  {
    name: 'Feriante con logo',
    type: 'Feriante',
    fields: {
      emprendimiento: 'Brotes del Sur',
      responsable: 'María García',
      email: 'maria@brotes.com',
      telefono: '+54 299 123-4567',
      localidad: 'Neuquén Capital',
      instagram: '@brotesdelsur',
      categoria: 'Bienestar y salud holística',
      descripcion: 'Productos naturales de Patagonia...',
      foto_marca: 'https://res.cloudinary.com/dfge6bxvb/image/upload/v1704067200/bioraiz-participaciones/logo-brotes.png',
      referencia: '@brotesdelsur',
      antiguedad: 'Desde marzo 2022',
      stand: 'Estándar · 12 m²',
      practicas: 'Packaging compostable, cero plástico',
      plastico: 'Sí, ya trabajo sin plástico descartable',
      motivacion: 'Porque creemos en la sustentabilidad',
    }
  },
  {
    name: 'Speaker con foto de perfil',
    type: 'Speaker',
    fields: {
      nombre: 'Dr. Juan Pérez',
      disciplina: 'Nutricionista funcional',
      email: 'juan@nutricion.com',
      telefono: '+54 299 987-6543',
      instagram: '@juanperez',
      web: 'https://juanperez.com',
      titulo: 'Microbiota y bienestar mental',
      descripcion: 'Una charla sobre la importancia de la microbiota...',
      tematica: 'Nutrición funcional y alimentación consciente',
      duracion: '45 minutos',
      practico: 'Sí, tiene dinámicas o ejercicios cortos',
      foto_speaker: 'https://res.cloudinary.com/dfge6bxvb/image/upload/v1704067300/bioraiz-participaciones/foto-juan.png',
      formacion: 'Nutricionista (UBA), Master en Nutrición Funcional',
      exp: 'Sí, en festivales o eventos de más de 1.000 personas',
    }
  },
  {
    name: 'Artista sin logo',
    type: 'Artista',
    fields: {
      proyecto: 'Los Silvestres',
      representante: 'Carlos López',
      email: 'carlos@lossilvestres.com',
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
    }
  },
];

let passed = 0;
let failed = 0;

testCases.forEach((test, i) => {
  console.log(`\n${i + 1}. ${test.name}\n`);
  
  try {
    const html = buildAdminHtml(`Solicitud: ${test.type}`, test.fields);
    
    // Verificar que el HTML contiene elementos esperados
    const hasImageEmbed = test.fields.foto_marca && html.includes('<img src=');
    const hasImageLink = test.fields.foto_speaker && html.includes('<img src=');
    const hasCloudinaryLink = html.includes('res.cloudinary.com');
    
    const testFoto = test.fields.foto_marca || test.fields.foto_speaker;
    const isEmbedded = testFoto ? html.includes(testFoto) : true;
    
    if (isEmbedded) {
      console.log('✓ PASS: HTML generado correctamente');
      if (testFoto) {
        console.log(`  - Logo/foto embebido: ${testFoto.split('/').pop()}`);
        console.log(`  - URL completa en email: ${testFoto}`);
      }
      passed++;
    } else {
      console.log('✗ FAIL: Logo/foto no embebido en HTML');
      failed++;
    }
    
    // Mostrar un snippet del HTML generado
    const lines = html.split('\n').filter(l => l.includes('foto') || l.includes('cloudinary') || l.includes('img'));
    if (lines.length > 0) {
      console.log(`  Líneas relevantes (${lines.length}):`);
      lines.slice(0, 3).forEach(l => console.log(`    ${l.substring(0, 80)}...`));
    }
  } catch (error) {
    console.log(`✗ FAIL: Error al generar HTML - ${error.message}`);
    failed++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Resultados: ${passed} PASS, ${failed} FAIL\n`);

if (failed === 0) {
  console.log('✅ ¡Todos los emails se generan correctamente!\n');
  process.exit(0);
} else {
  console.log('❌ Algunos tests fallaron\n');
  process.exit(1);
}
