import './ServiceCard.css';

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  linkLabel?: string;
  href?: string;
}

/** Servicio con imagen de proyecto real y enlace para cotizar. */
export function ServiceCard({ title, description, imageSrc, imageAlt = '', linkLabel = 'Cotizar este servicio', href = '#contacto' }: ServiceCardProps) {
  return (
    <article className="oc-servicio">
      {imageSrc && <img className="oc-servicio__imagen" src={imageSrc} alt={imageAlt} loading="lazy" />}
      <div className="oc-servicio__cuerpo">
        <h3 className="oc-servicio__titulo">{title}</h3>
        <p className="oc-servicio__texto">{description}</p>
        <a className="oc-servicio__enlace" href={href}>
          {linkLabel}
        </a>
      </div>
    </article>
  );
}
