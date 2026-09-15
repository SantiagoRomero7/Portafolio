import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  ExternalLink,
  EyeOff,
  Github,
  Package,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { BrowserFrame, PhoneFrame, Screenshot, TerminalFrame } from './Visuals';
import { projects, TEAMMATE } from '../data/projects';
import { spotlight } from '../hooks/spotlight';

const statusStyle = {
  production: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  live: 'text-accent bg-accent/10 border-accent/20',
  maintenance: 'text-amber-400 bg-amber-400/10 border-amber-400/20 [.light_&]:text-amber-700',
  completed: 'text-foreground/50 bg-foreground/[0.04] border-foreground/10',
};

const phoneIcons = [ShieldCheck, Package, AlertTriangle, CreditCard, Wallet, EyeOff];

const DistribPhone = () => {
  const { t } = useTranslation();
  const phone = t('projects.distrib-app.phone', { returnObjects: true });
  return (
    <PhoneFrame>
      <p className="text-[10px] uppercase tracking-widest text-white/40">{phone.subtitle}</p>
      <p className="mb-4 text-lg font-bold">{phone.title}</p>
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
              <Icon size={14} className="shrink-0 text-accent" />
              {f}
            </motion.li>
          );
        })}
      </ul>
      <div className="mt-4 flex gap-2 text-[10px] font-semibold text-white/50">
        <span className="rounded-full border border-white/10 px-2.5 py-1">PWA · iPhone</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">APK · Android</span>
      </div>
    </PhoneFrame>
  );
};

const Visual = ({ project }) => {
  const { t } = useTranslation();
  const v = project.visual;
  if (v.type === 'phone') return <DistribPhone />;
  if (v.type === 'terminal') return <TerminalFrame title={v.title} lines={v.lines} note={t('projects.cli_note')} />;
  return (
    <BrowserFrame url={v.url}>
      <Screenshot src={v.src} alt={t(`projects.${project.key}.title`)} />
    </BrowserFrame>
  );
};

const ProjectCard = ({ project, index, wide }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const base = `projects.${project.key}`;
  const solution = t(`${base}.solution`, { returnObjects: true });

  return (
    <motion.article
      onMouseMove={spotlight}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
      className={`spotlight card flex flex-col overflow-hidden ${wide ? 'lg:col-span-6 lg:flex-row' : 'lg:col-span-3'}`}
    >
      <div
        className={`relative flex items-center justify-center border-b border-foreground/[0.05] bg-foreground/[0.02] p-6 lg:p-8 ${
          wide ? 'lg:w-[40%] lg:border-b-0 lg:border-r' : ''
        }`}
      >
        <div className="w-full">
          <Visual project={project} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-7 lg:p-9 ${wide ? 'lg:justify-center' : ''}`}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40 md:text-[11px]">
            {t(`${base}.category`)}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyle[project.status]}`}
          >
            {t(`projects.status.${project.status}`)}
          </span>
        </div>

        <h3 className={`mb-3 font-bold leading-tight ${wide ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}>
          {t(`${base}.title`)}
        </h3>
        <p className="mb-5 leading-relaxed text-foreground/50">{t(`${base}.description`)}</p>

        {project.team && (
          <a
            href={TEAMMATE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground/55 transition-colors hover:border-accent/30 hover:text-foreground"
          >
            <Users size={13} className="text-accent" />
            {t('projects.team')} <span className="font-semibold">@{TEAMMATE.handle}</span>
          </a>
        )}

        {project.status === 'maintenance' && (
          <p className="mb-5 flex items-start gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] px-3.5 py-2.5 text-xs leading-relaxed text-amber-300/80 [.light_&]:text-amber-800">
            <Wrench size={14} className="mt-0.5 shrink-0" />
            {t('projects.maintenance_note')}
          </p>
        )}

        {/* Problema y solución, plegables para no saturar la tarjeta */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mb-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
        >
          {open ? t('projects.hide_case') : t('projects.view_case')}
          <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mb-6 space-y-5 border-l border-foreground/[0.08] pl-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent">
                    <AlertTriangle size={14} /> {t('projects.problem_label')}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/60">{t(`${base}.problem`)}</p>
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                    <CheckCircle2 size={14} /> {t('projects.solution_label')}
                  </p>
                  {Array.isArray(solution) && (
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {solution.map((s) => (
                        <li key={s} className="flex gap-2 text-sm leading-snug text-foreground/60">
                          <span className="text-emerald-400/60">•</span>
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

        <div className={`mb-7 flex flex-wrap gap-2 ${wide ? '' : 'mt-auto'}`}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-[11px] font-medium text-foreground/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-accent-light"
            >
              {t('projects.view_demo')} <ExternalLink size={15} />
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/45 transition-colors hover:text-foreground"
          >
            <Github size={15} /> {t('projects.view_code')}
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="section-label">{t('projects.label')}</div>
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-6xl">
            {t('projects.title_1')} <span className="accent-italic">{t('projects.title_accent')}</span>
          </h2>
          <p className="max-w-2xl text-lg text-foreground/35">{t('projects.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.key} project={project} index={i} wide={i === 0} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center"
        >
          <p className="mb-2 text-lg font-bold">{t('projects.github_cta')}</p>
          <p className="mb-6 text-sm text-foreground/40">{t('projects.github_desc')}</p>
          <a
            href="https://github.com/SantiagoRomero7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex text-sm"
          >
            {t('projects.github_btn')} <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
