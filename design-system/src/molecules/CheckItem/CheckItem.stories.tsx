import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckList } from './CheckItem';

const meta = {
  title: 'Moléculas/Item con check',
  component: CheckList,
  args: { items: ['Diagnóstico de tu marca y presencia digital', 'Recomendación del paquete ideal para ti', 'Lista de siguientes pasos y tareas recomendadas'] },
} satisfies Meta<typeof CheckList>;
export default meta;
export const Lista: StoryObj<typeof meta> = {};
