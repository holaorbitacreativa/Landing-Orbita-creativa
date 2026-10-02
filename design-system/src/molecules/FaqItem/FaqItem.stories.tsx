import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FaqItem } from './FaqItem';

const meta = {
  title: 'Moléculas/Pregunta frecuente',
  component: FaqItem,
  args: {
    question: '¿Cuánto tarda un proyecto?',
    answer: 'Depende del paquete: Despegue toma de 2 a 3 semanas, Órbita Web de 4 a 6 y Galaxia 360 de 6 a 8. En tu sesión de exploración te damos un calendario con fechas claras.',
  },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}>{Story()}</div>],
} satisfies Meta<typeof FaqItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Cerrada: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
};
export const Abierta: Story = { args: { defaultOpen: true } };
