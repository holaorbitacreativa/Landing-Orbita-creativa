import { Button } from '../../atoms/Button/Button';
import { Chip } from '../../atoms/Chip/Chip';
import { Icon, type IconName } from '../../icons/Icon';
import { CheckList } from '../../molecules/CheckItem/CheckItem';
import './PackageCard.css';

export interface PackageCardProps {
  name: string;
  description: string;
  icon: IconName;
  /** Precio formateado, p. ej. "$35,000". */
  price: string;
  currency?: string;
  priceLabel?: string;
  duration: string;
  features: string[];
  /** Paquete recomendado: borde azul, chip lima y botón primario. Solo uno por vista. */
  featured?: boolean;
  ctaLabel?: string;
  href?: string;
}

/** Tarjeta de paquete. Los no destacados usan botón secundario para no competir con el recomendado. */
export function PackageCard({
  name,
  description,
  icon,
  price,
  currency = 'MXN',
  priceLabel = 'Desde',
  duration,
  features,
  featured = false,
  ctaLabel = 'Quiero este paquete',
  href = '#agenda',
}: PackageCardProps) {
  return (
    <article className={['oc-paquete', featured && 'oc-paquete--destacado'].filter(Boolean).join(' ')}>
      <div className="oc-paquete__cabecera">
        <span className="oc-paquete__icono">
          <Icon name={icon} size={32} />
        </span>
        {featured && <Chip variant="lima">Más elegido</Chip>}
      </div>
      <h3 className="oc-paquete__nombre">{name}</h3>
      <p className="oc-paquete__descripcion">{description}</p>
      <p className="oc-paquete__desde">{priceLabel}</p>
      <p className="oc-paquete__precio">
        {price} <span className="oc-paquete__moneda">{currency}</span>
      </p>
      <p className="oc-paquete__tiempo">
        <Icon name="reloj" size={16} /> {duration}
      </p>
      <hr className="oc-paquete__divisor" />
      <div className="oc-paquete__incluye">
        <CheckList items={features} />
      </div>
      <Button href={href} variant={featured ? 'primario' : 'secundario'} fullWidth aria-label={`${ctaLabel}: ${name}`}>
        {ctaLabel}
      </Button>
    </article>
  );
}
