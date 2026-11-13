'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import AdminDiscountsPanel from './AdminDiscountsPanel';
import AdminOrdersPanel from './AdminOrdersPanel';
import AdminRafflePanel from './AdminRafflePanel';

type Tab = 'descuentos' | 'ventas' | 'sorteo';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('ventas');

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-black">Panel de administración</h1>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm opacity-60 hover:opacity-100"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mb-8 flex gap-2 rounded-full border border-foreground/20 p-1">
        {(
          [
            ['ventas', 'Ventas'],
            ['descuentos', 'Códigos de descuento'],
            ['sorteo', 'Sorteo mensual'],
          ] as [Tab, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`flex-1 rounded-full py-2 text-sm font-bold ${
              tab === value ? 'bg-foreground text-background' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'ventas' && <AdminOrdersPanel />}
      {tab === 'descuentos' && <AdminDiscountsPanel />}
      {tab === 'sorteo' && <AdminRafflePanel />}
    </section>
  );
}
