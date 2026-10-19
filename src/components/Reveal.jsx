import { motion } from 'framer-motion';

// La curva y los tiempos son los de monopo: una sola salida, muy frenada, y
// duraciones largas (0.8–1.25 s). Lo que hace que un sitio parezca terminado es
// que absolutamente todo se mueva con el mismo gesto.
const EASE = [0.19, 1, 0.22, 1];

const Reveal = ({ children, delay = 0, y = 24, className = '', as = 'div', amount = 0.2, once = true }) => {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

const word = {
  hidden: { y: '112%' },
  visible: (i) => ({
    y: 0,
    transition: { duration: 1.25, delay: i * 0.05, ease: EASE },
  }),
};

/**
 * Titular que aparece palabra por palabra.
 *
 * El `whileInView` va en el contenedor, no en la palabra: la palabra arranca
 * desplazada dentro de un recorte, así que el observador nunca la vería entrar
 * en pantalla y el titular se quedaría en blanco para siempre.
 *
 * `highlightLast` subraya solo la última palabra con el rotulador. Se calcula
 * por posición y no por texto para que funcione igual en los dos idiomas.
 */
export const RevealWords = ({
  text,
  className = '',
  delay = 0,
  highlight = false,
  highlightLast = false,
  amount = 0.3,
}) => {
  const words = String(text).split(' ');
  return (
    <motion.span className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount }}>
      {words.map((w, i) => {
        const marked = highlight || (highlightLast && i === words.length - 1);
        // El recorte necesita aire arriba y abajo: con interlineado por debajo
        // de 0.9 la caja de la línea es más baja que la letra, así que las
        // tildes y la base de la caja alta se cortarían. El relleno se compensa
        // con margen negativo para no aflojar el interlineado.
        return (
          <span
            key={`${w}-${i}`}
            className="-mb-[0.16em] -mt-[0.14em] inline-block overflow-hidden pb-[0.16em] pt-[0.14em] align-bottom"
          >
            <motion.span className={`inline-block ${marked ? 'hl' : ''}`} variants={word} custom={delay / 0.05 + i}>
              {/* Si la palabra va marcada, el espacio que la sigue entra dentro
                  del bloque de voltio: si no, un acento de varias palabras se
                  rompe en trozos sueltos en vez de leerse como un solo trazo. */}
              {w}
              {marked && i < words.length - 1 && <>&nbsp;</>}
            </motion.span>
            {i < words.length - 1 && !marked && <span>&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
};

export default Reveal;
