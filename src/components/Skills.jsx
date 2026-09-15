import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, Globe, Repeat, ScanText } from 'lucide-react';
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

// Las 6 tecnologías que definen el perfil, con su rol
const core = [
  { name: 'React', Icon: SiReact, color: '#61DAFB', role: 'react' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', role: 'typescript' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', role: 'node' },
  { name: 'Python', Icon: SiPython, color: '#3776AB', role: 'python' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', role: 'postgresql' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', role: 'mongodb' },
];

// Inventario completo por capa. color null = color del texto (logos negros).
// used: proyectos donde se aplicó; vacío = formación
const groups = [
  {
    key: 'frontend',
    items: [
      { name: 'React', Icon: SiReact, color: '#61DAFB', used: ['MisFinanzas', '@site'] },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', used: ['MisFinanzas', 'Automatizaciones'] },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', used: ['FoodStars', 'DataFlix', 'DistribApp'] },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4', used: ['MisFinanzas', 'Automatizaciones', '@site'] },
      { name: 'React Native', Icon: SiReact, color: '#61DAFB', used: ['DistribApp'] },
      { name: 'Next.js', Icon: SiNextdotjs, color: null, used: ['Automatizaciones'] },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', used: ['DataFlix', 'FoodStars'] },
      { name: 'CSS', Icon: SiCss, color: '#1572B6', used: ['DataFlix', 'FoodStars'] },
      { name: 'Framer Motion', Icon: SiFramer, color: null, used: ['Automatizaciones', '@site'] },
      { name: 'Expo', Icon: SiExpo, color: null, used: ['DistribApp'] },
      { name: 'Vue.js', Icon: SiVuedotjs, color: '#4FC08D', used: ['ProyectoVue'] },
      { name: 'WordPress', Icon: SiWordpress, color: '#21759B', used: [] },
    ],
  },
  {
    key: 'backend',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', used: ['FoodStars', 'GymMaster', 'Pizza y Punto'] },
      { name: 'Express', Icon: SiExpress, color: null, used: ['FoodStars', 'ViajaYaAPI'] },
      { name: 'APIs REST', Icon: Globe, color: '#c8a97e', used: ['FoodStars', 'ViajaYaAPI'] },
      { name: 'JWT', Icon: SiJsonwebtokens, color: '#D63AFF', used: ['FoodStars', 'ViajaYaAPI'] },
      { name: 'Python', Icon: SiPython, color: '#3776AB', used: ['Cajasan'] },
    ],
  },
  {
    key: 'databases',
    items: [
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', used: ['FoodStars', 'GymMaster', 'Pizza y Punto'] },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', used: ['DistribApp', 'MisFinanzas'] },
      { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E', used: ['DistribApp', 'MisFinanzas'] },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1', used: ['VeterinariaSQL'] },
      { name: 'Oracle SQL', Icon: OracleIcon, color: '#F80000', used: [] },
    ],
  },
  {
    key: 'automation',
    items: [
      { name: 'Python · pandas', Icon: SiPandas, color: null, used: ['Cajasan'] },
      { name: 'Power Automate', Icon: PowerAutomateIcon, color: '#0066FF', used: ['Cajasan'] },
      { name: 'n8n', Icon: N8nIcon, color: '#EA4B71', used: ['Cajasan'] },
      { name: 'Power BI', Icon: PowerBIIcon, color: '#F2C811', used: ['Cajasan'] },
      { name: 'Pix Studio', Icon: PixIcon, color: '#7C3AED', used: ['Cajasan'] },
      { name: 'OCR', Icon: ScanText, color: '#c8a97e', used: ['Cajasan'] },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032', used: ['@all'] },
      { name: 'GitHub', Icon: SiGithub, color: null, used: ['@all'] },
      { name: 'Vercel', Icon: SiVercel, color: null, used: ['DistribApp', 'MisFinanzas', 'Automatizaciones'] },
      { name: 'Vite', Icon: SiVite, color: '#9B6BFF', used: ['MisFinanzas', '@site'] },
      { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF', used: ['Automatizaciones'] },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37', used: ['FoodStars', 'ViajaYaAPI'] },
      { name: 'Scrum', Icon: Repeat, color: '#c8a97e', used: ['Campuslands'] },
    ],
  },
];

const total = groups.reduce((acc, g) => acc + g.items.length, 0);

const usedLabel = (used, lang, fallback) =>
  used.length
    ? used
        .map((u) => {
          if (u === '@site') return lang === 'es' ? 'este portafolio' : 'this portfolio';
          if (u === '@all') return lang === 'es' ? 'todos mis proyectos' : 'all my projects';
          return u;
        })
        .join(' · ')
    : fallback;

const Chip = ({ item, lang, fallback }) => {
  const { Icon } = item;
  const text = usedLabel(item.used, lang, fallback);
  return (
    <div
      title={text}
      style={{ '--brand': item.color ?? 'rgb(var(--color-text))' }}
      className="tech-tile flex items-center gap-3 rounded-xl px-4 py-3"
    >
      <Icon
        size={22}
        style={item.color ? { color: item.color } : undefined}
        className={`shrink-0 ${item.color ? '' : 'text-foreground'}`}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground/85">{item.name}</p>
        <p className="truncate text-[11px] text-foreground/35">{text}</p>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const fallback = t('skills.training');

  return (
    <section id="skills" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <div className="section-label">{t('skills.label')}</div>
            <h2 className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
              {t('skills.title_1')} <span className="accent-italic">{t('skills.title_accent')}</span>
            </h2>
            <p className="max-w-2xl text-lg text-foreground/40">{t('skills.subtitle')}</p>
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="text-5xl font-extrabold tracking-tight text-accent">{total}</p>
            <p className="text-xs uppercase tracking-widest text-foreground/35">{t('skills.summary')}</p>
          </div>
        </motion.div>

        {/* Stack principal */}
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/35">
          {t('skills.core_label')}
        </p>
        <div className="mb-20 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {core.map((item, i) => {
            const { Icon } = item;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ '--brand': item.color }}
                className="tech-tile group relative overflow-hidden rounded-2xl p-5"
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: item.color }}
                />
                <Icon size={34} style={{ color: item.color }} className="relative" />
                <p className="relative mt-6 font-bold">{item.name}</p>
                <p className="relative mt-1 text-xs leading-snug text-foreground/40">{t(`skills.core.${item.role}`)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Inventario por capa del sistema */}
        <div className="border-b border-foreground/[0.06]">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className="grid gap-6 border-t border-foreground/[0.06] py-9 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 text-xl font-bold">{t(`skills.groups.${group.key}.title`)}</h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-foreground/40">
                  {t(`skills.groups.${group.key}.desc`)}
                </p>
              </div>
              <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                {group.items.map((item) => (
                  <Chip key={item.name} item={item} lang={lang} fallback={fallback} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-foreground/40">{t('skills.cta_desc')}</p>
          <Link to="contact" smooth={true} offset={-80}>
            <button className="btn-primary text-sm">
              {t('skills.cta_talk')} <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Skills;
