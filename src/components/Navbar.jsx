import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
          ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-foreground/[0.04]'
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
              activeClass="!text-foreground"
              className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}

          {/* Controls Group: Language + Theme */}
          <div className="flex items-center bg-foreground/[0.03] border border-foreground/[0.1] shadow-sm rounded-full overflow-hidden transition-all duration-300 hover:border-foreground/[0.15]">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 hover:bg-foreground/[0.05] text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              <span className="text-sm">{i18n.language === 'es' ? '🇺🇸' : '🇨🇴'}</span>
              <span className="text-[11px] font-bold tracking-widest uppercase">
                {i18n.language === 'es' ? 'English' : 'Español'}
              </span>
            </button>

            {/* Separator */}
            <div className="w-px h-4 bg-foreground/[0.15]" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center px-4 py-2 hover:bg-foreground/[0.05] text-foreground/70 hover:text-accent transition-colors duration-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -10, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 10, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* CTA */}
          <Link to="contact" smooth={true} offset={-80}>
            <button className="btn-primary text-xs">
              {t('nav.lets_talk')} <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Mobile Header Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground/60 p-2">
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
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-foreground/[0.04] overflow-hidden"
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
                    className="block py-3 text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/[0.04]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Controls Group */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="flex items-center justify-between bg-foreground/[0.03] border border-foreground/[0.1] rounded-xl overflow-hidden mt-2 mb-2"
              >
                <button
                  onClick={toggleLanguage}
                  className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-foreground/[0.05] text-foreground/70 transition-colors"
                >
                  <span className="text-sm">{i18n.language === 'es' ? '🇺🇸' : '🇨🇴'}</span>
                  <span className="text-xs font-bold tracking-widest uppercase">
                    {i18n.language === 'es' ? 'English' : 'Español'}
                  </span>
                </button>
                <div className="w-px h-6 bg-foreground/[0.15]" />
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center py-3 hover:bg-foreground/[0.05] text-foreground/70 transition-colors"
                >
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </motion.div>

              <Link to="contact" smooth={true} offset={-80} onClick={() => setIsOpen(false)}>
                <button className="btn-primary text-xs w-full justify-center">
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
