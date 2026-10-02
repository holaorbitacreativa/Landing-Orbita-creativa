import type { Meta, StoryObj } from '@storybook/react-vite';
import { SessionBanner } from './SessionBanner';

const meta = { title: 'Organismos/Franja de sesión', component: SessionBanner } satisfies Meta<typeof SessionBanner>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
