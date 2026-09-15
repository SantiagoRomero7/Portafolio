import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import { spotlight } from '../hooks/spotlight';

const items = [
  {
    key: 'cajasan',
    current: true,
    tags: ['Python', 'pandas', 'openpyxl', 'OCR', 'Power Automate', 'Pix RPA', 'Tkinter'],
    target: 'featured',
  },
  {
    key: 'freelance',
    tags: ['React Native', 'Expo', 'Supabase', 'PostgreSQL'],
    target: 'projects',
  },
  {
    key: 'self',
    tags: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'React', 'Vue.js', 'Git'],
    target: 'projects',
  },
];

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('experience.label')}</div>
          <h2 className="mb-16 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
            {t('experience.title_1')} <span className="accent-italic">{t('experience.title_accent')}</span>
          </h2>
        </motion.div>

        <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-foreground/[0.08] md:before:left-[calc(25%-1px)]">
          {items.map((item, i) => {
            const base = `experience.items.${item.key}`;
            const points = t(`${base}.points`, { returnObjects: true });
            return (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative grid gap-4 pl-8 md:grid-cols-4 md:gap-10 md:pl-0"
              >
                {/* Punto de la línea de tiempo */}
                <span
                  className={`absolute left-0 top-8 h-[15px] w-[15px] rounded-full border-2 border-background md:left-[calc(25%-8px)] ${
                    item.current ? 'bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]' : 'bg-accent'
                  }`}
                />

                <div className="md:pr-10 md:pt-7 md:text-right">
                  <p
                    className={`text-[11px] font-bold uppercase tracking-widest ${
                      item.current ? 'text-emerald-400' : 'text-accent'
                    }`}
                  >
                    {t(`${base}.when`)}
                  </p>
                  <p className="mt-1 text-sm text-foreground/40">{t(`${base}.org`)}</p>
                </div>

                <div onMouseMove={spotlight} className="spotlight card p-7 md:col-span-3 md:ml-4 lg:p-8">
                  <h3 className="mb-3 text-2xl font-bold">{t(`${base}.role`)}</h3>
                  <p className="mb-5 leading-relaxed text-foreground/50">{t(`${base}.summary`)}</p>
                  {Array.isArray(points) && (
                    <ul className="mb-6 space-y-2">
                      {points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-foreground/60">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-foreground/[0.08] px-2.5 py-1 text-[11px] text-foreground/45"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={item.target}
                      smooth={true}
                      offset={-80}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
                    >
                      {t(`${base}.cta`)} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
