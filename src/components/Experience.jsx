import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

// De lo más reciente a lo más antiguo
const items = [
  {
    key: 'cajasan',
    kind: 'work',
    current: true,
    tags: ['Python', 'pandas', 'Power Automate', 'n8n', 'Power BI', 'Pix Studio', 'OCR'],
    target: 'featured',
  },
  {
    key: 'freelance',
    kind: 'work',
    tags: ['React Native', 'Expo', 'Supabase', 'PostgreSQL'],
    target: 'projects',
  },
  { key: 'udes', kind: 'education', current: true, tags: [] },
  {
    key: 'campuslands',
    kind: 'education',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'MySQL', 'React', 'Vue.js', 'Git', 'Scrum'],
    target: 'projects',
  },
];

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeading
          index="02"
          label={t('experience.label')}
          title={t('experience.title_1')}
          accent={t('experience.title_accent')}
        />

        {/* El raíl vertical solo existe en escritorio: en móvil estorba */}
        <ol className="relative mt-16 lg:mt-24">
          <span
            aria-hidden
            className="absolute bottom-10 left-0 top-10 hidden w-px lg:block"
            style={{ background: 'var(--line)' }}
          />

          {items.map((item, i) => {
            const base = `experience.items.${item.key}`;
            const points = t(`${base}.points`, { returnObjects: true });
            const KindIcon = item.kind === 'education' ? GraduationCap : Briefcase;

            return (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid gap-x-10 gap-y-5 py-10 lg:grid-cols-12 lg:pl-12"
                style={{ borderTop: '1px solid var(--line)' }}
              >
                {/* Punto del raíl */}
                <span
                  aria-hidden
                  className={`absolute left-[-5px] top-[3.2rem] hidden h-2.5 w-2.5 rounded-pill lg:block ${
                    item.current ? 'bg-lime' : 'bg-ash'
                  }`}
                  style={{ outline: '5px solid rgb(var(--c-canvas))' }}
                />

                {/* Columna de fecha */}
                <div className="lg:col-span-3">
                  <p
                    className={`text-label uppercase ${item.current ? 'text-ink' : 'text-smoke'}`}
                  >
                    {t(`${base}.when`)}
                  </p>
                  <p className="mt-2 text-sm text-muted">{t(`${base}.org`)}</p>
                </div>

                {/* Contenido */}
                <div className="lg:col-span-9">
                  <div className="flex items-center gap-3">
                    <KindIcon size={16} className="shrink-0 text-muted/70" />
                    <h3 className="h-sub">{t(`${base}.role`)}</h3>
                  </div>

                  <p className="mt-4 max-w-2xl font-light leading-relaxed text-muted">{t(`${base}.summary`)}</p>

                  {Array.isArray(points) && points.length > 0 && (
                    <ul className="mt-6 grid max-w-3xl gap-2.5 sm:grid-cols-2">
                      {points.map((p) => (
                        <li key={p} className="flex gap-3 text-caption leading-relaxed text-muted">
                          <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-muted/50" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(item.tags.length > 0 || item.target) && (
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.target && (
                        <Link
                          to={item.target}
                          smooth
                          duration={800}
                          offset={-100}
                          className="link-iris cursor-pointer whitespace-nowrap"
                        >
                          {t(`${base}.cta`)}
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <Reveal>
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
