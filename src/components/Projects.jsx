import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projectsData = [
  {
    title: 'Velvet & Co',
    img: '/img/Gemini_Generated_Image_h2xyq0h2xyq0h2xy.png',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    demo: 'https://santiagoromero7.github.io/Velvetco_proyecto/',
    repo: 'https://github.com/SantiagoRomero7/Velvetco_proyecto',
    key: 'velvet'
  },
  {
    title: 'GymMaster CLI',
    img: '/img/Gemini_Generated_Image_7h9ji67h9ji67h9j.png',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    repo: 'https://github.com/DanielSantiagoV/GymMaster_CLI',
    key: 'gym'
  },
  {
    title: 'DataFlix',
    img: '/img/Gemini_Generated_Image_e1k0o1e1k0o1e1k0.png',
    tech: ['HTML5', 'CSS', 'JavaScript'],
    demo: 'https://dataflixx.netlify.app/',
    repo: 'https://github.com/DanielSantiagoV/DataFlix',
    key: 'dataflix'
  },
  {
    title: 'Pizza y Punto',
    img: '/img/Gemini_Generated_Image_xia66txia66txia6.png',
    tech: ['Node.js', 'MongoDB', 'Inquirer.js'],
    demo: 'https://github.com/DanielSantiagoV/Pizza_Punto',
    repo: 'https://github.com/DanielSantiagoV/Pizza_Punto',
    key: 'pizza'
  }
];

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative glass-card overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-background rounded-full hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-background rounded-full hover:scale-110 transition-transform">
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/60">
              {t}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
             <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline">
               {t('projects.view_demo')} <ExternalLink size={14} />
             </a>
             <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white/40 flex items-center gap-1 hover:text-white transition-colors">
               <Github size={14} /> {t('projects.view_code')}
             </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const scrollAnim = useScrollAnimation();

  return (
    <section id="projects" className="py-24 bg-white/2">
      <div className="container mx-auto px-6">
        <motion.div
           ref={scrollAnim.ref}
           initial={scrollAnim.initial}
           animate={scrollAnim.animate}
           variants={scrollAnim.variants}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">{t('projects.title')}</h2>
              <div className="w-24 h-1.5 bg-secondary rounded-full" />
            </div>
            <p className="text-white/50 max-w-md">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
