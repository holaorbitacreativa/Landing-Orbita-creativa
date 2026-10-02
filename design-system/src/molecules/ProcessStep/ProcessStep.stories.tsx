import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessStep } from './ProcessStep';

const meta = {
  title: 'Moléculas/Paso de proceso',
  component: ProcessStep,
  args: { phase: 1, title: 'Diagnóstico & Kickoff', description: 'Entendemos tu negocio, tu público y tus metas.' },
  decorators: [(Story) => <div style={{ maxWidth: 280 }}>{Story()}</div>],
} satisfies Meta<typeof ProcessStep>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Proceso: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 'none' }}>{Story()}</div>],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      <ProcessStep phase={1} title="Diagnóstico & Kickoff" description="Entendemos tu negocio, tu público y tus metas." />
      <ProcessStep phase={2} title="Estrategia & UX/UI" description="Definimos la ruta y diseñamos la experiencia." />
      <ProcessStep phase={3} title="Desarrollo & visuales" description="Construimos tu marca, sitio y contenidos." />
      <ProcessStep phase={4} title="Entrega & despegue" description="Lanzamos y te acompañamos en los primeros pasos." />
    </div>
  ),
};
