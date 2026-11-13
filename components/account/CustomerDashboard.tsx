'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { formatCLP } from '@/lib/format';
import type { PublicCustomer } from '@/lib/customers';
import type { Order } from '@/lib/orders';

export type CustomerData = {
  customer: PublicCustomer;
  orders: Order[];
};

export default function CustomerDashboard({
  data,
  onUpdate,
  onLogout,
}: {
  data: CustomerData;
  onUpdate: () => void;
  onLogout: () => void;
}) {
  const { customer, orders } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleLogout() {
    await fetch('/api/account/logout', { method: 'POST' });
    onLogout();
  }

  async function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('photo', file);
    const response = await fetch('/api/account/photos', { method: 'POST', body: formData });
    const result = await response.json();
    setUploading(false);
    if (!result.ok) {
      setUploadError(result.error ?? 'No se pudo subir la foto.');
      return;
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    onUpdate();
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Hola, {customer.name}</h1>
          <p className="text-sm opacity-60">{customer.email}</p>
        </div>
        <button type="button" onClick={handleLogout} className="text-sm opacity-60 hover:opacity-100">
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

      <div className="mb-8 rounded-card border-2 border-tan p-6">
        <h2 className="mb-1 font-heading text-lg font-black">Fotos de tu gato</h2>
        <p className="mb-4 text-sm opacity-60">
          Sube una foto cada mes para participar en el sorteo mensual (además de haber comprado ese mes).
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handlePhotoChange}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="mt-2 text-sm opacity-60">Subiendo…</p>}
        {uploadError && <p className="mt-2 text-sm text-red-700">{uploadError}</p>}

        {customer.catPhotos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {customer.catPhotos.map((photo) => (
              <div
                key={photo.url}
                className="relative aspect-square overflow-hidden rounded-xl border border-tan/60 bg-white"
              >
                <Image src={photo.url} alt="Foto de gato" fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
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
