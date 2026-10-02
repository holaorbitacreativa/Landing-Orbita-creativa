import type { ButtonHTMLAttributes } from 'react';
import './CalendarDay.css';

export type CalendarDayState = 'disponible' | 'seleccionado' | 'no-disponible' | 'hoy';

export interface CalendarDayProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  day: number;
  state?: CalendarDayState;
  /** Fecha completa para lectores de pantalla, p. ej. "miércoles 14 de octubre". */
  label?: string;
}

/** Día del calendario de la agenda. */
export function CalendarDay({ day, state = 'disponible', label, className, ...rest }: CalendarDayProps) {
  return (
    <button
      type="button"
      className={['oc-dia', `oc-dia--${state}`, className].filter(Boolean).join(' ')}
      disabled={state === 'no-disponible'}
      aria-pressed={state === 'seleccionado'}
      aria-label={label}
      {...rest}
    >
      {day}
    </button>
  );
}
