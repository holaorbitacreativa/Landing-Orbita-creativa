import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';

const meta = {
  title: 'Átomos/Pestaña',
  component: Tab,
  args: { children: 'Estrategia', selected: false },
  decorators: [(Story) => <div role="tablist" aria-label="Ejemplo">{Story()}</div>],
} satisfies Meta<typeof Tab>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Activa: Story = { args: { selected: true } };
