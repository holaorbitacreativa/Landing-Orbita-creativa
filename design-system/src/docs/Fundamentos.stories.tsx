import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens/tokens.json';

const meta: Meta = { title: 'Fundamentos', parameters: { layout: 'padded' } };
export default meta;

const cssVar = (name: string) => `var(--oc-${name.replace(/\//g, '-')})`;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 } as const;
const label = { margin: 0, font: '600 14px/1.4 var(--oc-fuente)', color: 'var(--oc-texto-principal)' } as const;
const sub = { margin: 0, font: '400 13px/1.4 var(--oc-fuente)', color: 'var(--oc-texto-secundario)' } as const;

function Swatch({ name, detail }: { name: string; detail: string }) {
  return (
    <div style={{ border: '1px solid var(--oc-borde-default)', borderRadius: 16, overflow: 'hidden', background: 'var(--oc-fondo-superficie)' }}>
      <div style={{ height: 72, background: cssVar(name), borderBottom: '1px solid var(--oc-borde-default)' }} />
      <div style={{ padding: 12 }}>
        <p style={label}>{name}</p>
        <p style={sub}>{detail}</p>
      </div>
    </div>
  );
}

export const ColoresSemanticos: StoryObj = {
  name: 'Colores semánticos',
  render: () => (
    <div style={grid}>
      {Object.entries(tokens.Color.vars).map(([name, v]) => (
        <Swatch key={name} name={name} detail={`Claro ${v.Claro} · Oscuro ${v.Oscuro}`} />
      ))}
    </div>
  ),
};

export const ColoresPrimitivos: StoryObj = {
  name: 'Colores primitivos',
  render: () => (
    <div style={grid}>
      {Object.entries(tokens.Primitives.vars).map(([name, v]) => (
        <Swatch key={name} name={name} detail={v.Value} />
      ))}
    </div>
  ),
};

const textStyles = [
  ['display-hero', 'Display/Hero', 'Tu marca'],
  ['display-hero-acento', 'Display/Hero acento', 'órbita'],
  ['display-xl', 'Display/XL', 'Lo que creamos'],
  ['display-l', 'Display/L', 'Lo que creamos'],
  ['display-acento', 'Display/Acento', 'tu proyecto?'],
  ['titulo-h1', 'Titulo/H1', 'Elige el impulso'],
  ['titulo-h2', 'Titulo/H2', 'Resolvemos todas tus dudas'],
  ['titulo-h3', 'Titulo/H3', 'Órbita Web'],
  ['titulo-h4', 'Titulo/H4', 'Diagnóstico & Kickoff'],
  ['cuerpo-l', 'Cuerpo/L', 'Ayudamos a emprendedoras, emprendedores y pymes.'],
  ['cuerpo-m', 'Cuerpo/M', 'Ayudamos a emprendedoras, emprendedores y pymes.'],
  ['cuerpo-s', 'Cuerpo/S', 'Ayudamos a emprendedoras, emprendedores y pymes.'],
  ['navegacion-m', 'Navegación/M', 'Servicios'],
  ['etiqueta-m', 'Etiqueta/M', 'Quiénes somos'],
  ['etiqueta-s', 'Etiqueta/S', 'Más elegido'],
  ['boton-m', 'Boton/M', 'Agenda tu sesión'],
  ['precio-xl', 'Precio/XL', '$35,000'],
  ['dato-calendario', 'Dato/Calendario', '14'],
] as const;

export const Tipografia: StoryObj = {
  name: 'Tipografía',
  render: () => (
    <div style={{ display: 'grid', gap: 28 }}>
      {textStyles.map(([cls, name, sample]) => (
        <div key={cls} style={{ display: 'grid', gap: 4, overflow: 'hidden' }}>
          <p style={sub}>
            {name} · <code>.oc-texto--{cls}</code>
          </p>
          <p className={`oc-texto--${cls}`} style={{ margin: 0, color: 'var(--oc-texto-principal)', whiteSpace: 'nowrap' }}>
            {sample}
          </p>
        </div>
      ))}
      <p className="oc-texto--titulo-h2" style={{ margin: 0, color: 'var(--oc-texto-principal)' }}>
        Resolvemos todas tus <span className="oc-destacado">dudas</span>
      </p>
    </div>
  ),
};

export const Espaciado: StoryObj = {
  name: 'Espaciado y radios',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {Object.entries(tokens['Espaciado y radios'].vars).map(([name, v]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <code style={{ ...sub, width: 120 }}>{name}</code>
          {name.startsWith('espacio') ? (
            <div style={{ width: v.Valor, height: 16, background: 'var(--oc-acento-suave)', border: '1px solid var(--oc-borde-acento)' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: v.Valor, background: 'var(--oc-acento-suave)', border: '1px solid var(--oc-borde-acento)' }} />
          )}
          <span style={sub}>{v.Valor}px</span>
        </div>
      ))}
    </div>
  ),
};
