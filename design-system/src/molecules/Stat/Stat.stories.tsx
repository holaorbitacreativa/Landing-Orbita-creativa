import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';

const meta = {
  title: 'Moléculas/Contador',
  component: Stat,
  args: { icon: 'servicios', value: '6', label: 'Servicios integrales' },
} satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Fila: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      <Stat icon="servicios" value="6" label="Servicios integrales" />
      <Stat icon="proceso" value="4" label="Fases de trabajo claras" />
      <Stat icon="medida" value="100%" label="Diseño a la medida" />
    </div>
  ),
};
