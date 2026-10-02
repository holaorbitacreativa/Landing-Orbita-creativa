import type { HTMLAttributes } from 'react';
import './Chip.css';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'lima' | 'suave' | 'contorno';
}

/** Etiqueta corta: categorías, estados o destacados como "Más elegido". */
export function Chip({ variant = 'contorno', className, ...rest }: ChipProps) {
  return <span className={['oc-chip', `oc-chip--${variant}`, className].filter(Boolean).join(' ')} {...rest} />;
}
