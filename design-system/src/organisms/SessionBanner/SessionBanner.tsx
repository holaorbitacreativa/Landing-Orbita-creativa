import { Button } from '../../atoms/Button/Button';
import './SessionBanner.css';

export interface SessionBannerProps {
  title?: string;
  detail?: string;
  ctaLabel?: string;
  href?: string;
}

/** Franja bajo los paquetes que invita a la sesión de exploración. Botón secundario. */
export function SessionBanner({
  title = '¿No sabes cuál elegir? Empieza con una sesión de exploración',
  detail = '45 min en línea · $690 MXN con IVA incluido · se abona a tu paquete. Ahí también platicamos de planes mensuales de redes y marketing, tiendas en línea, mantenimiento web y diseño UI/UX a la medida. Precios de paquetes en MXN + IVA.',
  ctaLabel = 'Agendar sesión',
  href = '#agenda',
}: SessionBannerProps) {
  return (
    <aside className="oc-franja">
      <div className="oc-franja__texto">
        <p className="oc-franja__titulo">{title}</p>
        <p className="oc-franja__detalle">{detail}</p>
      </div>
      <Button href={href} variant="secundario">
        {ctaLabel}
      </Button>
    </aside>
  );
}
