import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getOrCreateCustomer } from '@/lib/customers';
import { listOrdersForEmail } from '@/lib/orders';
import SignInPrompt from '@/components/account/SignInPrompt';
import AdminDashboard from '@/components/account/AdminDashboard';
import CustomerDashboard from '@/components/account/CustomerDashboard';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CuentaPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <SignInPrompt />;
  }

  if (session.user.isAdmin) {
    return <AdminDashboard />;
  }

  try {
    const customer = await getOrCreateCustomer(session.user.email, session.user.name ?? '');
    const orders = await listOrdersForEmail(session.user.email);
    return <CustomerDashboard customer={customer} orders={orders} />;
  } catch (error) {
    return (
      <section className="mx-auto max-w-sm px-4 py-24 text-center">
        <p className="text-sm text-red-700">
          {error instanceof Error ? error.message : 'No se pudo cargar tu cuenta.'}
        </p>
      </section>
    );
  }
}
