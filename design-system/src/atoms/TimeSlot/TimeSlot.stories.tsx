import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeSlot } from './TimeSlot';

const meta = {
  title: 'Átomos/Horario',
  component: TimeSlot,
  args: { children: '10:00', selected: false },
} satisfies Meta<typeof TimeSlot>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Seleccionado: Story = { args: { selected: true, children: '12:00' } };
