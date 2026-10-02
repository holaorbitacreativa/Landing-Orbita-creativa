import type { ButtonHTMLAttributes } from 'react';
import './TimeSlot.css';

export interface TimeSlotProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Horario disponible en la agenda. */
export function TimeSlot({ selected = false, className, ...rest }: TimeSlotProps) {
  return <button type="button" aria-pressed={selected} className={['oc-horario', className].filter(Boolean).join(' ')} {...rest} />;
}
