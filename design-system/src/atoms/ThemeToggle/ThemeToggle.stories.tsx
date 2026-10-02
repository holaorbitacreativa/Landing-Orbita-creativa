import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Átomos/Botón de modo',
  component: ThemeToggle,
  args: { theme: 'claro', onToggle: fn() },
} satisfies Meta<typeof ThemeToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Claro: Story = {};
export const Oscuro: Story = { args: { theme: 'oscuro' } };
