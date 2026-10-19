import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  EyeOff,
  Github,
  Package,
  Plus,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { BrowserFrame, PhoneFrame, Screenshot, TerminalFrame } from './Visuals';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { projects, TEAMMATE } from '../data/projects';

// El estado no se distingue por color —el sistema es monocromo— sino por
// contraste: lo vivo va en tinta plena y lo cerrado en gris. El único aviso al
// que se le permite color es el mantenimiento.
const statusStyle = {
  production: 'text-ink',
  live: 'text-ink',
  maintenance: 'text-graphite',
  completed: 'text-smoke',
};

const phoneIcons = [ShieldCheck, Package, AlertTriangle, CreditCard, Wallet, EyeOff];

const DistribPhone = () => {
  const { t } = useTranslation();
  const phone = t('projects.distrib-app.phone', { returnObjects: true });
  return (
    <PhoneFrame>
      <p className="text-[10px] uppercase tracking-widest text-white/40">{phone.subtitle}</p>
      <p className="mb-4 text-lg font-medium">{phone.title}</p>
      <ul className="space-y-2">
        {phone.features.map((f, i) => {
          const Icon = phoneIcons[i % phoneIcons.length];
          return (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3 py-2.5 text-[12px] text-white/80"
            >
              <Icon size={14} className="shrink-0 text-white/60" />
              {f}
            </motion.li>
          );
        })}
      </ul>
      <div className="mt-4 flex gap-2 text-[10px] text-white/50">
        <span className="rounded-pill border border-white/10 px-2.5 py-1">PWA · iPhone</span>
        <span className="rounded-pill border border-white/10 px-2.5 py-1">APK · Android</span>
      </div>
    </PhoneFrame>
  );
};

const Visual = ({ project }) => {
  const { t } = useTranslation();
  const v = project.visual;
  if (v.type === 'phone') return <DistribPhone />;
  if (v.type === 'terminal')
    return <TerminalFrame title={v.title} lines={v.lines} note={t(v.note ?? 'projects.cli_note')} />;
  return (
    <BrowserFrame url={v.url}>
      <Screenshot src={v.src} alt={t(`projects.${project.key}.title`)} />
    </BrowserFrame>
  );
};

/**
 * Cada proyecto es una fila a ancho completo, no una tarjeta: el lado del
 * visual se alterna para que la vista no caiga en un patrón plano al bajar.
 */
const ProjectRow = ({ project, index }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const base = `projects.${project.key}`;
  const solution = t(`${base}.solution`, { returnObjects: true });
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
      className="index-row rule group grid items-center gap-x-14 gap-y-10 px-4 py-14 lg:grid-cols-12 lg:py-20"
    >
      {/* Visual */}
      <div className={`lg:col-span-6 ${flip ? 'lg:order-last' : ''}`}>
        <Visual project={project} />
      </div>

      {/* Contenido */}
      <div className="lg:col-span-6">
        <div className="flex items-center gap-4">
          <span className="text-label text-smoke">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-label uppercase text-smoke">{t(`${base}.category`)}</span>
          <span className={`ml-auto inline-flex items-center gap-2 text-label uppercase ${statusStyle[project.status]}`}>
            <span className="h-1.5 w-1.5 bg-current" />
            {t(`projects.status.${project.status}`)}
          </span>
        </div>

        <h3 className="h-sub mt-5">{t(`${base}.title`)}</h3>
        <p className="mt-5 max-w-xl font-light leading-relaxed text-muted">{t(`${base}.description`)}</p>

        {project.team && (
          <a
            href={TEAMMATE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tag mt-6 gap-2"
          >
            <Users size={13} />
            {t('projects.team')} <span className="ml-1 text-foreground">@{TEAMMATE.handle}</span>
          </a>
        )}

        {project.status === 'maintenance' && (
          <p className="mt-6 flex max-w-xl items-start gap-2.5 text-caption leading-relaxed text-graphite">
            <Wrench size={14} className="mt-0.5 shrink-0" />
            {t('projects.maintenance_note')}
          </p>
        )}

        {/* Problema y solución, plegables para no saturar la fila */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-7 inline-flex items-center gap-2.5 text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-pill transition-colors duration-300"
            style={{ border: '1px solid var(--line-strong)' }}
          >
            <Plus size={12} className={`transition-transform duration-400 ${open ? 'rotate-45' : ''}`} />
          </span>
          {open ? t('projects.hide_case') : t('projects.view_case')}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 max-w-xl space-y-6 pl-5" style={{ borderLeft: '1px solid var(--line)' }}>
                <div>
                  <p className="flex items-center gap-2 text-label uppercase text-smoke">
                    <AlertTriangle size={13} /> {t('projects.problem_label')}
                  </p>
                  <p className="mt-2.5 text-caption leading-relaxed text-muted">{t(`${base}.problem`)}</p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-label uppercase text-ink">
                    <CheckCircle2 size={13} /> {t('projects.solution_label')}
                  </p>
                  {Array.isArray(solution) && (
                    <ul className="mt-2.5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {solution.map((s) => (
                        <li key={s} className="flex gap-2.5 text-caption leading-snug text-muted">
                          <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-ink" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-iris">
              {t('projects.view_demo')} <ExternalLink size={14} />
            </a>
          )}
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={14} /> {t('projects.view_code')}
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeading
          index="04"
          label={t('projects.label')}
          title={t('projects.title_1')}
          accent={t('projects.title_accent')}
          lede={t('projects.subtitle')}
        />

        <div className="mt-14 lg:mt-20">
          {projects.map((project, i) => (
            <ProjectRow key={project.key} project={project} index={i} />
          ))}
        </div>

        {/* Cierre de sección: el resto del trabajo vive en GitHub */}
        <Reveal>
          <div
            className="flex flex-col items-start justify-between gap-7 py-14 sm:flex-row sm:items-center"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <div>
              <p className="h-sub">{t('projects.github_cta')}</p>
              <p className="mt-2 max-w-md text-caption text-muted">{t('projects.github_desc')}</p>
            </div>
            <a
              href="https://github.com/SantiagoRomero7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline shrink-0"
            >
              <Github size={15} /> {t('projects.github_btn')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
