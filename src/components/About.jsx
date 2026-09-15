import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, GraduationCap, Languages, Layers, MapPin, Target, Users, Zap } from 'lucide-react';

const image = '/img/perfil.png';

const principles = [
  { key: 'architecture', Icon: Layers },
  { key: 'performance', Icon: Zap },
  { key: 'ux', Icon: Users },
  { key: 'impact', Icon: Target },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="section-label">{t('about.label')}</div>

          <h2 className="mb-16 max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
            {t('about.title_1')}
            <br />
            {t('about.title_2')} <span className="accent-italic">{t('about.title_accent')}</span>
          </h2>

          <div className="grid gap-16 lg:grid-cols-5">
            <div className="space-y-10 lg:col-span-3">
              <div className="space-y-6 text-lg leading-relaxed text-foreground/50">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>

              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
                  {t('about.principles_label')}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {principles.map(({ key, Icon }) => (
                    <div key={key} className="card flex gap-3 p-4">
                      <Icon size={17} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-semibold text-foreground/85">{t(`about.principles.${key}.title`)}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-foreground/40">
                          {t(`about.principles.${key}.desc`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Link to="contact" smooth={true} offset={-80}>
                  <button className="btn-primary">
                    {t('about.cta_talk')} <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="experience" smooth={true} offset={-80}>
                  <button className="btn-ghost">{t('about.cta_experience')}</button>
                </Link>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="card aspect-[4/5] overflow-hidden">
                <img src={image} alt="Santiago Romero" className="h-full w-full object-cover" />
              </div>

              <div className="card space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="font-medium text-emerald-400/80">{t('about.available')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/45">
                  <MapPin size={14} />
                  <span>{t('about.location')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/45">
                  <Languages size={14} />
                  <span>{t('about.languages')}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/35">{t('about.open_to')}</p>

                <div className="space-y-3 border-t border-foreground/[0.06] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
                    {t('about.education_label')}
                  </p>
                  {['edu_1', 'edu_2'].map((key) => (
                    <div key={key} className="flex gap-3">
                      <GraduationCap size={16} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-semibold text-foreground/80">{t(`about.${key}.title`)}</p>
                        <p className="text-xs text-foreground/40">{t(`about.${key}.org`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
