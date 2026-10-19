import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, GraduationCap, Languages, Layers, MapPin, Target, Users, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

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
    <section id="about" className="section band">
      <div className="shell">
        <SectionHeading
          index="01"
          label={t('about.label')}
          title={`${t('about.title_1')} ${t('about.title_2')}`}
          accent={t('about.title_accent')}
        />

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:mt-24 lg:grid-cols-12">
          {/* Relato */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="max-w-2xl space-y-6 text-body-lg font-light leading-relaxed text-muted">
                <p className="text-foreground/90">{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>
            </Reveal>

            {/* Principios: lista separada por líneas, sin cajas */}
            <div className="mt-14">
              <p className="eyebrow">{t('about.principles_label')}</p>
              <dl className="mt-6">
                {principles.map(({ key, Icon }, i) => (
                  <Reveal key={key} delay={i * 0.06}>
                    <div
                      className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 py-5 sm:grid-cols-[auto_11rem_1fr]"
                      style={{ borderTop: '1px solid var(--line)' }}
                    >
                      <Icon size={17} className="mt-0.5 text-ink transition-transform duration-700 ease-out group-hover:scale-110" />
                      <dt className="text-[0.95rem] font-normal text-foreground">
                        {t(`about.principles.${key}.title`)}
                      </dt>
                      <dd className="col-start-2 text-caption leading-relaxed text-muted sm:col-start-3">
                        {t(`about.principles.${key}.desc`)}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link to="contact" smooth duration={800} offset={-100}>
                  <button className="btn-primary">
                    {t('about.cta_talk')} <ArrowRight size={15} />
                  </button>
                </Link>
                <Link to="experience" smooth duration={800} offset={-100} className="cursor-pointer">
                  <span className="btn-ghost">{t('about.cta_experience')}</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Retrato y ficha */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="frame">
                <img src={image} alt="Santiago Romero" className="aspect-[4/5] w-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-8">
                <div className="flex items-center gap-2.5 pb-5 text-sm">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-pill bg-lime" />
                  <span className="text-foreground">{t('about.available')}</span>
                </div>

                {[
                  { Icon: MapPin, value: t('about.location') },
                  { Icon: Languages, value: t('about.languages') },
                ].map(({ Icon, value }) => (
                  <div key={value} className="flex items-center gap-3 py-4 text-sm text-muted" style={{ borderTop: '1px solid var(--line)' }}>
                    <Icon size={15} className="shrink-0 text-muted/70" />
                    {value}
                  </div>
                ))}

                <p className="py-4 text-caption leading-relaxed text-muted" style={{ borderTop: '1px solid var(--line)' }}>
                  {t('about.open_to')}
                </p>

                <div className="pt-6" style={{ borderTop: '1px solid var(--line)' }}>
                  <p className="eyebrow">{t('about.education_label')}</p>
                  <div className="mt-5 space-y-5">
                    {['edu_1', 'edu_2'].map((key) => (
                      <div key={key} className="flex gap-3.5">
                        <GraduationCap size={16} className="mt-0.5 shrink-0 text-muted" />
                        <div>
                          <p className="text-sm text-foreground">{t(`about.${key}.title`)}</p>
                          <p className="mt-0.5 text-caption text-muted">{t(`about.${key}.org`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
