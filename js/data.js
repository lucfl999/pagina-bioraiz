/**
 * BIORAIZ — Datos globales del sitio
 * Expositores, categorías, agenda, tickets, FAQ, etc.
 */

const BZ_DATA = {
    // Información básica
    event: {
        name: 'BIORAIZ',
        tagline: 'La feria sustentable de la Patagonia',
        date: '13 · 14 · 15 nov 2026',
        dateFull: '13, 14 y 15 de noviembre, 2026',
        location: 'Las Cortaderas · Neuquén',
    },

    // Contacto
    contact: {
        email: 'hola@bioraiz.net',
        whatsapp: '+54 9 2995781006',
        whatsappLink: 'https://wa.me/5492995781006',
        instagram: 'https://www.instagram.com/bioraiz.nqn/',
        facebook: 'https://www.facebook.com/people/Bioraiz/61590140866075/',
    },

    // Categorías de stands
    categorias: [
        { id: 'alimentacion', label: 'Alimentación', stands: 8, icon: '🌾' },
        { id: 'cosmetica', label: 'Cosmética', stands: 6, icon: '✨' },
        { id: 'diseno', label: 'Diseño', stands: 5, icon: '🎨' },
        { id: 'bienestar', label: 'Bienestar', stands: 7, icon: '🧘' },
        { id: 'infantil', label: 'Infantil', stands: 4, icon: '🎪' },
        { id: 'gastronomia', label: 'Gastronomía', stands: 9, icon: '👨‍🍳' },
    ],

    // Expositores
    expositores: [
        { id: 1, nombre: 'Miel del Sur', categoria: 'alimentacion', descripcion: 'Miel orgánica de la Patagonia' },
        { id: 2, nombre: 'Telas Vivas', categoria: 'diseno', descripcion: 'Textiles sostenibles' },
        { id: 3, nombre: 'Fermentados Nativo', categoria: 'alimentacion', descripcion: 'Productos fermentados tradicionales' },
        { id: 4, nombre: 'Cosméticos Orgánicos', categoria: 'cosmetica', descripcion: 'Skincare natural 100%' },
        { id: 5, nombre: 'Cerámica Nativa', categoria: 'diseno', descripcion: 'Piezas hechas a mano' },
        { id: 6, nombre: 'Yoga & Meditación', categoria: 'bienestar', descripcion: 'Talleres de mindfulness' },
        { id: 7, nombre: 'Repostería Artesanal', categoria: 'gastronomia', descripcion: 'Pasteles sin gluten' },
        { id: 8, nombre: 'Té Patagónico', categoria: 'alimentacion', descripcion: 'Infusiones naturales' },
    ],

    // Programa (Agenda)
    dias: ['Viernes 13', 'Sábado 14', 'Domingo 15'],
    
    actividades: {
        'Viernes 13': [
            { hora: '10:00', titulo: 'Inauguración', tipo: 'evento' },
            { hora: '11:00', titulo: 'Taller de Cosmética Natural', tipo: 'taller' },
            { hora: '14:00', titulo: 'Charla: Sostenibilidad', tipo: 'charla' },
            { hora: '16:00', titulo: 'Música en Vivo', tipo: 'actividad' },
        ],
        'Sábado 14': [
            { hora: '09:00', titulo: 'Yoga Matinal', tipo: 'actividad' },
            { hora: '11:00', titulo: 'Masterclass Culinaria', tipo: 'taller' },
            { hora: '14:00', titulo: 'Feria Abierta', tipo: 'evento' },
            { hora: '18:00', titulo: 'DJ Set Ecológico', tipo: 'actividad' },
        ],
        'Domingo 15': [
            { hora: '10:00', titulo: 'Yoga Matinal', tipo: 'actividad' },
            { hora: '12:00', titulo: 'Cierre & Brindis', tipo: 'evento' },
            { hora: '13:00', titulo: 'Almuerzo Comunitario', tipo: 'actividad' },
        ],
    },

    // Entradas
    tickets: [
        {
            id: 1,
            nombre: 'Acceso 1 Día',
            precio: '$5.000',
            descripcion: 'Entrada a la feria por 1 día',
            beneficios: ['Acceso a todos los stands', 'Actividades incluidas'],
        },
        {
            id: 2,
            nombre: 'Acceso 3 Días',
            precio: '$12.000',
            descripcion: 'Acceso a toda la feria',
            beneficios: ['Viernes + Sábado + Domingo', 'Todas las actividades', '10% desc. en compras'],
            highlight: true,
        },
        {
            id: 3,
            nombre: 'VIP Premium',
            precio: '$18.000',
            descripcion: 'Experiencia Premium',
            beneficios: ['Zona VIP', 'Parking reservado', 'Almuerzo incluido', 'Meet & Greet speakers'],
        },
    ],

    // FAQ
    faq: [
        {
            pregunta: '¿Cuándo es BIORAIZ?',
            respuesta: '13, 14 y 15 de noviembre de 2026 en Las Cortaderas, Neuquén.',
        },
        {
            pregunta: '¿Puedo comprar entradas en la puerta?',
            respuesta: 'Sí, pero recomendamos comprar anticipadas para garantizar disponibilidad.',
        },
        {
            pregunta: '¿Hay estacionamiento?',
            respuesta: 'Sí, hay estacionamiento gratuito para todos los visitantes.',
        },
        {
            pregunta: '¿Puedo traer mascotas?',
            respuesta: 'Sí, se permiten mascotas con sus respectivos dueños.',
        },
    ],

    // Valores
    valores: [
        { titulo: 'Sostenibilidad', icono: '🌍', descripcion: 'Comprometidos con el ambiente' },
        { titulo: 'Comunidad', icono: '👥', descripcion: 'Conectando productores con consumidores' },
        { titulo: 'Innovación', icono: '💡', descripcion: 'Nuevas formas de vivir sustentable' },
        { titulo: 'Transparencia', icono: '👀', descripcion: 'Honestidad en cada producto' },
    ],

    // Números importantes
    numeros: [
        { numero: '50+', label: 'Expositores' },
        { numero: '5', label: 'Zonas Experienciales' },
        { numero: '20+', label: 'Actividades' },
        { numero: '3', label: 'Días de Feria' },
    ],
};

// Exportar para uso en otros scripts
if (typeof window !== 'undefined') {
    window.BZ_DATA = BZ_DATA;
}
