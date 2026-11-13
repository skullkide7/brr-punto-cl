'use client';

import { useEffect, useState } from 'react';
import { formatCLP } from '@/lib/format';
import type { Order } from '@/lib/orders';

export default function AdminOrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setOrders(data.orders);
        } else {
          setError(data.error ?? 'No se pudo cargar el historial de ventas.');
        }
        setLoaded(true);
      });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  if (!loaded) {
    return <p className="text-sm opacity-60">Cargando…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-card border-2 border-tan p-6">
        <span className="font-bold">Total vendido</span>
        <span className="text-xl font-black">{formatCLP(totalRevenue)}</span>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-sm opacity-60">
          Aún no hay ventas registradas. Las ventas aparecerán aquí automáticamente una vez que el pago
          (Flow) esté conectado y los clientes empiecen a comprar.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-foreground/20 px-4 py-3 text-sm">
              <div className="mb-1 flex items-center justify-between">
                <span className="opacity-60">{new Date(order.createdAt).toLocaleString('es-CL')}</span>
                <span className="font-black">{formatCLP(order.total)}</span>
              </div>
              <p className="opacity-70">{order.customerEmail ?? 'Cliente invitado'}</p>
              <ul className="mt-1 opacity-70">
                {order.lines.map((line) => (
                  <li key={line.title}>
                    {line.quantity}× {line.title} — {formatCLP(line.price * line.quantity)}
                  </li>
                ))}
              </ul>
              {order.discountCode && (
                <p className="mt-1 text-sage">
                  Código {order.discountCode} aplicado (-{formatCLP(order.discountAmount)})
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
