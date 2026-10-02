import type { HTMLAttributes } from 'react';
import { Star } from '../../icons/Icon';
import './Eyebrow.css';

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  /** `estrella` para secciones; `linea` para el bloque de la agenda. */
  variant?: 'estrella' | 'linea';
}

/** Antetítulo de sección. Va antes del título, en mayúsculas. */
export function Eyebrow({ variant = 'estrella', className, children, ...rest }: EyebrowProps) {
  return (
    <p className={['oc-eyebrow', `oc-eyebrow--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      {variant === 'estrella' ? <Star size={14} className="oc-eyebrow__estrella" /> : <span className="oc-eyebrow__linea" aria-hidden />}
      {children}
    </p>
  );
}
