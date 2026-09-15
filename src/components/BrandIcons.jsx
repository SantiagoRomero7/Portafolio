// Íconos propios y simplificados para herramientas sin logo en react-icons.
// No son los logotipos oficiales: solo evocan cada herramienta con su color.

const Svg = ({ size = 24, className, style, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
    {children}
  </svg>
);

export const PowerBIIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="11" width="5" height="10" rx="1.2" fill="#F2C811" opacity="0.55" />
    <rect x="9.5" y="7" width="5" height="14" rx="1.2" fill="#F2C811" opacity="0.8" />
    <rect x="16" y="3" width="5" height="18" rx="1.2" fill="#F2C811" />
  </Svg>
);

export const PowerAutomateIcon = (props) => (
  <Svg {...props}>
    <path d="M2.5 4h8.5l7 8-7 8H2.5l7-8z" fill="#0066FF" opacity="0.75" />
    <path d="M9.5 4h4.5l7.5 8-7.5 8H9.5l7-8z" fill="#4DA3FF" />
  </Svg>
);

export const N8nIcon = (props) => (
  <Svg {...props}>
    <g stroke="#EA4B71" strokeWidth="1.8" fill="none">
      <path d="M6.5 12h3.5M14.5 12c2 0 2-5 3.5-5M14.5 12c2 0 2 5 3.5 5" />
    </g>
    <g fill="#EA4B71">
      <circle cx="4" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="20" cy="7" r="2.6" />
      <circle cx="20" cy="17" r="2.6" />
    </g>
  </Svg>
);

export const OracleIcon = (props) => (
  <Svg {...props}>
    <rect x="2" y="7" width="20" height="10" rx="5" fill="none" stroke="#F80000" strokeWidth="2.6" />
  </Svg>
);

export const PixIcon = (props) => (
  <Svg {...props}>
    <rect x="2" y="4" width="20" height="16" rx="4" fill="#7C3AED" />
    <text x="12" y="15.2" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">
      PIX
    </text>
  </Svg>
);
