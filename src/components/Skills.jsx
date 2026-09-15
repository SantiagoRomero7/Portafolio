import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, BookOpen, Check, CircleDashed, Hourglass } from 'lucide-react';
import { spotlight } from '../hooks/spotlight';

// En lugar de autoevaluar niveles, cada tecnología dice dónde se usó
const categories = [
  {
    num: '01',
    key: 'frontend',
    skills: [
      { name: 'JavaScript', used: ['DataFlix', 'DistribApp'] },
      { name: 'React', used: ['MisFinanzas', '@site'] },
      { name: 'React Native', used: ['DistribApp'] },
      { name: 'Next.js', used: ['Automatizaciones'] },
      { name: 'TypeScript', used: ['MisFinanzas', 'Automatizaciones'] },
      { name: 'Tailwind CSS', used: ['MisFinanzas', 'Automatizaciones', '@site'] },
      { name: 'Vue.js', used: ['ProyectoVue'] },
    ],
  },
  {
    num: '02',
    key: 'backend',
    skills: [
      { name: 'Node.js', used: ['GymMaster', 'Pizza y Punto'] },
      { name: 'Express', used: ['ViajaYaAPI'] },
      { name: 'APIs REST', used: ['ViajaYaAPI'] },
      { name: 'JWT', used: ['ViajaYaAPI'] },
      { name: 'Python', used: ['Cajasan'] },
    ],
  },
  {
    num: '03',
    key: 'databases',
    skills: [
      { name: 'Supabase · PostgreSQL', used: ['DistribApp', 'MisFinanzas'] },
      { name: 'MongoDB', used: ['GymMaster', 'Pizza y Punto'] },
      { name: 'MySQL', used: ['VeterinariaSQL'] },
    ],
  },
  {
    num: '04',
    key: 'automation',
    wide: true,
    skills: [
      { name: 'Python · pandas · openpyxl', used: ['Cajasan'] },
      { name: 'Power Automate', used: ['Cajasan'] },
      { name: 'Pix RPA', used: ['Cajasan'] },
      { name: 'OCR (Tesseract · easyocr)', used: ['Cajasan'] },
    ],
  },
  {
    num: '05',
    key: 'tools',
    skills: [
      { name: 'Git · GitHub', used: ['@all'] },
      { name: 'Vite', used: ['MisFinanzas', '@site'] },
      { name: 'Vercel', used: ['DistribApp', 'MisFinanzas', 'Automatizaciones'] },
      { name: 'GitHub Actions', used: ['Automatizaciones'] },
    ],
  },
];

const learning = [
  { status: 'done', icon: Check, items: ['TypeScript', 'Next.js', 'CI · GitHub Actions'] },
  { status: 'progress', icon: Hourglass, items: ['n8n'] },
  { status: 'next', icon: CircleDashed, items: ['Docker', 'Testing'] },
];

const usedLabel = (used, lang) =>
  used
    .map((u) =>
      u === '@site' ? (lang === 'es' ? 'este portafolio' : 'this portfolio') : u === '@all' ? (lang === 'es' ? 'todos' : 'all') : u,
    )
    .join(' · ');

const Skills = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';

  return (
    <section id="skills" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('skills.label')}</div>
          <h2 className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
            {t('skills.title_1')} <span className="accent-italic">{t('skills.title_accent')}</span>
          </h2>
          <p className="mb-16 max-w-2xl text-lg text-foreground/35">{t('skills.subtitle')}</p>
        </motion.div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: catIdx * 0.06, duration: 0.4 }}
              className={`spotlight card p-6 ${cat.wide ? 'lg:col-span-2' : ''}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="text-lg font-bold text-accent">{cat.num}</span>
                <h3 className="text-lg font-bold">{t(`skills.${cat.key}`)}</h3>
              </div>
              <div className={cat.wide ? 'grid gap-x-10 sm:grid-cols-2' : ''}>
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-baseline justify-between gap-4 border-b border-foreground/[0.04] py-3 last:border-b-0"
                  >
                    <span className="shrink-0 text-sm text-foreground/75">{skill.name}</span>
                    <span className="text-right text-[11px] text-foreground/30">{usedLabel(skill.used, lang)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

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

          <div className="relative grid gap-4 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-emerald-400/40 via-accent/40 to-foreground/10 md:block" />
            {learning.map(({ status, icon: Icon, items }) => (
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
                  <Icon size={16} />
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
