export const AUTOMATION_URL = 'https://portafolio-automatizacion.vercel.app';
export const AUTOMATION_REPO = 'https://github.com/SantiagoRomero7/portafolio-automatizacion';
export const TEAMMATE = { handle: 'DanielSantiagoV', url: 'https://github.com/DanielSantiagoV' };

export const automationSlides = [
  { key: 'hero', src: '/projects/automatizacion-portada.webp' },
  { key: 'week', src: '/projects/automatizacion-cuenta.webp' },
  { key: 'archive', src: '/projects/automatizacion-archivo.webp' },
];

// Orden = orden en la cuadrícula. El primero ocupa todo el ancho.
export const projects = [
  {
    key: 'distrib-app',
    tech: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Expo Router', 'Vercel'],
    demo: null,
    repo: 'https://github.com/SantiagoRomero7/distrib-app',
    status: 'production',
    visual: { type: 'phone' },
  },
  {
    key: 'misfinanzas',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vite', 'PWA'],
    demo: null, // Base de datos fuera de servicio: no se enlaza la demo
    repo: 'https://github.com/SantiagoRomero7/misfinanzas',
    status: 'maintenance',
    visual: { type: 'browser', src: '/projects/misfinanzas.webp', url: 'misfinanzas-two.vercel.app' },
  },
  {
    key: 'dataflix',
    tech: ['HTML5', 'CSS', 'JavaScript', 'LocalStorage'],
    demo: 'https://dataflixx.netlify.app/',
    repo: 'https://github.com/DanielSantiagoV/DataFlix',
    status: 'live',
    team: true,
    visual: { type: 'browser', src: '/projects/dataflix.webp', url: 'dataflixx.netlify.app' },
  },
  {
    key: 'foodstars',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'MVC', 'JavaScript'],
    demo: null,
    repo: 'https://github.com/DanielSantiagoV/Backend_FoodStars',
    status: 'completed',
    team: true,
    wide: true,
    visual: {
      type: 'terminal',
      title: 'foodstars-api',
      note: 'projects.api_note',
      lines: [
        '$ curl /api/v1/restaurantes/ranking',
        '? 200 OK · Bearer JWT',
        '{',
        '  "posicion": 1,',
        '  "restaurante": "La Casona",',
        '  "puntaje": 4.87,',
        '  "reseñas": 128',
        '}',
        '✔ Ranking ponderado actualizado',
      ],
    },
  },
  {
    key: 'gym',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: null,
    repo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    status: 'completed',
    team: true,
    visual: {
      type: 'terminal',
      title: 'gymmaster-cli',
      lines: [
        '$ npm start',
        '🏋️  GymMaster CLI',
        '? ¿Qué deseas hacer?',
        '❯ Gestionar clientes',
        '  Planes de entrenamiento',
        '  Seguimiento de progreso',
        '  Nutrición',
        '  Contratos y pagos',
      ],
    },
  },
  {
    key: 'pizza',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: null,
    repo: 'https://github.com/DanielSantiagoV/Pizza_Punto',
    status: 'completed',
    team: true,
    visual: {
      type: 'terminal',
      title: 'pizza-y-punto',
      lines: [
        '$ npm start',
        '🍕 Pizza y Punto',
        '? Menú principal',
        '❯ Registrar pedido',
        '  Inventario',
        '  Repartidores',
        '  Reportes de ventas',
        '✔ Transacción confirmada',
      ],
    },
  },
];
