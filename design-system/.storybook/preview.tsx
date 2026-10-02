import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
    options: {
      storySort: { order: ['Introducción', 'Fundamentos', 'Átomos', 'Moléculas', 'Organismos'] },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Claro: 'claro', Oscuro: 'oscuro' },
      defaultTheme: 'Claro',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
