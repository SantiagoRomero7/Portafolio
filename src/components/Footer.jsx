import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { key: 'nav.home', to: 'home' },
    { key: 'nav.about', to: 'about' },
    { key: 'nav.projects', to: 'projects' },
    { key: 'nav.skills', to: 'skills' },
    { key: 'nav.contact', to: 'contact' },
  ];

  return (
    <footer className="border-t border-white/[0.04] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-lg font-bold">Santiago Romero</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-white/25 uppercase mb-4">
              {t('footer.nav_title')}
            </h4>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  className="block text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest text-white/25 uppercase mb-4">
              {t('footer.connect_title')}
            </h4>
            <div className="space-y-2.5">
              <a href="https://github.com/SantiagoRomero7" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/santiago-romero-9a673a37a/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://api.whatsapp.com/send/?phone=573172681209" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/15">
            © {currentYear} Santiago Romero. {t('footer.rights')}.
          </p>
          <p className="text-xs text-white/15">
            {t('footer.built_with')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
