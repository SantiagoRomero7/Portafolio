import { motion } from 'framer-motion';

/** Ventana de navegador con barra de dirección */
export const BrowserFrame = ({ url, children, className = '' }) => (
  <div
    className={`overflow-hidden rounded-xl border border-foreground/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
  >
    <div className="flex items-center gap-3 border-b border-foreground/[0.06] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      </div>
      {url && (
        <div className="mx-auto max-w-[70%] truncate rounded-md bg-foreground/[0.05] px-3 py-1 text-[10px] text-foreground/40">
          {url}
        </div>
      )}
    </div>
    <div className="relative aspect-[16/10] overflow-hidden bg-foreground/[0.03]">{children}</div>
  </div>
);

export const Screenshot = ({ src, alt }) => (
  <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
);

/** Celular con contenido tipográfico (no simula capturas que no existen) */
export const PhoneFrame = ({ children, className = '' }) => (
  <div
    className={`relative mx-auto w-[240px] rounded-[2.4rem] border border-foreground/15 bg-[#0d0d0d] p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ${className}`}
  >
    <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
    <div className="relative overflow-hidden rounded-[1.9rem] bg-[#141414] px-4 pb-5 pt-9 text-white">{children}</div>
  </div>
);

/** Terminal que "escribe" sus líneas al entrar en pantalla */
export const TerminalFrame = ({ title, lines, note }) => (
  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] font-mono text-[12px] leading-relaxed text-white/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
      </div>
      <span className="text-[10px] text-white/35">{title}</span>
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
              ? 'text-white/90'
              : line.startsWith('❯')
                ? 'text-accent'
                : line.startsWith('✔')
                  ? 'text-emerald-400'
                  : line.startsWith('?')
                    ? 'text-white/85'
                    : ''
          }
        >
          {line}
        </motion.div>
      ))}
      <span className="mt-1 inline-block h-3.5 w-2 animate-pulse bg-accent/80 align-middle" />
    </motion.div>
    {note && <div className="border-t border-white/[0.06] px-4 py-2 text-[10px] text-white/30">{note}</div>}
  </div>
);
