import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const techSkills = [
  { name: 'HTML5', level: 95 },
  { name: 'CSS3', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'Python', level: 75 },
  { name: 'Node.js', level: 80 },
  { name: 'MongoDB', level: 85 },
  { name: 'MySQL', level: 70 },
  { name: 'Express', level: 80 },
  { name: 'APIs REST', level: 90 },
  { name: 'Git', level: 85 }
];

const softSkills = [
  'Disciplina', 'Constancia', 'Aprendizaje Rápido', 'Empatía', 
  'Adaptabilidad', 'Responsabilidad', 'Liderazgo', 'Proactividad', 
  'Compromiso', 'Pensamiento Crítico', 'Creatividad', 'Comunicación Efectiva'
];

const Skills = () => {
  const { t } = useTranslation();
  const scrollAnim = useScrollAnimation();

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          ref={scrollAnim.ref}
          initial={scrollAnim.initial}
          animate={scrollAnim.animate}
          variants={scrollAnim.variants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('skills.title')}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 text-secondary flex items-center gap-3">
                <span className="text-3xl">💻</span> {t('skills.tech')}
              </h3>
              <div className="space-y-6">
                {techSkills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-white/80">{skill.name}</span>
                      <span className="text-white/40 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="flex flex-col gap-8">
              <div className="glass-card p-8 flex-1">
                <h3 className="text-2xl font-bold mb-8 text-primary flex items-center gap-3">
                  <span className="text-3xl">🌟</span> {t('skills.soft')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {softSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Extra Box */}
              <div className="glass-card p-8 bg-primary/10 border-primary/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">Aprendizaje Continuo</h4>
                  <p className="text-white/60">
                    Siempre explorando nuevas fronteras tecnológicas como Rust, Astro y AI Agentic Workflows.
                  </p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-8xl">⚛️</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
