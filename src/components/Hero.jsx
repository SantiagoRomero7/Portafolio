import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, MessageCircle } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const stackItems = ['React', 'Vue.js', 'JavaScript', 'Node.js', 'Express', 'Python', 'Supabase'];

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Availability badge */}
          <motion.div variants={item} className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-accent border border-accent/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8 max-w-5xl">
            {t('hero.title_1')}{' '}
            <span className="accent-italic">{t('hero.title_2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mb-12">
            {t('hero.subtitle').split('**').map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-5 mb-16">
            <Link to="contact" smooth={true} offset={-80}>
              <button className="btn-primary">
                {t('hero.cta_talk')} <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="projects" smooth={true} offset={-80}>
              <button className="btn-ghost">
                {t('hero.cta_projects')}
              </button>
            </Link>
          </motion.div>

          {/* Social + Stack row */}
          <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center gap-8">
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/SantiagoRomero7" target="_blank" rel="noopener noreferrer"
                className="p-2.5 border border-white/[0.06] rounded-xl text-white/30 hover:text-white hover:border-white/20 transition-all">
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/santiago-romero-9a673a37a/" target="_blank" rel="noopener noreferrer"
                className="p-2.5 border border-white/[0.06] rounded-xl text-white/30 hover:text-white hover:border-white/20 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=573172681209" target="_blank" rel="noopener noreferrer"
                className="p-2.5 border border-white/[0.06] rounded-xl text-white/30 hover:text-white hover:border-white/20 transition-all">
                <MessageCircle size={16} />
              </a>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-white/10" />

            {/* Stack */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold tracking-widest text-white/25 uppercase mr-1">
                {t('hero.stack_label')}
              </span>
              {stackItems.map((s) => (
                <span key={s} className="text-xs text-white/30 border border-white/[0.06] px-2.5 py-1 rounded-md">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
