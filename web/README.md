# Web de Órbita Creativa (prototipo)

Página estática que replica el frame **Web v2 · Claro/Oscuro** de Figma con las clases `oc-*` del design system
y las animaciones del template original (precarga, cursor, revelado al hacer scroll, recorte de imágenes,
contadores, encabezado fijo, volver arriba y bandas en movimiento). Respeta `prefers-reduced-motion`.

- `index.html`: maquetación.
- `css/design-system.css`: **generado**. Corre `node scripts/build-css.mjs` cuando cambie `design-system/src`.
- `css/sitio.css`: maquetación de secciones y animaciones.
- `js/main.js`: comportamiento, sin dependencias.
- `img/`: fotos exportadas de Figma en WebP; `img/galaxia` y `img/banda` son las ilustraciones vectoriales separadas en capas para el paralaje.

Para verla en local: `python3 -m http.server` dentro de `web/` y abre `http://localhost:8000`.
