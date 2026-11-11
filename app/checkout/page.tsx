'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatCLP } from '@/lib/format';
import ShippingCalculator from '@/components/ShippingCalculator';

type Rate = { courierName: string; serviceName: string; price: number; days: number };

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [shippingRate, setShippingRate] = useState<Rate | null>(null);
  const total = subtotal + (shippingRate?.price ?? 0);

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-black">Tu carrito está vacío</h1>
        <Link href="/" className="btn btn-primary">
          Volver a la tienda
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-2xl font-black">Resumen de tu pedido</h1>
      <ul className="mb-8 flex flex-col gap-4">
        {lines.map((line) => (
          <li key={line.variantId} className="flex items-center justify-between gap-4 border-b border-tan/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-tan/60 bg-white">
                <Image src={line.image} alt={line.title} fill sizes="56px" className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold">{line.title}</p>
                <p className="text-xs opacity-60">Cantidad: {line.quantity}</p>
              </div>
            </div>
            <span className="font-black">{formatCLP(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mb-8">
        <ShippingCalculator lines={lines} onSelect={setShippingRate} />
      </div>

      <div className="mb-2 flex items-center justify-between text-sm opacity-70">
        <span>Subtotal</span>
        <span>{formatCLP(subtotal)}</span>
      </div>
      <div className="mb-8 flex items-center justify-between text-sm opacity-70">
        <span>Envío</span>
        <span>{shippingRate ? formatCLP(shippingRate.price) : 'Por calcular'}</span>
      </div>
      <div className="mb-8 flex items-center justify-between text-xl font-black">
        <span>Total</span>
        <span>{formatCLP(total)}</span>
      </div>

      <button type="button" disabled className="btn btn-primary w-full cursor-not-allowed opacity-50">
        Continuar con el pago (próximamente)
      </button>
      <p className="mt-4 text-center text-xs opacity-60">
        El pago con Webpay y Mercado Pago se conectará aquí una vez configurados.
      </p>
    </section>
  );
}
