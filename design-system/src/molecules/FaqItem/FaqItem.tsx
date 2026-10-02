import { useId, useState } from 'react';
import './FaqItem.css';

export interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

/** Pregunta frecuente desplegable, accesible con teclado y lector de pantalla. */
export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="oc-faq">
      <h3 className="oc-faq__titulo">
        <button type="button" className="oc-faq__boton" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {question}
          <span className="oc-faq__signo" aria-hidden>+</span>
        </button>
      </h3>
      <p id={id} className="oc-faq__respuesta" hidden={!open}>
        {answer}
      </p>
    </div>
  );
}
