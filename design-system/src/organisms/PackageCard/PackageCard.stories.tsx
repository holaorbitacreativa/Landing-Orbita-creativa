import type { Meta, StoryObj } from '@storybook/react-vite';
import { SessionBanner } from '../SessionBanner/SessionBanner';
import { PackageCard, type PackageCardProps } from './PackageCard';

const paquetes: PackageCardProps[] = [
  {
    name: 'Despegue',
    description: 'Tu marca y tu primera página, listas para salir al mundo.',
    icon: 'cohete',
    price: '$16,500',
    duration: '2 a 3 semanas',
    features: ['Identidad visual: logo, paleta y tipografías', 'Landing page responsive de una sección', 'Formulario de contacto y botón de WhatsApp', 'Entrega ágil en plantilla optimizada', '2 rondas de ajustes'],
  },
  {
    name: 'Órbita Web',
    description: 'Tu sitio a la medida, listo para vender y recibir clientes.',
    icon: 'web',
    price: '$35,000',
    duration: '4 a 6 semanas',
    featured: true,
    features: ['Diseño UX/UI a la medida', 'Sitio de hasta 7 secciones, 100% responsive', 'SEO básico y optimización de velocidad', 'Pagos en línea o CRM integrados', '2 meses de cuidado web incluidos'],
  },
  {
    name: 'Galaxia 360',
    description: 'Marca completa + sitio a la medida: todo tu universo en un solo equipo.',
    icon: 'galaxia',
    price: '$49,900',
    duration: '6 a 8 semanas',
    features: ['Branding completo: estrategia, logo y manual', 'Sitio a la medida de hasta 7 secciones', '3 aplicaciones de marca (redes o papelería)', 'Capacitación para manejar tu sitio', '3 meses de cuidado web incluidos'],
  },
];

const meta = {
  title: 'Organismos/Tarjeta de paquete',
  component: PackageCard,
  args: paquetes[0],
} satisfies Meta<typeof PackageCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const narrow: Story['decorators'] = [(Story) => <div style={{ maxWidth: 420 }}>{Story()}</div>];

export const Default: Story = { decorators: narrow };
export const Destacado: Story = { args: paquetes[1], decorators: narrow };
export const SeccionPaquetes: Story = {
  name: 'Sección de paquetes',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ padding: 32 }}>{Story()}</div>],
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {paquetes.map((p) => (
          <PackageCard key={p.name} {...p} />
        ))}
      </div>
      <SessionBanner />
    </div>
  ),
};
