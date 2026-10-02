# Órbita Creativa

- Idioma: todo en español (textos, nombres de historias, comentarios, commits).
- Fuente de verdad visual: Figma `Nxub8bD0kNmQD2Z683Rnpu` (páginas 🪐 Fundamentos, 🧩 Componentes, 🌐 Web v2).
- Tokens: edita `design-system/src/tokens/tokens.json` (espejo de las variables de Figma) y corre `npm run tokens`.
  Nunca escribas colores en hexadecimal dentro de componentes: usa `var(--oc-...)`.
- Jerarquía de color: azul solo para lo interactivo; lila para énfasis editorial; lima para un destacado por vista;
  lavanda para fondos de apoyo. Un solo botón primario por sección.
- Atomic design: `atoms/`, `molecules/`, `organisms/`. Cada componente tiene su `.tsx`, `.css` y `.stories.tsx`.
- Clases CSS con prefijo `oc-` para que la web pueda usarlas también sin React.
- Antes de subir cambios: `npm run typecheck` y `npm run build-storybook` dentro de `design-system/`.
