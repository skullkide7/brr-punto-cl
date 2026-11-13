import type { Metadata } from 'next';
import AccountClient from '@/components/account/AccountClient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CuentaPage() {
  return <AccountClient />;
}
