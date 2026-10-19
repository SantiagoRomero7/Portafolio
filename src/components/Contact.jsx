import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import Reveal, { RevealWords } from './Reveal';

const EMAIL = 'santirmrm420@gmail.com';

const channels = [
  {
    key: 'whatsapp',
    Icon: MessageCircle,
    href: 'https://api.whatsapp.com/send/?phone=573172681209',
    handle: '+57 317 268 1209',
  },
  {
    key: 'linkedin',
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/santiago-romero-9a673a37a/',
    handle: 'santiago-romero',
  },
  { key: 'github', Icon: Github, href: 'https://github.com/SantiagoRomero7', handle: '@SantiagoRomero7' },
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
    <section id="contact" className="section relative isolate overflow-hidden">
      <div className="shell">
        <Reveal y={12}>
          <div className="pb-5" style={{ borderBottom: '1px solid var(--line)' }}>
            <span className="eyebrow">{t('contact.label')}</span>
          </div>
        </Reveal>

        <h2 className="mt-8 text-display">
          <RevealWords text={t('contact.title_1')} delay={0.05} />{' '}
          <RevealWords
            text={`${t('contact.title_accent')}${t('contact.title_2')}`}
            delay={0.05 + t('contact.title_1').split(' ').length * 0.055}
            highlight
          />
        </h2>

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2.5 text-ink">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-pill bg-lime" />
                  {t('contact.available')}
                </span>
                <span className="text-muted">
                  {t('contact.local_time')}{' '}
                  <span className="nums text-ink">{time}</span>
                </span>
              </div>

              <p className="lede mt-8 max-w-xl">{t('contact.subtitle')}</p>
            </Reveal>

            {/* El correo es la acción principal: va al tamaño de un titular */}
            <Reveal delay={0.16}>
              <div className="mt-12">
                <p className="eyebrow">{t('contact.email_label')}</p>
                <a href={`mailto:${EMAIL}`} className="group mt-4 flex max-w-full items-center gap-4">
                  <span className="break-all bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1.5 text-[clamp(1.35rem,4.2vw,2.5rem)] leading-tight tracking-tight transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_1px]">
                    {EMAIL}
                  </span>
                  <ArrowUpRight
                    size={26}
                    className="shrink-0 text-ink transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={`mailto:${EMAIL}`} className="btn-primary">
                  <Mail size={15} /> {t('contact.email_cta')}
                </a>
                <button type="button" onClick={copy} className="btn-outline" aria-live="polite">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? t('contact.copied') : t('contact.copy')}
                </button>
                <a href={cvFile(lang)} download className="btn-outline">
                  <Download size={15} /> {t('contact.cv')}
                </a>
              </div>
              <p className="mt-5 text-caption text-muted">
                {t('contact.cv_note')}{' '}
                <a
                  href={cvFile(lang === 'es' ? 'en' : 'es')}
                  download
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                  style={{ textDecorationColor: 'var(--line-strong)' }}
                >
                  {t('contact.cv_other')}
                </a>
              </p>
            </Reveal>
          </div>

          {/* Canales: filas separadas por líneas, sin tarjetas */}
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <div>
                {channels.map(({ key, Icon, href, handle }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 py-6 transition-colors duration-300"
                    style={{ borderTop: '1px solid var(--line)' }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-paper text-ink transition-colors duration-500 group-hover:bg-inverse group-hover:text-inverse-fg">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow">{t(`contact.channels.${key}.label`)}</p>
                      <p className="mt-2 truncate text-[0.95rem] text-ink">{handle}</p>
                      <p className="mt-0.5 text-caption text-muted">{t(`contact.channels.${key}.desc`)}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-smoke transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </a>
                ))}

                <p
                  className="py-6 text-caption leading-relaxed text-muted"
                  style={{ borderTop: '1px solid var(--line)' }}
                >
                  {t('contact.response_note')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
