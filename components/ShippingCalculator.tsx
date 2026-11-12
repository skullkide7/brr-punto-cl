'use client';

import { useMemo, useState } from 'react';
import { regions, getCommunesByRegion } from '@/lib/communes';
import { formatCLP } from '@/lib/format';
import { CartLine } from '@/lib/cart-context';

type Rate = { courierName: string; serviceName: string; price: number; days: number };

export default function ShippingCalculator({
  lines,
  region,
  communeId,
  onRegionChange,
  onCommuneChange,
  onSelect,
}: {
  lines: CartLine[];
  region: string;
  communeId: number | null;
  onRegionChange: (region: string) => void;
  onCommuneChange: (communeId: number | null) => void;
  onSelect: (rate: Rate | null) => void;
}) {
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const communes = useMemo(() => (region ? getCommunesByRegion(region) : []), [region]);

  async function handleCalculate() {
    if (!communeId) return;
    setStatus('loading');
    setError('');
    setRates([]);
    setSelectedIndex(null);
    onSelect(null);

    try {
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communeId,
          items: lines.map((l) => ({ handle: l.handle, quantity: l.quantity })),
        }),
      });
      const data = await response.json();
      if (!data.ok) {
        setStatus('error');
        setError(data.error ?? 'No se pudo calcular el envío.');
        return;
      }
      setRates(data.rates);
      setStatus('idle');
      if (data.rates.length === 0) {
        setError('No hay couriers disponibles para esa comuna.');
      }
    } catch {
      setStatus('error');
      setError('No se pudo calcular el envío. Intenta nuevamente.');
    }
  }

  function selectRate(index: number) {
    setSelectedIndex(index);
    onSelect(rates[index]);
  }

  return (
    <div className="flex flex-col gap-4 rounded-card border-2 border-tan p-6">
      <h2 className="font-heading text-lg font-black">Calcula tu envío</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          value={region}
          onChange={(e) => {
            onRegionChange(e.target.value);
            onCommuneChange(null);
            setRates([]);
            setSelectedIndex(null);
            onSelect(null);
          }}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
        >
          <option value="">Región</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={communeId ?? ''}
          onChange={(e) => onCommuneChange(e.target.value ? Number(e.target.value) : null)}
          disabled={!region}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm disabled:opacity-50"
        >
          <option value="">Comuna</option>
          {communes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!communeId || status === 'loading'}
        className="btn btn-outline w-fit disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? 'Calculando…' : 'Calcular envío'}
      </button>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {rates.length > 0 && (
        <ul className="flex flex-col gap-2">
          {rates.map((rate, index) => (
            <li key={`${rate.courierName}-${rate.serviceName}`}>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-foreground/20 px-4 py-3 text-sm has-[:checked]:border-foreground">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping-rate"
                    checked={selectedIndex === index}
                    onChange={() => selectRate(index)}
                  />
                  <span>
                    <span className="block font-bold capitalize">{rate.courierName}</span>
                    <span className="block opacity-60">{rate.days} día(s) hábil(es)</span>
                  </span>
                </span>
                <span className="font-black">{formatCLP(rate.price)}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
