'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatCLP } from '@/lib/format';
import ShippingCalculator from '@/components/ShippingCalculator';
import ShippingAddressForm from '@/components/ShippingAddressForm';
import { communes } from '@/lib/communes';

type Rate = { courierName: string; serviceName: string; price: number; days: number };
type AddressFields = {
  fullName: string;
  street: string;
  number: string;
  complement: string;
  phone: string;
  email: string;
};

const emptyAddress: AddressFields = {
  fullName: '',
  street: '',
  number: '',
  complement: '',
  phone: '',
  email: '',
};

export default function CheckoutPage() {
  const { lines, subtotal, appliedDiscount, discountAmount, applyDiscountCode, removeDiscount } = useCart();
  const [region, setRegion] = useState('');
  const [communeId, setCommuneId] = useState<number | null>(null);
  const [shippingRate, setShippingRate] = useState<Rate | null>(null);
  const [address, setAddress] = useState<AddressFields>(emptyAddress);
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const total = subtotal - discountAmount + (shippingRate?.price ?? 0);

  async function handleApplyDiscount(e: FormEvent) {
    e.preventDefault();
    if (!discountInput.trim()) return;
    setApplyingDiscount(true);
    setDiscountError('');
    const result = await applyDiscountCode(discountInput);
    setApplyingDiscount(false);
    if (!result.ok) {
      setDiscountError(result.error ?? 'Código inválido.');
      return;
    }
    setDiscountInput('');
  }

  const addressComplete =
    communeId !== null &&
    address.fullName.trim() !== '' &&
    address.street.trim() !== '' &&
    address.number.trim() !== '' &&
    address.phone.trim() !== '' &&
    address.email.trim() !== '';

  const canPay = addressComplete && shippingRate !== null;
  const communeName = communeId !== null ? communes.find((c) => c.id === communeId)?.name : undefined;

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

      <div className="mb-6">
        <ShippingCalculator
          lines={lines}
          region={region}
          communeId={communeId}
          onRegionChange={(r) => {
            setRegion(r);
            setAddress(emptyAddress);
          }}
          onCommuneChange={setCommuneId}
          onSelect={setShippingRate}
        />
      </div>

      <div className="mb-8">
        <ShippingAddressForm
          address={address}
          onChange={setAddress}
          disabled={communeId === null}
        />
        {communeName && (
          <p className="mt-2 text-xs opacity-60">Despachando a {communeName}, {region}.</p>
        )}
      </div>

      <div className="mb-6">
        {appliedDiscount ? (
          <div className="flex items-center justify-between rounded-full border border-sage/60 bg-sage/10 px-4 py-2 text-sm">
            <span className="font-bold">
              Código {appliedDiscount.code} (-{appliedDiscount.percentage}%)
            </span>
            <button type="button" onClick={removeDiscount} className="text-xs opacity-60 hover:opacity-100">
              Quitar
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleApplyDiscount}
            className="flex items-center gap-2 rounded-full border border-foreground/20 p-1 pl-4"
          >
            <input
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder="Código de descuento"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/50"
            />
            <button
              type="submit"
              disabled={applyingDiscount}
              className="btn btn-outline px-4 py-2 text-xs disabled:opacity-50"
            >
              {applyingDiscount ? 'Validando…' : 'Aplicar'}
            </button>
          </form>
        )}
        {discountError && <p className="mt-2 text-xs text-red-700">{discountError}</p>}
      </div>

      <div className="mb-2 flex items-center justify-between text-sm opacity-70">
        <span>Subtotal</span>
        <span>{formatCLP(subtotal)}</span>
      </div>
      {appliedDiscount && (
        <div className="mb-2 flex items-center justify-between text-sm text-sage">
          <span>Descuento</span>
          <span>-{formatCLP(discountAmount)}</span>
        </div>
      )}
      <div className="mb-8 flex items-center justify-between text-sm opacity-70">
        <span>Envío</span>
        <span>{shippingRate ? formatCLP(shippingRate.price) : 'Por calcular'}</span>
      </div>
      <div className="mb-1 flex items-center justify-between text-xl font-black">
        <span>Total</span>
        <span>{formatCLP(total)}</span>
      </div>
      <p className="mb-8 text-right text-xs opacity-60">IVA incluido</p>

      <button type="button" disabled className="btn btn-primary w-full cursor-not-allowed opacity-50">
        Continuar con el pago (próximamente)
      </button>
      <p className="mt-4 text-center text-xs opacity-60">
        {canPay
          ? 'El pago con Webpay y Mercado Pago se conectará aquí una vez configurados.'
          : 'Completa el envío y tus datos de despacho para continuar con el pago.'}
      </p>
    </section>
  );
}
