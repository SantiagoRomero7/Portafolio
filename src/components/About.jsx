import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, MapPin, Code2, Zap, Palette, BookOpen } from 'lucide-react';

const image = '/img/perfil.png';

const principleIcons = {
  clean_code: Code2,
  performance: Zap,
  ui_ux: Palette,
  continuous_learning: BookOpen,
};

const About = () => {
  const { t } = useTranslation();
  const principles = ['clean_code', 'performance', 'ui_ux', 'continuous_learning'];

  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Label */}
          <div className="section-label">{t('about.label')}</div>

          {/* Title with accent italic */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-16 max-w-3xl">
            {t('about.title_1')}<br />
            {t('about.title_2')}{' '}
            <span className="accent-italic">{t('about.title_accent')}</span>
          </h2>

          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left: text + principles */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-5 text-white/40 text-lg leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
              </div>

              {/* Principles */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-white/25 uppercase mb-4">
                  {t('about.principles_label')}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {principles.map((key) => {
                    const Icon = principleIcons[key];
                    return (
                      <div
                        key={key}
                        className="card px-4 py-3.5 flex items-center gap-3"
                      >
                        <Icon size={16} className="text-accent shrink-0" />
                        <span className="text-sm font-medium text-white/60">
                          {t(`about.principles.${key}`)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link to="contact" smooth={true} offset={-80}>
                  <button className="btn-primary">
                    {t('about.cta_talk')} <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="projects" smooth={true} offset={-80}>
                  <button className="btn-ghost">
                    {t('about.cta_projects')}
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: photo + info card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Photo */}
              <div className="relative">
                <div className="card overflow-hidden aspect-[4/5]">
                  <img
                    src={image}
                    alt="Santiago Romero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info card */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/80 font-medium">{t('about.available')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <MapPin size={14} />
                  <span>{t('about.location')}</span>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">
                  {t('about.open_to')}
                </p>

                {/* Stats */}
                <div className="flex gap-6 pt-2 border-t border-white/[0.04]">
                  <div>
                    <p className="text-2xl font-bold text-accent">2+</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/25">{t('about.years_exp')}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">10+</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/25">{t('about.projects_done')}</p>
                  </div>
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
