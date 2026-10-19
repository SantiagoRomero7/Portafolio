import { useTranslation } from 'react-i18next';
import { Link, animateScroll } from 'react-scroll';
import { ArrowUp, Github, Linkedin, MessageCircle } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', to: 'home' },
  { key: 'nav.about', to: 'about' },
  { key: 'nav.experience', to: 'experience' },
  { key: 'nav.projects', to: 'featured' },
  { key: 'nav.skills', to: 'skills' },
  { key: 'nav.contact', to: 'contact' },
];

const socials = [
  { href: 'https://github.com/SantiagoRomero7', Icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/santiago-romero-9a673a37a/', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://api.whatsapp.com/send/?phone=573172681209', Icon: MessageCircle, label: 'WhatsApp' },
];

// La línea de 1px que separa dentro del bloque invertido: se dibuja con el
// color del texto invertido, no con el --line del lienzo.
const invRule = { borderTop: '1px solid rgb(var(--c-inv-fg) / 0.18)' };

/**
 * El pie es la banda invertida que cierra la página: un bloque compacto de
 * tinta a sangre, con la firma recortada por el borde inferior. Es el segundo y
 * último bloque negro del sitio —el primero es la cinta del stack—, y esa
 * escasez es lo que le da peso.
 */
const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="band-ink relative overflow-hidden pt-20">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[clamp(1.75rem,1rem+2vw,2.5rem)] font-medium leading-none tracking-[-0.045em]">
              Santiago Romero
            </p>
            <p className="mt-5 max-w-sm leading-relaxed opacity-70">{t('footer.description')}</p>
            <div className="mt-8 flex items-center gap-5">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-60 transition-opacity duration-500 hover:opacity-100"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8">
            <p className="text-label uppercase opacity-55">{t('footer.nav_title')}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={900}
                    offset={-120}
                    className="block cursor-pointer py-2 text-sm opacity-65 transition-opacity duration-500 hover:opacity-100"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-5 py-8 sm:flex-row"
          style={invRule}
        >
          <p className="text-label uppercase opacity-50">© {year} Santiago Romero · {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <p className="text-label uppercase opacity-50">{t('footer.built_with')}</p>
            <button
              type="button"
              onClick={() => animateScroll.scrollToTop({ smooth: true, duration: 900 })}
              aria-label={t('nav.home')}
              className="flex h-9 w-9 items-center justify-center rounded-pill bg-lime text-black transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Firma a sangre, recortada por el borde inferior */}
      <p
        aria-hidden
        className="select-none whitespace-nowrap text-center font-medium leading-[0.78] tracking-[-0.055em] opacity-[0.09]"
        style={{ fontSize: 'clamp(4.5rem,20vw,18rem)' }}
      >
        Santiago
      </p>
    </footer>
  );
};

export default Footer;
