/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pila de superficies: placa → tiza → blanco. Nunca más de dos niveles
        // anidados en la misma pantalla.
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        inset: 'rgb(var(--c-inset) / <alpha-value>)',
        concrete: 'rgb(var(--c-concrete) / <alpha-value>)',

        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        graphite: 'rgb(var(--c-graphite) / <alpha-value>)',
        smoke: 'rgb(var(--c-smoke) / <alpha-value>)',
        ash: 'rgb(var(--c-ash) / <alpha-value>)',

        inverse: 'rgb(var(--c-inv-bg) / <alpha-value>)',
        'inverse-fg': 'rgb(var(--c-inv-fg) / <alpha-value>)',

        // El único cromático del sistema, y siempre con texto carbón encima.
        lime: 'rgb(var(--c-lime) / <alpha-value>)',

        // Alias heredados. Todo lo que antes era acento cromático apunta ahora
        // a la tinta: los estados se distinguen por contraste, no por color.
        background: 'rgb(var(--c-canvas) / <alpha-value>)',
        raised: 'rgb(var(--c-paper) / <alpha-value>)',
        lifted: 'rgb(var(--c-inset) / <alpha-value>)',
        foreground: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-smoke) / <alpha-value>)',
        iris: 'rgb(var(--c-ink) / <alpha-value>)',
        phosphor: 'rgb(var(--c-ink) / <alpha-value>)',
        signal: 'rgb(var(--c-ink) / <alpha-value>)',
        spark: 'rgb(var(--c-graphite) / <alpha-value>)',
        amber: 'rgb(var(--c-graphite) / <alpha-value>)',
        accent: 'rgb(var(--c-ink) / <alpha-value>)',
        mint: 'rgb(var(--c-lime) / <alpha-value>)',
        volt: 'rgb(var(--c-lime) / <alpha-value>)',
      },
      fontFamily: {
        // UNA sola familia para toda la interfaz. `display` existe solo como
        // alias heredado y apunta a la misma: no hay segunda tipografía.
        sans: ['"Instrument Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Sans"', 'Inter', 'system-ui', 'sans-serif'],
        // La mono NO es interfaz: solo aparece dentro de objetos de código
        // (terminal, reloj), que son contenido.
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Tracking negativo en todo menos en la etiqueta de 12px, que es el único
      // sitio con versales y por tanto el único que pide aire.
      fontSize: {
        label: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.05em' }],
        caption: ['0.8125rem', { lineHeight: '1.45', letterSpacing: '-0.012em' }],
        body: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.014em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.1875rem,1rem + 0.9vw,1.4375rem)', { lineHeight: '1.25', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.875rem,1.1rem + 2.9vw,3rem)', { lineHeight: '0.98', letterSpacing: '-0.042em' }],
        display: ['clamp(2.25rem,1rem + 5.4vw,3.875rem)', { lineHeight: '0.96', letterSpacing: '-0.042em' }],
        'display-lg': ['clamp(2.75rem,0.7rem + 10.4vw,6.5rem)', { lineHeight: '0.9', letterSpacing: '-0.048em' }],
        stat: ['clamp(2.5rem,1.4rem + 3.6vw,3.75rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
      },
      maxWidth: {
        site: '75rem', // 1200px
      },
      spacing: {
        1.5: '0.375rem',
        4.5: '1.125rem',
        18: '4.5rem',
        30: '7.5rem',
      },
      // Píldora para todo lo interactivo, 4px para los paneles, 0 para la
      // media. Nada entre medias: ni 8px, ni 12px, ni 20px.
      borderRadius: {
        btn: '9999px',
        card: '4px',
        media: '0px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        badge: 'badge 18s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        badge: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
