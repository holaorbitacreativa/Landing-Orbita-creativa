# Órbita Creativa · Web

Repositorio de la web de Órbita Creativa y su design system.

| Carpeta | Qué es |
| --- | --- |
| `design-system/` | Tokens, componentes (átomos, moléculas, organismos) y Storybook. |
| `web/` | La web (próximamente), construida con los componentes del design system. |

## Design system

```bash
cd design-system
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # versión estática en storybook-static/
npm run typecheck
```

La fuente de verdad del diseño es el archivo de Figma
[Órbita Creativa · DS](https://www.figma.com/design/Nxub8bD0kNmQD2Z683Rnpu). Las variables de Figma se exportan a
`design-system/src/tokens/tokens.json`, y `npm run tokens` genera `tokens.css`.
