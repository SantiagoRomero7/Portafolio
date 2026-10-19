import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Github } from 'lucide-react';
import { BrowserFrame } from './Visuals';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { AUTOMATION_REPO, AUTOMATION_URL, automationSlides } from '../data/projects';

// Caso real del sitio: ~1 semana laboral → 15 segundos
const START = 40 * 3600;
const END = 15;

const clock = (sec) => {
  const t = Math.max(0, Math.round(sec));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  return [h, m, t % 60].map((v) => String(v).padStart(2, '0')).join(':');
};

const tech = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'GitHub Actions'];

const Gallery = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % automationSlides.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const slide = automationSlides[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <a href={AUTOMATION_URL} target="_blank" rel="noopener noreferrer" className="group block">
        <BrowserFrame url="portafolio-automatizacion.vercel.app">
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.key}
              src={slide.src}
              alt={t(`featured.slides.${slide.key}`)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-pill bg-lime px-4 py-2 text-label uppercase text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t('featured.cta_site')} <ArrowUpRight size={12} />
          </span>
        </BrowserFrame>
      </a>

      <div className="mt-5 flex items-center justify-between gap-5">
        <p className="text-caption text-muted">{t(`featured.slides.${slide.key}`)}</p>
        <div className="flex gap-2">
          {automationSlides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t(`featured.slides.${s.key}`)}
              className={`h-[3px] transition-all duration-700 ease-out ${
                i === index ? 'w-10 bg-ink' : 'w-4 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Featured = () => {
  const { t, i18n } = useTranslation();
  const clockRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: clockRef, offset: ['start 0.9', 'start 0.35'] });
  const seconds = useTransform(scrollYProgress, (v) => START * Math.pow(END / START, v));
  const clockText = useTransform(seconds, clock);
  const bar = useTransform(seconds, (s) => Math.max(s / START, 0.004));
  const [done, setDone] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setDone(v >= 0.999));

  const fastest = new Intl.NumberFormat(i18n.language === 'es' ? 'es-CO' : 'en-US').format(9600);
  const stats = [
    { value: '25', key: 'tools' },
    { value: '~126 h', key: 'time' },
    { value: `×${fastest}`, key: 'fastest' },
    { value: '5', key: 'areas' },
  ];

  return (
    <section id="featured" className="section band relative overflow-hidden">
      <div className="shell">
        <SectionHeading
          index="03"
          label={t('featured.label')}
          title={t('featured.title_1')}
          accent={t('featured.title_accent')}
        />

        <div className="mt-16 grid items-start gap-x-14 gap-y-14 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" amount={0.1}>
            <Gallery />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="space-y-5">
                <p className="text-body-lg font-light leading-relaxed text-foreground/90">{t('featured.p1')}</p>
                <p className="font-light leading-relaxed text-muted">{t('featured.p2')}</p>
              </div>
            </Reveal>

            {/* El reloj del sitio, en miniatura y guiado por el scroll */}
            <Reveal delay={0.12}>
              <div ref={clockRef} className="mt-10 pt-7" style={{ borderTop: '1px solid var(--line)' }}>
                <p className="eyebrow">
                  {done ? t('featured.clock_done') : t('featured.clock_label')}
                </p>
                <motion.p
                  className={`nums mt-3 font-mono text-[clamp(2.25rem,6vw,3.5rem)] leading-none transition-colors duration-700 ${
                    done ? 'text-ink' : 'text-graphite'
                  }`}
                >
                  {clockText}
                </motion.p>
                <div className="mt-5 h-px w-full bg-ink/10">
                  <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-ink" />
                </div>
                <p className="mt-3 text-caption text-muted/80">{t('featured.clock_note')}</p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8">
                {stats.map((s) => (
                  <div key={s.key} className="py-4" style={{ borderTop: '1px solid var(--line)' }}>
                    <dd className="nums text-[clamp(1.75rem,1rem+1.8vw,2.25rem)] font-medium leading-none tracking-[-0.04em] text-ink">{s.value}</dd>
                    <dt className="mt-1 text-caption text-muted">{t(`featured.stats.${s.key}`)}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href={AUTOMATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('featured.cta_site')} <ArrowUpRight size={15} />
                </a>
                <a href={AUTOMATION_REPO} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Github size={15} /> {t('featured.cta_code')}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
