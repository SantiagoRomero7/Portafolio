import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const title = " Santiago Romero";
  
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated background background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse " style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p variants={itemVariants} className="text-secondary font-bold tracking-widest uppercase mb-4">
            {t('hero.greeting')}
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="inline-flex overflow-hidden border-r-4 border-primary pr-2 animate-typing whitespace-nowrap">
              {title}
            </span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl text-white/70 font-medium mb-8">
            {t('hero.role')}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl">
            {t('hero.description')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="projects" smooth={true}>
              <button className="btn-primary">
                {t('hero.view_projects')} <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="contact" smooth={true}>
              <button className="btn-secondary">
                {t('hero.contact_me')}
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for typing animation if not using complex logic */}
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        .animate-typing {
          animation: typing 3s steps(30, end) infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
