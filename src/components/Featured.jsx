import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Github } from 'lucide-react';
import { BrowserFrame } from './Visuals';
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
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % automationSlides.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const slide = automationSlides[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <a href={AUTOMATION_URL} target="_blank" rel="noopener noreferrer" className="group block">
        <BrowserFrame
          url="portafolio-automatizacion.vercel.app"
          className="transition-transform duration-500 group-hover:-translate-y-1"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.key}
              src={slide.src}
              alt={t(`featured.slides.${slide.key}`)}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            {t('featured.cta_site')} <ArrowUpRight size={12} />
          </span>
        </BrowserFrame>
      </a>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-foreground/40">{t(`featured.slides.${slide.key}`)}</p>
        <div className="flex gap-2">
          {automationSlides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t(`featured.slides.${s.key}`)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-accent' : 'w-3 bg-foreground/15 hover:bg-foreground/30'
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
    <section id="featured" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('featured.label')}</div>
          <h2 className="mb-16 max-w-4xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
            {t('featured.title_1')} <span className="accent-italic">{t('featured.title_accent')}</span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Gallery />
          </motion.div>

          <motion.div
            className="space-y-8 lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4 text-lg leading-relaxed text-foreground/50">
              <p>{t('featured.p1')}</p>
              <p className="text-base text-foreground/40">{t('featured.p2')}</p>
            </div>

            {/* El reloj del sitio, en miniatura y guiado por el scroll */}
            <div ref={clockRef} className="card p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/35">
                {done ? t('featured.clock_done') : t('featured.clock_label')}
              </p>
              <motion.p
                className={`mt-2 font-mono text-5xl font-bold tabular-nums tracking-tight transition-colors duration-500 ${
                  done ? 'text-accent' : 'text-foreground'
                }`}
              >
                {clockText}
              </motion.p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]">
                <motion.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-accent" />
              </div>
              <p className="mt-3 text-xs text-foreground/30">{t('featured.clock_note')}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {stats.map((s) => (
                <div key={s.key} className="border-t border-foreground/[0.06] pt-3">
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="mt-0.5 text-xs text-foreground/35">{t(`featured.stats.${s.key}`)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-[11px] font-medium text-foreground/60"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a href={AUTOMATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('featured.cta_site')} <ArrowUpRight size={16} />
              </a>
              <a
                href={AUTOMATION_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
              >
                <Github size={16} /> {t('featured.cta_code')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
