import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const { t } = useTranslation();
  const scrollAnim = useScrollAnimation();
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.target;
    const data = new FormData(form);
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'unconfigured';
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
           ref={scrollAnim.ref}
           initial={scrollAnim.initial}
           animate={scrollAnim.animate}
           variants={scrollAnim.variants}
           className="grid lg:grid-cols-2 gap-16"
        >
          {/* Info Side */}
          <div>
            <h2 className="text-4xl font-bold mb-4">{t('contact.title')}</h2>
            <div className="w-24 h-1.5 bg-primary rounded-full mb-12" />
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">{t('contact.email')}</p>
                  <p className="text-xl font-medium">santiromero.dev@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">WhatsApp</p>
                  <p className="text-xl font-medium">+57 317 268 1209</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-background transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Ubicación</p>
                  <p className="text-xl font-medium">Colombia</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 glass-card border-secondary/20">
              <p className="text-white/70 italic">
                "Siempre estoy abierto a nuevas colaboraciones y retos tecnológicos interesantes. ¡Escríbeme!"
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-card p-8 md:p-12">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">{t('contact.success')}</h3>
                <button 
                  onClick={() => setStatus(null)}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all font-medium"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium resize-none"
                    placeholder="¿En qué puedo ayudarte?"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                    <AlertCircle size={16} /> {t('contact.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary justify-center py-4 rounded-xl text-lg font-bold disabled:opacity-50"
                >
                  {status === 'loading' ? 'Enviando...' : t('contact.send')} <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
