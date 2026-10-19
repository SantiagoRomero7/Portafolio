import { motion } from 'framer-motion';

/**
 * Marcos de contenido. Ninguno lleva sombra ni contorno: se separan del lienzo
 * subiendo un escalón de superficie. Y las esquinas son francas —radio cero—
 * porque la captura va "contenida y sin enmarcar", no metida en una tarjeta.
 *
 * El teléfono y la terminal sí son objetos oscuros: son aparatos, no interfaz,
 * y hacen de pieza gráfica sobre el papel igual que los renders de la
 * referencia. Sus negros son neutros, sin tinte de color.
 */

const DEVICE = '#111110';
const SCREEN = '#080807';

/** Ventana de navegador con barra de dirección */
export const BrowserFrame = ({ url, children, className = '' }) => (
  <div className={`frame ${className}`}>
    <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="flex gap-1.5">
        <span className="h-2 w-2 bg-ink/20" />
        <span className="h-2 w-2 bg-ink/20" />
        <span className="h-2 w-2 bg-ink/20" />
      </div>
      {url && (
        <div className="mx-auto max-w-[70%] truncate bg-canvas px-3 py-1 font-mono text-[10px] text-smoke">{url}</div>
      )}
    </div>
    <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
  </div>
);

export const Screenshot = ({ src, alt }) => (
  <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
);

/** Celular con contenido tipográfico (no simula capturas que no existen) */
export const PhoneFrame = ({ children, className = '' }) => (
  <div
    className={`relative mx-auto w-[240px] rounded-[2.4rem] p-2.5 ${className}`}
    style={{ background: DEVICE }}
  >
    <div
      className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full"
      style={{ background: SCREEN }}
    />
    <div
      className="relative overflow-hidden rounded-[1.9rem] px-4 pb-5 pt-9 text-[#f0eee7]"
      style={{ background: SCREEN }}
    >
      {children}
    </div>
  </div>
);

/** Terminal que "escribe" sus líneas al entrar en pantalla */
export const TerminalFrame = ({ title, lines, note }) => (
  <div className="frame font-mono text-[12px] leading-relaxed text-[#f0eee7]/70" style={{ background: SCREEN }}>
    <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 bg-white/20" />
        <span className="h-2 w-2 bg-white/20" />
        <span className="h-2 w-2 bg-white/20" />
      </div>
      <span className="text-[10px] uppercase tracking-[0.13em] text-white/35">{title}</span>
    </div>
    <motion.div
      className="aspect-[16/10] whitespace-pre px-5 py-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
          className={
            line.startsWith('$')
              ? 'text-white'
              : line.startsWith('❯')
                ? 'text-white/90'
                : line.startsWith('✔')
                  ? 'text-[#cbffc1]'
                  : line.startsWith('?')
                    ? 'text-[#fff100]'
                    : ''
          }
        >
          {line}
        </motion.div>
      ))}
      <span className="mt-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#fff100] align-middle" />
    </motion.div>
    {note && <div className="border-t border-white/[0.08] px-4 py-2 text-[10px] text-white/30">{note}</div>}
  </div>
);
