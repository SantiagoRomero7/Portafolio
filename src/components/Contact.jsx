import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { spotlight } from '../hooks/spotlight';

const EMAIL = 'santirmrm420@gmail.com';

const channels = [
  {
    key: 'whatsapp',
    Icon: MessageCircle,
    href: 'https://api.whatsapp.com/send/?phone=573172681209',
    handle: '+57 317 268 1209',
    color: '#25D366',
  },
  {
    key: 'linkedin',
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/santiago-romero-9a673a37a/',
    handle: 'santiago-romero',
    color: '#0A66C2',
  },
  { key: 'github', Icon: Github, href: 'https://github.com/SantiagoRomero7', handle: '@SantiagoRomero7', color: null },
];

const cvFile = (lang) => `/cv/Santiago-Romero-CV-${lang === 'es' ? 'ES' : 'EN'}.pdf`;

const bogotaTime = (lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Bogota',
  }).format(new Date());

const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const [time, setTime] = useState(() => bogotaTime(lang));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(bogotaTime(lang)), 30000);
    return () => clearInterval(id);
  }, [lang]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin acceso al portapapeles: el enlace mailto sigue disponible
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[440px] w-[860px] max-w-[140%] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">{t('contact.label')}</div>
          <h2 className="mb-12 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            {t('contact.title_1')}
            <br />
            <span className="accent-italic">{t('contact.title_accent')}</span>
            {t('contact.title_2')}
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t('contact.available')}
              </span>
              <span className="text-foreground/40">
                {t('contact.local_time')} <span className="font-semibold tabular-nums text-foreground/75">{time}</span>
              </span>
            </div>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-foreground/45">{t('contact.subtitle')}</p>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
              {t('contact.email_label')}
            </p>
            <a href={`mailto:${EMAIL}`} className="group inline-flex max-w-full items-center gap-3">
              <span className="break-all bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 text-[5.4vw] font-bold transition-[background-size] min-[420px]:text-2xl duration-500 group-hover:bg-[length:100%_2px] sm:text-3xl md:text-4xl">
                {EMAIL}
              </span>
              <ArrowUpRight
                size={28}
                className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="btn-primary">
                <Mail size={16} /> {t('contact.email_cta')}
              </a>
              <button type="button" onClick={copy} className="btn-outline" aria-live="polite">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? t('contact.copied') : t('contact.copy')}
              </button>
              <a href={cvFile(lang)} download className="btn-outline">
                <Download size={16} /> {t('contact.cv')}
              </a>
            </div>
            <p className="mt-4 text-xs text-foreground/30">
              {t('contact.cv_note')}{' '}
              <a
                href={cvFile(lang === 'es' ? 'en' : 'es')}
                download
                className="underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground/60"
              >
                {t('contact.cv_other')}
              </a>
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {channels.map(({ key, Icon, href, handle, color }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={spotlight}
                className="spotlight card group flex items-center gap-4 p-5"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                    color ? '' : 'bg-foreground/[0.06] text-foreground'
                  }`}
                  style={color ? { background: `${color}1f`, color } : undefined}
                >
                  <Icon size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/35">
                    {t(`contact.channels.${key}.label`)}
                  </p>
                  <p className="truncate font-semibold">{handle}</p>
                  <p className="text-xs text-foreground/35">{t(`contact.channels.${key}.desc`)}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-foreground/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            ))}
            <p className="rounded-2xl border border-dashed border-foreground/10 p-5 text-xs leading-relaxed text-foreground/35">
              {t('contact.response_note')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
