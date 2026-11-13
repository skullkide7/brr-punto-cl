'use client';

import { signOut } from 'next-auth/react';
import { formatCLP } from '@/lib/format';
import type { Customer } from '@/lib/customers';
import type { Order } from '@/lib/orders';

export default function CustomerDashboard({
  customer,
  orders,
}: {
  customer: Customer;
  orders: Order[];
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Hola, {customer.name}</h1>
          <p className="text-sm opacity-60">{customer.email}</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm opacity-60 hover:opacity-100"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-card border-2 border-tan p-6">
        <span className="text-3xl font-black text-sage">{customer.points}</span>
        <span className="text-sm opacity-70">
          puntos acumulados
          <br />
          (1 punto por cada producto comprado)
        </span>
      </div>

      <div className="rounded-card border-2 border-tan p-6">
        <h2 className="mb-4 font-heading text-lg font-black">Tus compras</h2>
        {orders.length === 0 ? (
          <p className="text-sm opacity-60">Aún no tienes compras registradas.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {orders.map((order) => (
              <li key={order.id} className="border-b border-tan/40 pb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="opacity-60">{new Date(order.createdAt).toLocaleString('es-CL')}</span>
                  <span className="font-black">{formatCLP(order.total)}</span>
                </div>
                <ul className="mt-1 opacity-70">
                  {order.lines.map((line) => (
                    <li key={line.title}>
                      {line.quantity}× {line.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
