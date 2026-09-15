import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

  return (
    <div className="relative min-h-screen bg-background">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero />
          <Featured />
          <Projects />
          <Experience />
          <Skills />
          <About />
          <Contact />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
