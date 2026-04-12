import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {/* Label */}
          <div className="section-label">{t('contact.label')}</div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 max-w-3xl">
            {t('contact.title_1')}{' '}
            <span className="accent-italic">{t('contact.title_accent')}</span>
            {t('contact.title_2')}
          </h2>
          <p className="text-foreground/30 text-lg mb-16 max-w-2xl">
            {t('contact.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email card */}
            <a
              href="mailto:santirmrm420@gmail.com"
              className="card p-8 flex justify-between items-start group hover:border-accent/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={18} className="text-accent" />
                  <span className="text-sm font-semibold text-foreground/40 uppercase tracking-wider">
                    {t('contact.email_label')}
                  </span>
                </div>
                <p className="text-lg font-semibold mb-1">santirmrm420@gmail.com</p>
                <p className="text-sm text-accent font-medium">{t('contact.email_cta')}</p>
              </div>
              <ArrowUpRight size={18} className="text-foreground/20 group-hover:text-accent transition-colors" />
            </a>

            {/* WhatsApp card */}
            <a
              href="https://api.whatsapp.com/send/?phone=573172681209"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 flex justify-between items-start group hover:border-accent/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={18} className="text-emerald-400" />
                  <span className="text-sm font-semibold text-foreground/40 uppercase tracking-wider">
                    {t('contact.whatsapp_label')}
                  </span>
                </div>
                <p className="text-lg font-semibold mb-1">+57 317 268 1209</p>
                <p className="text-sm text-emerald-400 font-medium">{t('contact.whatsapp_cta')}</p>
              </div>
              <ArrowUpRight size={18} className="text-foreground/20 group-hover:text-emerald-400 transition-colors" />
            </a>
          </div>

          {/* Connect + socials */}
          <div className="card p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-foreground/25 uppercase mb-2">
                  {t('contact.connect_label')}
                </p>
                <p className="text-foreground/30 text-sm">{t('contact.connect_desc')}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/SantiagoRomero7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-foreground/[0.06] rounded-xl text-foreground/25 hover:text-foreground hover:border-foreground/20 transition-all"
                >
                  <Github size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/santiago-romero-9a673a37a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-foreground/[0.06] rounded-xl text-foreground/25 hover:text-foreground hover:border-foreground/20 transition-all"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
            <p className="text-foreground/20 text-xs mt-5 pt-4 border-t border-foreground/[0.04]">
              {t('contact.response_note')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
