import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, AlertTriangle, CheckCircle2 } from 'lucide-react';

const projectsData = [
  {
    key: 'distrib-app',
    tech: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Expo Router', 'Vercel'],
    demo: null,
    repo: 'https://github.com/SantiagoRomero7/distrib-app',
    status: 'production',
  },
  {
    key: 'gym',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: null,
    repo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    status: 'production',
  },
  {
    key: 'dataflix',
    tech: ['HTML5', 'CSS', 'JavaScript', 'LocalStorage'],
    demo: 'https://dataflixx.netlify.app/',
    repo: 'https://github.com/DanielSantiagoV/DataFlix',
    status: 'production',
  },
  {
    key: 'pizza',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: null,
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
          className="text-center mb-16"
        >
          <div className="section-label inline-block mb-4">{t('projects.label')}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            {t('projects.title_1')}{' '}
            <span className="accent-italic">{t('projects.title_accent')}</span>
          </h2>
          <p className="text-white/30 text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, index) => {
            const solution = t(`projects.${project.key}.solution`, { returnObjects: true });
            
            // Si es la última card de un grid de cantidad impar, la centramos
            const isLastOdd = projectsData.length % 2 !== 0 && index === projectsData.length - 1;
            const colSpanClass = isLastOdd ? 'md:col-span-2 md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] md:mx-auto' : '';

            return (
              <motion.article
                key={project.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`flex flex-col h-full bg-[#111118]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 lg:p-10 shadow-xl ${colSpanClass}`}
              >
                {/* Header: Category + Status */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-widest text-white/40 uppercase">
                    {t(`projects.${project.key}.category`)}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
                    project.status === 'production'
                      ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                      : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'
                  }`}>
                    {t(`projects.status.${project.status}`)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight text-white">
                  {t(`projects.${project.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed mb-8">
                  {t(`projects.${project.key}.description`)}
                </p>

                {/* Separator */}
                <hr className="border-white/5 mb-8" />

                {/* Problema Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-accent shrink-0" size={18} />
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">
                      {t('projects.problem_label')}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm lg:text-base">
                    {t(`projects.${project.key}.problem`)}
                  </p>
                </div>

                {/* Solución Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                    <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                      {t('projects.solution_label')}
                    </span>
                  </div>
                  {Array.isArray(solution) && solution.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-3">
                      {solution.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm lg:text-base text-white/60">
                          <span className="text-emerald-400/50 mt-1 shrink-0">•</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[10px] md:text-[11px] font-medium text-white/80 bg-[#1a1a24] border border-white/10 px-3.5 py-1.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-6">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-light transition-colors"
                    >
                      {t('projects.view_demo')} <ExternalLink size={16} />
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Github size={16} /> {t('projects.view_code')}
                  </a>
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
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 mt-16 text-center"
        >
          <p className="text-lg font-bold mb-2">{t('projects.github_cta')}</p>
          <p className="text-white/40 text-sm mb-6">{t('projects.github_desc')}</p>
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
