import type { SVGProps } from 'react';

/** Íconos de línea de marca. Heredan el color con `currentColor`. */
const paths = {
  web: (
    <>
      <rect x="6" y="9" width="32" height="24" rx="4" />
      <path d="M6 15 H38 M16 38 H28 M22 33 V38" />
    </>
  ),
  cohete: (
    <>
      <path d="M22 6 C30 12 31 22 27 30 H17 C13 22 14 12 22 6Z" />
      <circle cx="22" cy="18" r="3" />
      <path d="M17 30 L12 36 M27 30 L32 36 M22 32 V38" />
    </>
  ),
  galaxia: (
    <>
      <circle cx="22" cy="22" r="6" />
      <ellipse cx="22" cy="22" rx="17" ry="7" transform="rotate(-25 22 22)" />
      <circle cx="36" cy="11" r="2" />
    </>
  ),
  orbita: (
    <>
      <path d="M22 5 Q22 22 39 22 Q22 22 22 39 Q22 22 5 22 Q22 22 22 5Z" />
      <circle cx="22" cy="22" r="18" strokeDasharray="4 5" />
    </>
  ),
  servicios: (
    <>
      <circle cx="22" cy="22" r="7" />
      <ellipse cx="22" cy="22" rx="18" ry="7" transform="rotate(-25 22 22)" />
    </>
  ),
  proceso: (
    <>
      <path d="M6 30 L16 18 L24 24 L38 10" />
      <path d="M30 10 H38 V18" />
    </>
  ),
  medida: <path d="M22 5 Q22 22 39 22 Q22 22 22 39 Q22 22 5 22 Q22 22 22 5Z" />,
  grafica: <path d="M8 36 V22 M18 36 V14 M28 36 V24 M38 36 V8" />,
  redes: (
    <>
      <rect x="12" y="5" width="20" height="34" rx="5" />
      <path d="M22 27 l-4 -4 a3 3 0 0 1 4 -4 a3 3 0 0 1 4 4z" />
    </>
  ),
  flecha: <path d="M8 22 H36 M26 12 L36 22 L26 32" />,
  reloj: (
    <>
      <circle cx="22" cy="22" r="16" />
      <path d="M22 13 V22 L28 26" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;
export const iconNames = Object.keys(paths) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** Tamaño en px. */
  size?: number;
  /** Texto para lectores de pantalla. Sin él, el ícono es decorativo. */
  label?: string;
}

export function Icon({ name, size = 24, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** Estrella de 4 puntas de la marca. Usa `--oc-acento-estrella` por defecto. */
export function Star({ size = 16, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden {...rest}>
      <path d="M11 0 Q11 11 22 11 Q11 11 11 22 Q11 11 0 11 Q11 11 11 0Z" fill="currentColor" />
    </svg>
  );
}
