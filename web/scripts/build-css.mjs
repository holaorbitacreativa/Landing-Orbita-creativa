// Junta los tokens, la tipografía y el CSS de cada componente del design system
// en un solo archivo para que la web estática lo use sin React ni bundler.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const raiz = new URL('../../design-system/src/', import.meta.url).pathname;
const salida = new URL('../css/design-system.css', import.meta.url).pathname;

const archivos = [join(raiz, 'tokens/tokens.css'), join(raiz, 'styles/typography.css')];
for (const capa of ['atoms', 'molecules', 'organisms']) {
  for (const comp of readdirSync(join(raiz, capa)).sort()) {
    const dir = join(raiz, capa, comp);
    if (!statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir)) if (f.endsWith('.css')) archivos.push(join(dir, f));
  }
}

const base = readFileSync(join(raiz, 'styles/base.css'), 'utf8').replace(/^@import.*$/gm, '').trim();
const partes = archivos.map((f) => `/* ${relative(raiz, f)} */\n${readFileSync(f, 'utf8').replace(/^@import.*$/gm, '').trim()}`);

writeFileSync(
  salida,
  `/* Generado por web/scripts/build-css.mjs desde design-system/src. No editar a mano. */\n\n${partes.join('\n\n')}\n\n/* styles/base.css */\n${base}\n`,
);
console.log(`design-system.css: ${archivos.length + 1} archivos`);
