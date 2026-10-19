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
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { tilt } from '../hooks/tilt';

const IRIS = '#8052ff';

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
      { name: 'APIs REST', Icon: Globe, color: IRIS, used: ['FoodStars', 'ViajaYaAPI'] },
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
      { name: 'OCR', Icon: ScanText, color: IRIS, used: ['Cajasan'] },
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
      { name: 'Scrum', Icon: Repeat, color: IRIS, used: ['Campuslands'] },
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
  // El color de marca solo existe como variable: lo aplica el CSS al pasar
  return (
    <div title={text} style={{ '--brand': item.color ?? 'rgb(var(--c-text))' }} className="tech-chip">
      <Icon size={20} className="shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-caption font-medium text-ink">{item.name}</p>
        <p className="truncate text-[11px] text-smoke">{text}</p>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const fallback = t('skills.training');

  return (
    <section id="skills" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="05"
            label={t('skills.label')}
            title={t('skills.title_1')}
            accent={t('skills.title_accent')}
            lede={t('skills.subtitle')}
          />
          <Reveal delay={0.1} className="shrink-0 lg:pb-2 lg:text-right">
            <p className="stat">{total}</p>
            <p className="eyebrow mt-3">{t('skills.summary')}</p>
          </Reveal>
        </div>

        {/* Stack principal: seis fichas separadas solo por líneas */}
        <div className="mt-16 lg:mt-24">
          <p className="eyebrow">{t('skills.core_label')}</p>
          {/* Un hueco de 1px entre celdas: el lienzo asoma y hace de regla,
              sin que ninguna ficha lleve contorno propio */}
          <div className="mt-6 grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6">
            {core.map((item, i) => {
              const { Icon } = item;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                  style={{ '--brand': item.color }}
                  className="depth group relative"
                  {...tilt(13)}
                >
                  <div className="relative bg-paper px-5 py-8">
                    {/* El logo flota por encima de la ficha: con la inclinación
                        se separa de verdad en Z, no gira pegado al plano */}
                    <span className="depth-near relative block w-fit">
                      <Icon
                        size={34}
                        className="text-smoke transition-colors duration-500 group-hover:text-[var(--brand)]"
                      />
                    </span>
                    <p className="depth-mid relative mt-7 text-body font-medium text-ink">{item.name}</p>
                    <p className="relative mt-2 text-[11px] leading-snug text-smoke">
                      {t(`skills.core.${item.role}`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Inventario por capa del sistema */}
        <div className="mt-20">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="rule grid gap-x-10 gap-y-7 py-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <span className="text-label text-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h-sub mt-3">{t(`skills.groups.${group.key}.title`)}</h3>
                <p className="mt-2.5 max-w-xs text-caption leading-relaxed text-muted">
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

        <Reveal>
          <div className="rule flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
            <p className="max-w-md text-graphite">{t('skills.cta_desc')}</p>
            <Link to="contact" smooth duration={800} offset={-100} className="shrink-0">
              <button className="btn-outline">
                {t('skills.cta_talk')} <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
