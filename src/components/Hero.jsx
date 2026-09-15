import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, scroller } from 'react-scroll';
import { ArrowRight, Github, Linkedin, MessageCircle } from 'lucide-react';
import { BrowserFrame, Screenshot } from './Visuals';

const stackItems = ['React', 'Node.js', 'TypeScript', 'Next.js', 'Python', 'Supabase', 'MongoDB'];

const stats = [
  { value: '25', key: 'automations' },
  { value: '1', key: 'production' },
  { value: '30+', key: 'repos' },
];

// Mazo de capturas reales: reposo apilado, se abre en abanico al pasar el mouse
const deck = [
  {
    key: 'dataflix',
    src: '/projects/dataflix.webp',
    url: 'dataflixx.netlify.app',
    target: 'projects',
    rest: { x: -60, y: 60, rotate: -8 },
    open: { x: -170, y: 100, rotate: -13 },
    depth: 10,
  },
  {
    key: 'misfinanzas',
    src: '/projects/misfinanzas.webp',
    url: 'misfinanzas-two.vercel.app',
    target: 'projects',
    rest: { x: 60, y: 25, rotate: 7 },
    open: { x: 165, y: 45, rotate: 12 },
    depth: 18,
  },
  {
    key: 'automatizacion',
    src: '/projects/automatizacion-portada.webp',
    url: 'portafolio-automatizacion.vercel.app',
    target: 'featured',
    rest: { x: 0, y: -25, rotate: -2 },
    open: { x: 0, y: -85, rotate: 0 },
    depth: 28,
  },
];

const DeckCard = ({ card, index, open, sx, sy }) => {
  const x = useTransform(sx, (v) => v * card.depth);
  const y = useTransform(sy, (v) => v * card.depth);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[190px] -mt-[140px] w-[380px]"
      style={{ zIndex: index }}
      initial={{ opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ x, y }}>
        <motion.button
          type="button"
          aria-label={card.url}
          onClick={() => scroller.scrollTo(card.target, { smooth: true, offset: -80, duration: 800 })}
          initial={false}
          animate={open ? card.open : card.rest}
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          className="block w-full cursor-pointer text-left"
        >
          <BrowserFrame url={card.url}>
            <Screenshot src={card.src} alt="" />
          </BrowserFrame>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const ProjectDeck = ({ hint }) => {
  const [open, setOpen] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18 });
  const sy = useSpring(my, { stiffness: 110, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      className="relative h-[480px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        mx.set(0);
        my.set(0);
      }}
      onMouseMove={onMove}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      {deck.map((card, i) => (
        <DeckCard key={card.key} card={card} index={i} open={open} sx={sx} sy={sy} />
      ))}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-foreground/25">
        {hint}
      </p>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-12">
        <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-7">
          <motion.div variants={item} className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 px-4 py-2 text-xs font-medium uppercase tracking-wider text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t('hero.title_1')} <span className="accent-italic">{t('hero.title_2')}</span>
          </motion.h1>

          <motion.p variants={item} className="mb-10 max-w-2xl text-lg leading-relaxed text-foreground/45 md:text-xl">
            {t('hero.subtitle')
              .split('**')
              .map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold text-foreground">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
          </motion.p>

          <motion.div variants={item} className="mb-12 flex flex-wrap items-center gap-5">
            <Link to="contact" smooth={true} offset={-80}>
              <button className="btn-primary">
                {t('hero.cta_talk')} <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="featured" smooth={true} offset={-80}>
              <button className="btn-ghost">{t('hero.cta_projects')}</button>
            </Link>
          </motion.div>

          {/* Cifras verificables */}
          <motion.div
            variants={item}
            className="mb-12 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/[0.06] pt-8"
          >
            {stats.map((s) => (
              <div key={s.key}>
                <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-foreground/35">{t(`hero.stats.${s.key}`)}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/SantiagoRomero7', Icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/santiago-romero-9a673a37a/', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://api.whatsapp.com/send/?phone=573172681209', Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-xl border border-foreground/[0.06] p-2.5 text-foreground/30 transition-all hover:border-foreground/20 hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="hidden h-6 w-px bg-foreground/10 sm:block" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-widest text-foreground/25">
                {t('hero.stack_label')}
              </span>
              {stackItems.map((s) => (
                <span key={s} className="rounded-md border border-foreground/[0.06] px-2.5 py-1 text-xs text-foreground/30">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="hidden lg:col-span-5 lg:block">
          <ProjectDeck hint={t('hero.deck_hint')} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
