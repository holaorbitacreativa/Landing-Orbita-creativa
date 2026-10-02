import { useRef, type KeyboardEvent } from 'react';
import { Tab } from '../../atoms/Tab/Tab';
import './Tabs.css';

export interface TabsProps {
  /** Nombre accesible del grupo. */
  label: string;
  items: string[];
  value: number;
  onChange: (index: number) => void;
  orientation?: 'vertical' | 'horizontal';
}

/** Grupo de pestañas con navegación por flechas, como en la sección Nosotros. */
export function Tabs({ label, items, value, onChange, orientation = 'vertical' }: TabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent) => {
    const keys = orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const next = (value + (e.key === keys[1] ? 1 : -1) + items.length) % items.length;
    onChange(next);
    refs.current[next]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} aria-orientation={orientation} className={`oc-pestanas oc-pestanas--${orientation}`} onKeyDown={onKeyDown}>
      {items.map((item, i) => (
        <Tab key={item} ref={(el) => { refs.current[i] = el; }} selected={i === value} onClick={() => onChange(i)}>
          {item}
        </Tab>
      ))}
    </div>
  );
}
