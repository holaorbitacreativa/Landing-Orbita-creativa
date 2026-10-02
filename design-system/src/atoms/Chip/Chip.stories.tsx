import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Átomos/Chip',
  component: Chip,
  args: { children: 'Más elegido', variant: 'lima' },
  argTypes: { variant: { control: 'inline-radio', options: ['lima', 'suave', 'contorno'] } },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Lima: Story = {};
export const Suave: Story = { args: { variant: 'suave', children: 'Se abona a tu paquete' } };
export const Contorno: Story = { args: { variant: 'contorno', children: 'Packaging · Ilustración' } };
