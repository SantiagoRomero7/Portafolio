import Reveal, { RevealWords } from './Reveal';

/**
 * Encabezado de sección: número y etiqueta en monoespaciada sobre una regla, y
 * debajo el titular condensado en caja alta. Todas las secciones usan el mismo
 * bloque, así el ojo encuentra siempre la misma referencia al bajar.
 */
const SectionHeading = ({ index, label, title, accent, lede, align = 'left', className = '', children }) => {
  // El trozo acentuado entra después del titular, no a la vez
  const accentDelay = 0.05 + String(title).split(' ').length * 0.05;

  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      <Reveal y={12}>
        <div
          className={`flex items-baseline gap-5 pb-5 ${align === 'center' ? 'justify-center' : ''}`}
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          {index && <span className="text-label text-ink">{index}</span>}
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <h2 className={`mt-8 text-h2 ${align === 'center' ? 'mx-auto' : 'max-w-5xl'}`}>
        <RevealWords text={title} delay={0.05} />
        {accent && (
          <>
            {' '}
            <RevealWords text={accent} delay={accentDelay} highlight />
          </>
        )}
      </h2>

      {lede && (
        <Reveal delay={0.14}>
          <p className={`lede mt-6 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{lede}</p>
        </Reveal>
      )}

      {children}
    </div>
  );
};

export default SectionHeading;
