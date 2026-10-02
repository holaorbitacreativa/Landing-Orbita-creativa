// Convierte src/tokens/tokens.json (exportado de las variables de Figma)
// en src/tokens/tokens.css con variables CSS para modo claro y oscuro.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/tokens');
const tokens = JSON.parse(readFileSync(join(dir, 'tokens.json'), 'utf8'));

const cssName = (name) => '--oc-' + name.replace(/\//g, '-');
const primitives = tokens.Primitives.vars;
const resolve = (value) => {
  if (typeof value === 'string' && value.startsWith('{')) {
    const ref = value.slice(1, -1);
    if (!primitives[ref]) throw new Error(`Referencia desconocida: ${ref}`);
    return `var(${cssName(ref)})`;
  }
  return value;
};

const lines = ['/* Generado por scripts/build-tokens.mjs. No editar a mano: cambia tokens.json. */', ''];

lines.push(':root {');
for (const [name, v] of Object.entries(primitives)) lines.push(`  ${cssName(name)}: ${v.Value};`);
for (const [name, v] of Object.entries(tokens['Espaciado y radios'].vars)) lines.push(`  ${cssName(name)}: ${v.Valor}px;`);
lines.push('}', '');

const color = tokens.Color.vars;
const block = (selector, mode, scheme) => {
  lines.push(`${selector} {`, `  color-scheme: ${scheme};`);
  for (const [name, v] of Object.entries(color)) lines.push(`  ${cssName(name)}: ${resolve(v[mode])};`);
  lines.push('}', '');
};
block(':root,\n[data-theme="claro"]', 'Claro', 'light');
block('[data-theme="oscuro"]', 'Oscuro', 'dark');

writeFileSync(join(dir, 'tokens.css'), lines.join('\n'));
console.log(`tokens.css: ${Object.keys(primitives).length} primitivos, ${Object.keys(color).length} semánticos x 2 modos`);
