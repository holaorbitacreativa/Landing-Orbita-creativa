import type { ReactNode } from 'react';
import { CheckIcon } from '../../atoms/CheckIcon/CheckIcon';
import './CheckItem.css';

/** Beneficio con check. Va dentro de `CheckList`. */
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="oc-item-check">
      <CheckIcon />
      <span>{children}</span>
    </li>
  );
}

/** Lista de beneficios con el check de la agenda. */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="oc-lista-check">
      {items.map((item, i) => (
        <CheckItem key={i}>{item}</CheckItem>
      ))}
    </ul>
  );
}
