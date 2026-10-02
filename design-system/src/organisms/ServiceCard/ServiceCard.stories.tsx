import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceCard } from './ServiceCard';

const meta = {
  title: 'Organismos/Tarjeta de servicio',
  component: ServiceCard,
  args: {
    title: 'Branding e identidad visual',
    description: 'Logotipo, paleta, tipografía y manual de marca para que te reconozcan a la primera.',
  },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}>{Story()}</div>],
} satisfies Meta<typeof ServiceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SinImagen: Story = { name: 'Sin imagen' };
