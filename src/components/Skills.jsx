import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, BookOpen, Check, CircleDashed, Globe, Hourglass, Repeat, ScanText } from 'lucide-react';
import {
  SiCss,
  SiExpo,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWordpress,
} from 'react-icons/si';
import { N8nIcon, OracleIcon, PixIcon, PowerAutomateIcon, PowerBIIcon } from './BrandIcons';

// color null = usa el color del texto (logos negros como Next.js, Express o Vercel)
// used: proyectos donde se aplicó; vacío = aprendido en la formación
const tech = [
  { name: 'React', cat: 'frontend', Icon: SiReact, color: '#61DAFB', used: ['MisFinanzas', '@site'] },
  { name: 'React Native', cat: 'frontend', Icon: SiReact, color: '#61DAFB', used: ['DistribApp'] },
  { name: 'Next.js', cat: 'frontend', Icon: SiNextdotjs, color: null, used: ['Automatizaciones'] },
  { name: 'TypeScript', cat: 'frontend', Icon: SiTypescript, color: '#3178C6', used: ['MisFinanzas', 'Automatizaciones'] },
  { name: 'JavaScript', cat: 'frontend', Icon: SiJavascript, color: '#F7DF1E', used: ['FoodStars', 'DataFlix', 'DistribApp'] },
  { name: 'Vue.js', cat: 'frontend', Icon: SiVuedotjs, color: '#4FC08D', used: ['ProyectoVue'] },
  { name: 'Tailwind CSS', cat: 'frontend', Icon: SiTailwindcss, color: '#06B6D4', used: ['MisFinanzas', 'Automatizaciones', '@site'] },
  { name: 'HTML5', cat: 'frontend', Icon: SiHtml5, color: '#E34F26', used: ['DataFlix', 'FoodStars'] },
  { name: 'CSS', cat: 'frontend', Icon: SiCss, color: '#1572B6', used: ['DataFlix', 'FoodStars'] },
  { name: 'Framer Motion', cat: 'frontend', Icon: SiFramer, color: null, used: ['Automatizaciones', '@site'] },
  { name: 'Expo', cat: 'frontend', Icon: SiExpo, color: null, used: ['DistribApp'] },
  { name: 'WordPress', cat: 'frontend', Icon: SiWordpress, color: '#21759B', used: [] },

  { name: 'Node.js', cat: 'backend', Icon: SiNodedotjs, color: '#5FA04E', used: ['FoodStars', 'GymMaster', 'Pizza y Punto'] },
  { name: 'Express', cat: 'backend', Icon: SiExpress, color: null, used: ['FoodStars', 'ViajaYaAPI'] },
  { name: 'Python', cat: 'backend', Icon: SiPython, color: '#3776AB', used: ['Cajasan'] },
  { name: 'APIs REST', cat: 'backend', Icon: Globe, color: '#c8a97e', used: ['FoodStars', 'ViajaYaAPI'] },
  { name: 'JWT', cat: 'backend', Icon: SiJsonwebtokens, color: '#D63AFF', used: ['FoodStars', 'ViajaYaAPI'] },

  { name: 'PostgreSQL', cat: 'databases', Icon: SiPostgresql, color: '#4169E1', used: ['DistribApp', 'MisFinanzas'] },
  { name: 'Supabase', cat: 'databases', Icon: SiSupabase, color: '#3FCF8E', used: ['DistribApp', 'MisFinanzas'] },
  { name: 'MongoDB', cat: 'databases', Icon: SiMongodb, color: '#47A248', used: ['FoodStars', 'GymMaster', 'Pizza y Punto'] },
  { name: 'MySQL', cat: 'databases', Icon: SiMysql, color: '#4479A1', used: ['VeterinariaSQL'] },
  { name: 'Oracle SQL', cat: 'databases', Icon: OracleIcon, color: '#F80000', used: [] },

  { name: 'Python · pandas', cat: 'automation', Icon: SiPandas, color: null, used: ['Cajasan'] },
  { name: 'Power Automate', cat: 'automation', Icon: PowerAutomateIcon, color: '#0066FF', used: ['Cajasan'] },
  { name: 'n8n', cat: 'automation', Icon: N8nIcon, color: '#EA4B71', used: ['Cajasan'] },
  { name: 'Power BI', cat: 'automation', Icon: PowerBIIcon, color: '#F2C811', used: ['Cajasan'] },
  { name: 'Pix Studio', cat: 'automation', Icon: PixIcon, color: '#7C3AED', used: ['Cajasan'] },
  { name: 'OCR', cat: 'automation', Icon: ScanText, color: '#c8a97e', used: ['Cajasan'] },

  { name: 'Git', cat: 'tools', Icon: SiGit, color: '#F05032', used: ['@all'] },
  { name: 'GitHub', cat: 'tools', Icon: SiGithub, color: null, used: ['@all'] },
  { name: 'GitHub Actions', cat: 'tools', Icon: SiGithubactions, color: '#2088FF', used: ['Automatizaciones'] },
  { name: 'Vite', cat: 'tools', Icon: SiVite, color: '#9B6BFF', used: ['MisFinanzas', '@site'] },
  { name: 'Vercel', cat: 'tools', Icon: SiVercel, color: null, used: ['DistribApp', 'MisFinanzas', 'Automatizaciones'] },
  { name: 'Postman', cat: 'tools', Icon: SiPostman, color: '#FF6C37', used: ['FoodStars', 'ViajaYaAPI'] },
  { name: 'Scrum', cat: 'tools', Icon: Repeat, color: '#c8a97e', used: ['Campuslands'] },
];

const cats = ['all', 'frontend', 'backend', 'databases', 'automation', 'tools'];

const usedLabel = (used, lang) =>
  used
    .map((u) => {
      if (u === '@site') return lang === 'es' ? 'este portafolio' : 'this portfolio';
      if (u === '@all') return lang === 'es' ? 'todos mis proyectos' : 'all my projects';
      return u;
    })
    .join(' · ');

const Tile = ({ item, lang, fallback }) => {
  const { Icon } = item;
  const brand = item.color ?? 'rgb(var(--color-text))';
  const count = item.used.filter((u) => u !== '@all').length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      style={{ '--brand': brand }}
      className="tech-tile group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4"
    >
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: brand }}
      />
      <div className="relative flex items-start justify-between">
        <Icon
          size={30}
          style={item.color ? { color: item.color } : undefined}
          className={`transition-transform duration-300 group-hover:scale-110 ${item.color ? '' : 'text-foreground'}`}
        />
        {count > 0 && (
          <span className="rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[10px] font-semibold tabular-nums text-foreground/40">
            ×{count}
          </span>
        )}
      </div>
      <div className="relative mt-6">
        <p className="text-sm font-semibold text-foreground/85">{item.name}</p>
        <p className="mt-1 line-clamp-2 h-[2.75em] text-[11px] leading-snug text-foreground/35">
          {item.used.length ? usedLabel(item.used, lang) : fallback}
        </p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const [cat, setCat] = useState('all');
  const visible = cat === 'all' ? tech : tech.filter((x) => x.cat === cat);

  const learning = [
    { status: 'done', icon: Check, items: ['TypeScript', 'Next.js', 'n8n', 'CI · GitHub Actions'] },
    { status: 'progress', icon: Hourglass, items: [t('skills.english'), t('skills.degree')] },
    { status: 'next', icon: CircleDashed, items: ['Docker', 'Testing'] },
  ];

  return (
    <section id="skills" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <div className="section-label">{t('skills.label')}</div>
            <h2 className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
              {t('skills.title_1')} <span className="accent-italic">{t('skills.title_accent')}</span>
            </h2>
            <p className="max-w-2xl text-lg text-foreground/35">{t('skills.subtitle')}</p>
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="text-5xl font-extrabold tracking-tight text-accent">{tech.length}</p>
            <p className="text-xs uppercase tracking-widest text-foreground/35">{t('skills.summary')}</p>
          </div>
        </motion.div>

        <LayoutGroup>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t('skills.label')}>
            {cats.map((c) => {
              const active = cat === c;
              const count = c === 'all' ? tech.length : tech.filter((x) => x.cat === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c)}
                  className="relative rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/25"
                >
                  {active && (
                    <motion.span
                      layoutId="skills-tab"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${active ? 'text-background' : 'text-foreground/55'}`}>
                    {t(`skills.cats.${c}`)} <span className="ml-1 opacity-50">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item) => (
                <Tile key={item.name} item={item} lang={lang} fallback={t('skills.training')} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Bitácora: muestra la evolución, no una lista estática */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card p-8"
        >
          <div className="mb-2 flex items-center gap-3">
            <BookOpen size={18} className="text-accent" />
            <h3 className="text-lg font-bold text-accent">{t('skills.learning_label')}</h3>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-foreground/40">{t('skills.learning_intro')}</p>

          <div className="relative grid gap-8 md:grid-cols-3 md:gap-4">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-emerald-400/40 via-accent/40 to-foreground/10 md:block" />
            {learning.map(({ status, icon: StatusIcon, items }) => (
              <div key={status} className="relative">
                <div
                  className={`relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border bg-background ${
                    status === 'done'
                      ? 'border-emerald-400/40 text-emerald-400'
                      : status === 'progress'
                        ? 'border-accent/40 text-accent'
                        : 'border-foreground/15 text-foreground/40'
                  }`}
                >
                  <StatusIcon size={16} />
                </div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
                  {t(`skills.learning.${status}`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((name) => (
                    <span
                      key={name}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        status === 'done'
                          ? 'border-emerald-400/20 text-foreground/80'
                          : status === 'progress'
                            ? 'border-accent/25 text-foreground/70'
                            : 'border-dashed border-foreground/15 text-foreground/45'
                      }`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-foreground/[0.04] pt-8 text-center">
            <p className="mb-5 text-sm text-foreground/30">{t('skills.learning_desc')}</p>
            <Link to="contact" smooth={true} offset={-80}>
              <button className="btn-primary text-sm">
                {t('skills.cta_talk')} <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
