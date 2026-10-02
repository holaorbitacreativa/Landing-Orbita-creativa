import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames, Star } from './Icon';

const meta = {
  title: 'Fundamentos/Íconos',
  component: Icon,
  args: { name: 'web', size: 44 },
  argTypes: { name: { control: 'select', options: iconNames } },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Uno: Story = { name: 'Ícono', render: (args) => <span style={{ color: 'var(--oc-texto-acento)' }}><Icon {...args} /></span> };
export const Todos: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 110px)', gap: 16 }}>
      {iconNames.map((n) => (
        <div key={n} style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: 16, borderRadius: 16, background: 'var(--oc-fondo-superficie)', color: 'var(--oc-texto-acento)' }}>
          <Icon name={n} size={36} />
          <code style={{ fontSize: 12, color: 'var(--oc-texto-secundario)' }}>{n}</code>
        </div>
      ))}
      <div style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: 16, borderRadius: 16, background: 'var(--oc-fondo-superficie)', color: 'var(--oc-acento-estrella)' }}>
        <Star size={36} />
        <code style={{ fontSize: 12, color: 'var(--oc-texto-secundario)' }}>Star</code>
      </div>
    </div>
  ),
};
