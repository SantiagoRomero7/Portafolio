import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StackMarquee from './components/StackMarquee';
import Featured from './components/Featured';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  // El muelle quita el salto brusco de la barra cuando el scroll es rápido
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen bg-canvas">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ink"
      />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-btn focus:bg-inverse focus:px-5 focus:py-2.5 focus:text-sm focus:text-inverse-fg"
      >
        Ir al contenido
      </a>

      <Navbar />

      {/* Al cambiar de idioma todo el contenido se vuelve a montar con un fundido */}
      <AnimatePresence mode="wait">
        <motion.main
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero />
          <StackMarquee />
          <About />
          <Experience />
          <Featured />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
