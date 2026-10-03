import { Icon, type IconName } from '../../icons/Icon';
import './Stat.css';

export interface StatProps {
  icon: IconName;
  value: string;
  label: string;
}

/** Contador de la sección Nosotros. Ícono de apoyo en lavanda, no en azul sólido. */
export function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="oc-dato">
      <span className="oc-dato__icono">
        <Icon name={icon} size={28} />
      </span>
      <span className="oc-dato__divisor" aria-hidden />
      <div>
        <p className="oc-dato__valor">{value}</p>
        <p className="oc-dato__etiqueta">{label}</p>
      </div>
    </div>
  );
}
