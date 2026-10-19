import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Moon, Sun } from 'lucide-react';

const EASE = [0.19, 1, 0.22, 1];

const Logo = () => (
  <Link
    to="home"
    smooth
    duration={900}
    className="group flex cursor-pointer items-center gap-2.5 pl-1"
    aria-label="Santiago Romero"
  >
    {/* Un cuadrado, no un punto: la geometría del sistema es franca */}
    <span className="h-2.5 w-2.5 rounded-pill bg-ink transition-colors duration-300 group-hover:bg-lime" />
    <span className="text-[0.8125rem] font-medium tracking-[-0.015em]">Santiago Romero</span>
  </Link>
);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  // El papel es el tema por defecto; el modo tinta es la excepción que se
  // recuerda entre visitas.
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Sin almacenamiento disponible: el tema solo dura la sesión
    }
  }, [theme]);

  // El menú abierto bloquea el scroll de fondo
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { to: 'about', label: t('nav.about') },
    { to: 'experience', label: t('nav.experience') },
    { to: 'featured', label: t('nav.projects') },
    { to: 'skills', label: t('nav.skills') },
    { to: 'contact', label: t('nav.contact') },
  ];

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6">
        <div className="shell">
          <motion.nav
            // Al bajar, la barra se recoge. Sin desenfoque y sin transparencia:
            // es una píldora de papel sólida, como en la referencia.
            animate={{ maxWidth: scrolled ? 880 : 1200 }}
            transition={{ duration: 0.9, ease: EASE }}
            // maxWidth arranca con un número: framer no puede animar desde "none"
            style={{ maxWidth: 1200, border: '1px solid var(--line)' }}
            className="mx-auto flex items-center justify-between gap-4 rounded-pill bg-paper py-2.5 pl-4 pr-2.5"
          >
            <Logo />

            {/* Escritorio */}
            <div className="hidden items-center lg:flex">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={900}
                  offset={-120}
                  spy
                  onSetActive={() => setActive(link.to)}
                  className="relative cursor-pointer px-4 py-2 text-[0.8rem] font-medium text-smoke transition-colors duration-500 hover:text-ink"
                >
                  {active === link.to && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-pill bg-inverse"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className={`relative ${active === link.to ? 'text-inverse-fg' : ''}`}>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleLanguage}
                aria-label={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a español'}
                className="hidden h-9 items-center rounded-pill px-3 text-label uppercase text-smoke transition-colors duration-300 hover:text-ink sm:flex"
              >
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </button>

              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo tinta'}
                className="flex h-9 w-9 items-center justify-center rounded-pill text-smoke transition-colors duration-500 hover:text-ink"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Link to="contact" smooth duration={900} offset={-120} className="hidden lg:block">
                <button className="btn-outline ml-1 px-5 py-2 text-[0.8rem]">
                  {t('nav.lets_talk')} <ArrowRight size={14} />
                </button>
              </Link>

              {/* Botón hamburguesa: dos trazos que se cruzan */}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Menú"
                aria-expanded={open}
                className="relative flex h-9 w-9 items-center justify-center lg:hidden"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute h-[1.5px] w-5 bg-ink"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute h-[1.5px] w-5 bg-ink"
                />
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Menú móvil a pantalla completa, con el titular grande del sitio */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-canvas lg:hidden"
          >
            <nav className="shell flex flex-1 flex-col justify-center gap-1 pb-24 pt-28">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.9, ease: EASE }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={900}
                    offset={-90}
                    onClick={() => setOpen(false)}
                    className="flex cursor-pointer items-baseline gap-4 py-4 text-[2.25rem] font-medium leading-none tracking-[-0.045em]"
                    style={{ borderBottom: '1px solid var(--line)' }}
                  >
                    <span className="text-label font-normal tracking-normal text-smoke">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + links.length * 0.05, duration: 0.9, ease: EASE }}
                className="mt-10 flex items-center gap-3"
              >
                <Link to="contact" smooth duration={900} offset={-90} onClick={() => setOpen(false)} className="flex-1">
                  <button className="btn-primary w-full">
                    {t('nav.lets_talk')} <ArrowRight size={15} />
                  </button>
                </Link>
                <button
                  onClick={toggleLanguage}
                  className="btn-outline px-5 text-label uppercase"
                >
                  {i18n.language === 'es' ? 'EN' : 'ES'}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
