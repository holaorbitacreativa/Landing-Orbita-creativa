import type { ButtonHTMLAttributes, Ref } from 'react';
import './Tab.css';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

/** Pestaña de navegación secundaria. Úsala dentro de `Tabs`. */
export function Tab({ selected = false, className, ...rest }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={['oc-pestana', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
