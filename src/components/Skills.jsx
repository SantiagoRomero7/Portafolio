import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, BookOpen } from 'lucide-react';

const categories = [
  {
    num: '01',
    key: 'frontend',
    skills: [
      { name: 'JavaScript', level: 'advanced' },
      { name: 'React', level: 'intermediate' },
      { name: 'Vue.js', level: 'intermediate' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Next.js', level: 'intermediate' },
      { name: 'TypeScript', level: 'intermediate' },
    ],
  },
  {
    num: '02',
    key: 'backend',
    skills: [
      { name: 'Node.js', level: 'advanced' },
      { name: 'Express', level: 'intermediate' },
      { name: 'Python', level: 'advanced' },
      { name: 'APIs REST', level: 'advanced' },
      { name: 'Autenticación JWT', level: 'intermediate' },
    ],
  },
  {
    num: '03',
    key: 'databases',
    skills: [
      { name: 'Supabase', level: 'advanced' },
      { name: 'MongoDB', level: 'advanced' },
      { name: 'MySQL/PostgreSQL', level: 'intermediate' },
    ],
  },
  {
    num: '04',
    key: 'tools',
    skills: [
      { name: 'Git', level: 'advanced' },
      { name: 'Vite', level: 'intermediate' },
      { name: 'Vercel', level: 'advanced' },
      { name: 'Postman', level: 'intermediate' },
    ],
  },
];

const learningItems = [
  { name: 'TypeScript', status: 'progress' },
  { name: 'Automatización con n8n', status: 'progress' },
  { name: 'Docker', status: 'next' },
  { name: 'Testing', status: 'next' },
  { name: 'CI/CD básico', status: 'next' },
];

const statusLabels = {
  progress: { es: 'EN PROGRESO', en: 'IN PROGRESS' },
  next: { es: 'PRÓXIMAMENTE', en: 'UPCOMING' },
};

const Skills = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('skills.label')}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 max-w-3xl">
            {t('skills.title_1')}{' '}
            <span className="accent-italic">{t('skills.title_accent')}</span>
          </h2>
          <p className="text-foreground/30 text-lg mb-16 max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: catIdx * 0.08, duration: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-accent font-bold text-lg">{cat.num}</span>
                <h3 className="text-lg font-bold">{t(`skills.${cat.key}`)}</h3>
              </div>
              <div className="space-y-0">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex justify-between items-center py-3 border-b border-foreground/[0.04] last:border-b-0"
                  >
                    <span className="text-sm text-foreground/60">{skill.name}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      skill.level === 'advanced' ? 'text-accent' : 'text-foreground/25'
                    }`}>
                      {t(`skills.levels.${skill.level}`)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={18} className="text-accent" />
            <h3 className="text-lg font-bold text-accent">
              {t('skills.learning_label')}
            </h3>
          </div>
          <div className="space-y-12">
            {['progress', 'next'].map((statusKey) => {
              const filteredItems = learningItems.filter(item => item.status === statusKey);
              if (filteredItems.length === 0) return null;

              return (
                <div key={statusKey}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-6 flex items-center gap-4">
                    <span className="shrink-0">{statusLabels[statusKey][i18n.language] || statusLabels[statusKey].en}</span>
                    <span className="h-px w-full bg-foreground/5" />
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <div key={item.name} className="card px-5 py-6 group hover:border-accent/20 transition-colors">
                        <p className="text-sm font-medium text-foreground/70 mb-1 group-hover:text-foreground transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-accent/50 group-hover:text-accent/80 transition-colors">
                          {statusLabels[item.status][i18n.language] || statusLabels[item.status].en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12 border-t border-foreground/[0.04] pt-8">
            <p className="text-foreground/30 text-sm mb-5">{t('skills.learning_desc')}</p>
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
