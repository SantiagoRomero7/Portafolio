import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const navLinks = [
    { name: t('nav.about'), to: 'about' },
    { name: t('nav.projects'), to: 'projects' },
    { name: t('nav.skills'), to: 'skills' },
    { name: t('nav.contact'), to: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="home" smooth={true} className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-xl font-bold tracking-tight">SR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              offset={-80}
              spy={true}
              activeClass="!text-white"
              className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}

          {/* Language pill */}
          <button
            onClick={toggleLanguage}
            className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors px-3 py-1 border border-white/[0.08] rounded-full"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={i18n.language}
                initial={{ y: 4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* CTA */}
          <Link to="contact" smooth={true} offset={-80}>
            <button className="btn-primary text-xs">
              {t('nav.lets_talk')} <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-xs px-2.5 py-1 border border-white/[0.08] rounded-full text-white/40"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white/60">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/[0.04] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-white/50 hover:text-white transition-colors border-b border-white/[0.04]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link to="contact" smooth={true} offset={-80} onClick={() => setIsOpen(false)}>
                <button className="btn-primary text-xs mt-4 w-full justify-center">
                  {t('nav.lets_talk')} <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
