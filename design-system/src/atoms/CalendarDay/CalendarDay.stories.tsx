import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDay } from './CalendarDay';

const meta = {
  title: 'Átomos/Día',
  component: CalendarDay,
  args: { day: 14, state: 'disponible' },
  argTypes: { state: { control: 'inline-radio', options: ['disponible', 'seleccionado', 'no-disponible', 'hoy'] } },
} satisfies Meta<typeof CalendarDay>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <CalendarDay day={13} state="disponible" />
      <CalendarDay day={14} state="seleccionado" />
      <CalendarDay day={15} state="no-disponible" />
      <CalendarDay day={16} state="hoy" />
    </div>
  ),
};
export const Disponible: Story = {};
export const Seleccionado: Story = { args: { state: 'seleccionado' } };
