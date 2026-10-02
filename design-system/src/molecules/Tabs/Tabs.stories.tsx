import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Moléculas/Pestañas',
  component: Tabs,
  args: { label: 'Sobre nosotros', items: ['Escucha real', 'Estrategia', 'Cómo trabajamos'], value: 1, onChange: () => {} },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
};
export const Horizontal: Story = { ...Vertical, args: { orientation: 'horizontal' } };
