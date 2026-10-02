import './CheckIcon.css';

/** Check de la agenda: círculo lavanda con ✓. Único check del sistema. */
export function CheckIcon() {
  return (
    <span className="oc-check" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.2 5 8.5 9.5 3.5" />
      </svg>
    </span>
  );
}
