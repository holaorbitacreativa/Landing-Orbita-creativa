import './ThemeToggle.css';

export interface ThemeToggleProps {
  theme: 'claro' | 'oscuro';
  onToggle: () => void;
}

/** Cambia entre modo claro y oscuro. Muestra la luna en claro y el sol en oscuro. */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'claro' ? 'oscuro' : 'claro';
  return (
    <button type="button" className="oc-modo" onClick={onToggle} aria-label={`Cambiar a modo ${next}`}>
      {theme === 'claro' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <path d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
          <circle cx="10" cy="10" r="4" />
          <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" />
        </svg>
      )}
    </button>
  );
}
