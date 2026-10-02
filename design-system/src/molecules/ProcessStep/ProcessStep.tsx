import './ProcessStep.css';

export interface ProcessStepProps {
  phase: number;
  title: string;
  description: string;
}

/** Fase del proceso de trabajo. */
export function ProcessStep({ phase, title, description }: ProcessStepProps) {
  return (
    <article className="oc-paso">
      <p className="oc-paso__fase">Fase {String(phase).padStart(2, '0')}</p>
      <h3 className="oc-paso__titulo">{title}</h3>
      <p className="oc-paso__texto">{description}</p>
    </article>
  );
}
