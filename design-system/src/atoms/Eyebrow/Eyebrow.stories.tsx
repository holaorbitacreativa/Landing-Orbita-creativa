import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eyebrow } from './Eyebrow';

const meta = {
  title: 'Átomos/Eyebrow',
  component: Eyebrow,
  args: { children: 'Quiénes somos', variant: 'estrella' },
} satisfies Meta<typeof Eyebrow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ConEstrella: Story = { name: 'Con estrella' };
export const ConLinea: Story = { name: 'Con línea', args: { variant: 'linea', children: 'Empecemos por una conversación' } };
