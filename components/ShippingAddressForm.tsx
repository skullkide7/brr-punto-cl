'use client';

import { ShippingAddress } from '@/lib/shipping';

export default function ShippingAddressForm({
  address,
  onChange,
  disabled,
}: {
  address: Omit<ShippingAddress, 'communeId' | 'communeName'>;
  onChange: (address: Omit<ShippingAddress, 'communeId' | 'communeName'>) => void;
  disabled: boolean;
}) {
  function update<K extends keyof typeof address>(key: K, value: (typeof address)[K]) {
    onChange({ ...address, [key]: value });
  }

  return (
    <div className="flex flex-col gap-4 rounded-card border-2 border-tan p-6">
      <h2 className="font-heading text-lg font-black">Dirección de despacho</h2>
      {disabled && (
        <p className="text-sm opacity-60">Primero elige región y comuna arriba para habilitar estos datos.</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Nombre completo"
          value={address.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50 sm:col-span-2"
        />
        <input
          type="text"
          placeholder="Calle"
          value={address.street}
          onChange={(e) => update('street', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50"
        />
        <input
          type="text"
          placeholder="Número"
          value={address.number}
          onChange={(e) => update('number', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50"
        />
        <input
          type="text"
          placeholder="Depto / casa / oficina (opcional)"
          value={address.complement}
          onChange={(e) => update('complement', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={address.phone}
          onChange={(e) => update('phone', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={address.email}
          onChange={(e) => update('email', e.target.value)}
          disabled={disabled}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50 sm:col-span-2"
        />
      </div>
    </div>
  );
}
