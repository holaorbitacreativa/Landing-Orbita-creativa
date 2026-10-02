import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Átomos/Botón',
  component: Button,
  args: { children: 'Agenda tu sesión', variant: 'primario', withArrow: true },
  argTypes: { variant: { control: 'inline-radio', options: ['primario', 'secundario', 'fantasma'] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};
export const Secundario: Story = { args: { variant: 'secundario', children: 'Conoce nuestros servicios' } };
export const Fantasma: Story = { args: { variant: 'fantasma', children: 'Ver proyecto' } };
export const ComoEnlace: Story = { name: 'Como enlace', args: { href: '#agenda' } };
export const Jerarquia: Story = {
  name: 'Jerarquía en una sección',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button>Agenda tu sesión</Button>
      <Button variant="secundario">Conoce nuestros servicios</Button>
      <Button variant="fantasma">Ver proyecto</Button>
    </div>
  ),
};
