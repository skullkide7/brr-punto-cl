'use client';

import { ShippingAddress } from '@/lib/shipping';

type Fields = Omit<ShippingAddress, 'communeId' | 'communeName' | 'email'>;

export default function ShippingAddressForm({
  address,
  onChange,
  disabled,
}: {
  address: Fields;
  onChange: (address: Fields) => void;
  disabled: boolean;
}) {
  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    onChange({ ...address, [key]: value });
  }

  const inputClass =
    'w-full rounded-xl border border-foreground/25 bg-white px-4 py-3 text-sm placeholder:text-foreground/50 focus:border-foreground/60 focus:outline-none disabled:opacity-50';

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Nombre"
          value={address.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          disabled={disabled}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={address.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <input
        type="text"
        placeholder="Dirección"
        value={address.street}
        onChange={(e) => update('street', e.target.value)}
        disabled={disabled}
        className={inputClass}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Número"
          value={address.number}
          onChange={(e) => update('number', e.target.value)}
          disabled={disabled}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Casa, departamento, etc. (opcional)"
          value={address.complement}
          onChange={(e) => update('complement', e.target.value)}
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <input
        type="text"
        placeholder="Código postal (opcional)"
        value={address.postalCode}
        onChange={(e) => update('postalCode', e.target.value)}
        disabled={disabled}
        className={inputClass}
      />

      <input
        type="tel"
        placeholder="Teléfono"
        value={address.phone}
        onChange={(e) => update('phone', e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
    </div>
  );
}
