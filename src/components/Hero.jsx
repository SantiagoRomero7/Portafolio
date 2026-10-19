import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowDown, ArrowRight, Github, Linkedin, MessageCircle } from 'lucide-react';
import Reveal, { RevealWords } from './Reveal';

const stats = [
  { value: '25', key: 'automations' },
  { value: '07', key: 'projects' },
  { value: '35', key: 'tech' },
];

const socials = [
  { href: 'https://github.com/SantiagoRomero7', Icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/santiago-romero-9a673a37a/', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://api.whatsapp.com/send/?phone=573172681209', Icon: MessageCircle, label: 'WhatsApp' },
];

// La línea de 1px dentro del bloque invertido se dibuja con el color del texto
// invertido, no con el --line del lienzo.
const invRule = { borderTop: '1px solid rgb(var(--c-inv-fg) / 0.18)' };
const invRuleLeft = { borderLeft: '1px solid rgb(var(--c-inv-fg) / 0.18)' };

/**
 * Chapa circular con el texto girando sobre su propio trazo. No decora: es el
 * indicador de desplazamiento, y de paso la firma de la portada. Va en posición
 * absoluta para no empujar el contenido fuera de la primera pantalla.
 */
const ScrollBadge = () => (
  <Link
    to="about"
    smooth
    duration={1100}
    offset={-100}
    aria-label="Scroll"
    className="group relative flex h-[104px] w-[104px] cursor-pointer items-center justify-center text-ink"
  >
    <svg viewBox="0 0 100 100" aria-hidden className="badge-spin absolute inset-0 h-full w-full">
      <defs>
        <path id="badge-ring" fill="none" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
      </defs>
      <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text fill="currentColor" fontSize="8" letterSpacing="0.5" className="uppercase">
        <textPath href="#badge-ring" startOffset="0" textLength="226" lengthAdjust="spacing">
          scroll · desplaza · scroll · desplaza
        </textPath>
      </text>
    </svg>
    <ArrowDown size={15} className="transition-transform duration-700 ease-out group-hover:translate-y-1" />
  </Link>
);

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="home"
        className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-32 sm:pt-36"
      >
        <div className="shell relative z-10 w-full">
          {/* Cabecera de metadatos: la voz monoespaciada que usan las tres
              referencias para situar la página antes de que hable el titular. */}
          <Reveal y={12}>
            <div
              className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 pb-5 text-label uppercase text-smoke"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <span className="text-ink">Santiago Romero</span>
              <span>{t('hero.badge')}</span>
              <span className="hidden sm:inline">Bucaramanga, CO</span>
            </div>
          </Reveal>

          {/* El titular ES la imagen de la página: condensado, en caja alta y
              comprimido, a todo el ancho. Por eso ya no hay objeto decorativo. */}
          <h1 className="mt-8 text-display-lg">
            <RevealWords text={t('hero.title_1')} delay={0.06} />{' '}
            <RevealWords
              text={t('hero.title_2')}
              delay={0.06 + t('hero.title_1').split(' ').length * 0.05}
              highlightLast
            />
          </h1>

          <div className="mt-11 grid items-start gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal delay={0.18}>
                <p className="lede max-w-xl">
                  {t('hero.subtitle')
                    .split('**')
                    .map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="font-medium text-ink">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link to="contact" smooth duration={900} offset={-100}>
                    <button className="btn-primary">
                      {t('hero.cta_talk')} <ArrowRight size={15} />
                    </button>
                  </Link>
                  <Link to="featured" smooth duration={900} offset={-100}>
                    <button className="btn-outline">{t('hero.cta_projects')}</button>
                  </Link>

                  <div className="ml-auto flex items-center gap-4">
                    {socials.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-smoke transition-colors duration-500 hover:text-ink"
                      >
                        <Icon size={17} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* El bloque invertido. Es el acontecimiento gráfico del hero —lo
                que antes intentaba ser un objeto 3D— y lleva información real. */}
            <Reveal delay={0.3} className="lg:col-span-5">
              <div className="band-ink rounded-card p-6 sm:p-7">
                <p className="text-label uppercase opacity-55">{t('hero.status_label')}</p>

                <p className="mt-4 flex items-start gap-3 text-body-lg leading-snug">
                  <span className="mt-[0.45rem] h-2.5 w-2.5 shrink-0 rounded-pill bg-lime" />
                  {t('about.available')}
                </p>

                <dl className="mt-6">
                  {[
                    { k: 'loc', label: 'Base', value: t('about.location') },
                    { k: 'lang', label: 'Idiomas / Languages', value: t('about.languages') },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                      style={invRule}
                    >
                      <dt className="text-label uppercase opacity-55">{row.label}</dt>
                      <dd className="text-sm">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="pt-3.5 text-caption leading-relaxed opacity-70" style={invRule}>
                  {t('about.open_to')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Fuera del flujo: la chapa no debe empujar nada hacia abajo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block">
          <div className="shell">
            <span className="pointer-events-auto inline-block">
              <ScrollBadge />
            </span>
          </div>
        </div>
      </section>

      {/* Las cifras salen del lienzo y se van a una banda de tinta a sangre.
          Pegada a la cinta del stack forman un solo bloque negro: el
          acontecimiento gráfico que separa la portada del resto de la página, y
          la razón de que el hero ya no necesite ningún objeto flotante. */}
      <div className="band-ink">
        <div className="shell">
          <dl className="grid grid-cols-3 py-12 sm:py-14">
            {stats.map((s, i) => (
              <div key={s.key} className={i > 0 ? 'pl-5 sm:pl-10' : ''} style={i > 0 ? invRuleLeft : undefined}>
                <dt className="sr-only">{t(`hero.stats.${s.key}`)}</dt>
                <dd>
                  <span className="block text-stat font-medium tabular-nums">{s.value}</span>
                  <span className="mt-3 block max-w-[20ch] text-caption leading-snug opacity-60">
                    {t(`hero.stats.${s.key}`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default Hero;
