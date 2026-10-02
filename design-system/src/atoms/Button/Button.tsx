import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Button.css';

export type ButtonVariant = 'primario' | 'secundario' | 'fantasma';

interface CommonProps {
  variant?: ButtonVariant;
  /** Muestra la flecha al final. */
  withArrow?: boolean;
  /** Ocupa todo el ancho del contenedor. */
  fullWidth?: boolean;
  children: ReactNode;
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = AsButton | AsLink;

/** Botón de acción. Con `href` se renderiza como enlace. */
export function Button({ variant = 'primario', withArrow = true, fullWidth = false, children, className, ...rest }: ButtonProps) {
  const classes = ['oc-boton', `oc-boton--${variant}`, fullWidth && 'oc-boton--ancho', className].filter(Boolean).join(' ');
  const content = (
    <>
      {children}
      {withArrow && <Icon name="flecha" size={20} className="oc-boton__flecha" />}
    </>
  );
  if ('href' in rest && rest.href !== undefined) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>;
  }
  return <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>;
}
