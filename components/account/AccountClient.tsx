'use client';

import { useEffect, useState } from 'react';
import AuthForms from './AuthForms';
import CustomerDashboard, { type CustomerData } from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';

type Mode = 'loading' | 'guest' | 'customer' | 'admin';

export default function AccountClient() {
  const [mode, setMode] = useState<Mode>('loading');
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  async function refresh() {
    const [adminRes, customerRes] = await Promise.all([
      fetch('/api/admin/discounts'),
      fetch('/api/account/me'),
    ]);

    if (adminRes.status === 200) {
      setMode('admin');
      return;
    }

    if (customerRes.status === 200) {
      const data = await customerRes.json();
      setCustomerData({ customer: data.customer, orders: data.orders });
      setMode('customer');
      return;
    }

    setMode('guest');
  }

  useEffect(() => {
    refresh();
  }, []);

  if (mode === 'loading') {
    return <p className="p-8 text-center text-sm opacity-60">Cargando…</p>;
  }

  if (mode === 'admin') {
    return <AdminDashboard onLogout={refresh} />;
  }

  if (mode === 'customer' && customerData) {
    return <CustomerDashboard data={customerData} onUpdate={refresh} onLogout={refresh} />;
  }

  return <AuthForms onAuthenticated={refresh} />;
}
