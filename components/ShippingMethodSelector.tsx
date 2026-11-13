'use client';

import { useEffect, useState } from 'react';
import { formatCLP } from '@/lib/format';
import { CartLine } from '@/lib/cart-context';

type Rate = { courierName: string; serviceName: string; price: number; days: number };

export default function ShippingMethodSelector({
  lines,
  communeId,
  onSelect,
}: {
  lines: CartLine[];
  communeId: number | null;
  onSelect: (rate: Rate | null) => void;
}) {
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const linesSignature = lines.map((l) => `${l.handle}:${l.quantity}`).join(',');

  useEffect(() => {
    if (!communeId) {
      setRates([]);
      setSelectedIndex(null);
      setStatus('idle');
      setError('');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError('');
    setRates([]);
    setSelectedIndex(null);
    onSelect(null);

    fetch('/api/shipping/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        communeId,
        items: lines.map((l) => ({ handle: l.handle, quantity: l.quantity })),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
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
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
        setError('No se pudo calcular el envío. Intenta nuevamente.');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communeId, linesSignature]);

  function selectRate(index: number) {
    setSelectedIndex(index);
    onSelect(rates[index]);
  }

  return (
    <div className="flex flex-col gap-4 rounded-card border-2 border-tan p-6">
      <h2 className="font-heading text-lg font-black">Métodos de envío</h2>

      {!communeId && (
        <p className="text-sm opacity-60">
          Completa tu región y comuna en Entrega para ver los métodos de envío disponibles.
        </p>
      )}
      {status === 'loading' && <p className="text-sm opacity-60">Calculando envío…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {rates.length > 0 && (
        <ul className="flex flex-col gap-2">
          {rates.map((rate, index) => (
            <li key={`${rate.courierName}-${rate.serviceName}`}>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-foreground/20 px-4 py-3 text-sm has-[:checked]:border-foreground has-[:checked]:bg-foreground/5">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping-rate"
                    checked={selectedIndex === index}
                    onChange={() => selectRate(index)}
                  />
                  <span>
                    <span className="block font-bold capitalize">
                      🚚 {rate.courierName} — {rate.serviceName}
                    </span>
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
