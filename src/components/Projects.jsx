import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    key: 'velvet',
    img: '/img/Gemini_Generated_Image_h2xyq0h2xyq0h2xy.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    demo: 'https://santiagoromero7.github.io/Velvetco_proyecto/',
    repo: 'https://github.com/SantiagoRomero7/Velvetco_proyecto',
    status: 'production',
  },
  {
    key: 'gym',
    img: '/img/Gemini_Generated_Image_7h9ji67h9ji67h9j.png',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    repo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    status: 'production',
  },
  {
    key: 'dataflix',
    img: '/img/Gemini_Generated_Image_e1k0o1e1k0o1e1k0.png',
    tech: ['HTML5', 'CSS', 'JavaScript'],
    demo: 'https://dataflixx.netlify.app/',
    repo: 'https://github.com/DanielSantiagoV/DataFlix',
    status: 'production',
  },
  {
    key: 'pizza',
    img: '/img/Gemini_Generated_Image_xia66txia66txia6.png',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: 'https://github.com/DanielSantiagoV/Pizza_Punto',
    repo: 'https://github.com/DanielSantiagoV/Pizza_Punto',
    status: 'production',
  },
];

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('projects.label')}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 max-w-3xl">
            {t('projects.title_1')}{' '}
            <span className="accent-italic">{t('projects.title_accent')}</span>
          </h2>
          <p className="text-white/30 text-lg mb-16 max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects — vertical stack */}
        <div className="space-y-8">
          {projectsData.map((project, index) => {
            const features = t(`projects.${project.key}.features`, { returnObjects: true });

            return (
              <motion.article
                key={project.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="card overflow-hidden"
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="lg:col-span-2 relative overflow-hidden">
                    <img
                      src={project.img}
                      alt={t(`projects.${project.key}.title`)}
                      className="w-full h-full object-cover min-h-[240px] lg:min-h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    {/* Category + Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="text-[10px] font-semibold tracking-widest text-white/25 uppercase">
                        {t(`projects.${project.key}.category`)}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        project.status === 'production'
                          ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
                          : 'text-amber-400 border-amber-400/20 bg-amber-400/5'
                      }`}>
                        {t(`projects.status.${project.status}`)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                      {t(`projects.${project.key}.title`)}
                    </h3>

                    {/* Description — always visible */}
                    <p className="text-white/35 leading-relaxed mb-6">
                      {t(`projects.${project.key}.description`)}
                    </p>

                    {/* Features */}
                    {Array.isArray(features) && features.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[10px] font-semibold tracking-widest text-white/20 uppercase mb-3">
                          {t('projects.features')}
                        </p>
                        <ul className="space-y-2">
                          {features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/30">
                              <span className="text-accent mt-0.5">•</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-[10px] text-white/20 border border-white/[0.06] px-2.5 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                      >
                        {t('projects.view_demo')} <ExternalLink size={13} />
                      </a>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-white/25 hover:text-white/50 transition-colors"
                      >
                        <Github size={13} /> {t('projects.view_code')}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card p-8 mt-12 text-center"
        >
          <p className="text-lg font-bold mb-2">{t('projects.github_cta')}</p>
          <p className="text-white/30 text-sm mb-5">{t('projects.github_desc')}</p>
          <a
            href="https://github.com/SantiagoRomero7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex"
          >
            {t('projects.github_btn')} <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
