import type { Metadata } from 'next';
import AdminDiscountsClient from '@/components/admin/AdminDiscountsClient';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDiscountsPage() {
  return <AdminDiscountsClient />;
}
