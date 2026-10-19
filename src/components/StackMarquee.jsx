import {
  SiExpo,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

const items = [
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Express', Icon: SiExpress },
  { name: 'Expo', Icon: SiExpo },
  { name: 'Vercel', Icon: SiVercel },
];

/**
 * Cinta de tecnologías a sangre sobre el bloque invertido: la franja negra con
 * texto en caja alta y monoespaciado que cierra el hero. Es el remate gráfico
 * que separa la portada del resto de la página.
 *
 * La lista va duplicada y la animación desplaza justo la mitad del ancho, así
 * el salto al reiniciar coincide y el bucle se ve infinito.
 */
const StackMarquee = () => (
  <div className="band-ink relative py-5" style={{ borderTop: '1px solid rgb(var(--c-inv-fg) / 0.18)' }}>
    <div className="marquee-mask flex overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-12 pr-12">
        {[...items, ...items].map(({ name, Icon }, i) => (
          <span
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 text-label uppercase"
          >
            <Icon size={15} aria-hidden className="opacity-60" />
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default StackMarquee;
