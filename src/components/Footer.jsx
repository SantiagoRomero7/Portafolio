import { useTranslation } from 'react-i18next';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Santiago.dev
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/SantiagoRomero7" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-primary transition-all hover:-translate-y-1">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/santiago-romero-9a673a37a/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-secondary transition-all hover:-translate-y-1">
              <Linkedin size={20} />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=573172681209" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-green-600 transition-all hover:-translate-y-1">
              <MessageCircle size={20} />
            </a>
          </div>

          <div className="text-white/40 text-sm">
            © {currentYear} Santiago Romero. {t('footer.rights')}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
