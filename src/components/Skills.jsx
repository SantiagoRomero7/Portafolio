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
      { name: 'React', level: 'advanced' },
      { name: 'Vue.js', level: 'intermediate' },
      { name: 'HTML5/CSS3', level: 'advanced' },
    ],
  },
  {
    num: '02',
    key: 'backend',
    skills: [
      { name: 'Node.js', level: 'advanced' },
      { name: 'Express', level: 'advanced' },
      { name: 'Python', level: 'intermediate' },
      { name: 'APIs REST', level: 'advanced' },
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
      { name: 'Vite/Vercel', level: 'advanced' },
      { name: 'Docker', level: 'intermediate' },
    ],
  },
];

const learningItems = [
  { name: 'React (Avanzado)', status: 'progress' },
  { name: 'TypeScript', status: 'studying' },
  { name: 'Next.js', status: 'next' },
];

const statusLabels = {
  progress: { es: 'EN PROGRESO', en: 'IN PROGRESS' },
  studying: { es: 'ESTUDIANDO', en: 'STUDYING' },
  next: { es: 'PRÓXIMO', en: 'NEXT' },
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
          <p className="text-white/30 text-lg mb-16 max-w-2xl">
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
                    className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-b-0"
                  >
                    <span className="text-sm text-white/60">{skill.name}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      skill.level === 'advanced' ? 'text-accent' : 'text-white/25'
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
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {learningItems.map((item) => (
              <div key={item.name} className="card px-5 py-4">
                <p className="text-sm font-medium text-white/70 mb-1">{item.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent/70">
                  {statusLabels[item.status][i18n.language] || statusLabels[item.status].en}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-white/30 text-sm mb-5">{t('skills.learning_desc')}</p>
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
