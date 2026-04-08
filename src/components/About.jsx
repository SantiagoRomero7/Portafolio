import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const images = [
  '/img/sobremi.jpeg',
  '/img/sobremi2.jpeg'
];

const About = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const scrollAnim = useScrollAnimation();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="about" className="py-24 bg-white/2 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           ref={scrollAnim.ref}
           initial={scrollAnim.initial}
           animate={scrollAnim.animate}
           variants={scrollAnim.variants}
           className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Carousel */}
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-2">
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={images[current]}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>

            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl -z-10" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold mb-2 text-secondary">{t('about.title')}</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
            <h3 className="text-2xl font-bold mb-6 italic text-white/90">
              {t('about.subtitle')}
            </h3>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <p className="text-primary font-bold text-3xl">2+</p>
                <p className="text-white/40 text-sm uppercase tracking-wider">Años Experiencia</p>
              </div>
              <div>
                <p className="text-secondary font-bold text-3xl">10+</p>
                <p className="text-white/40 text-sm uppercase tracking-wider">Proyectos Listos</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
