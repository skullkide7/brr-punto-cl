'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useCart } from '@/lib/cart-context';
import { formatCLP } from '@/lib/format';
import { LOGO_URL } from '@/lib/products';
import ShippingCalculator from '@/components/ShippingCalculator';
import ShippingMethodSelector from '@/components/ShippingMethodSelector';
import ShippingAddressForm from '@/components/ShippingAddressForm';
import { communes } from '@/lib/communes';

const checkoutFont = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

type Rate = { courierName: string; serviceName: string; price: number; days: number };
type AddressFields = {
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  complement: string;
  postalCode: string;
  phone: string;
};

const emptyAddress: AddressFields = {
  firstName: '',
  lastName: '',
  street: '',
  number: '',
  complement: '',
  postalCode: '',
  phone: '',
};

export default function CheckoutPage() {
  const { lines, subtotal, appliedDiscount, discountAmount, applyDiscountCode, removeDiscount } = useCart();
  const [email, setEmail] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [region, setRegion] = useState('');
  const [communeId, setCommuneId] = useState<number | null>(null);
  const [shippingRate, setShippingRate] = useState<Rate | null>(null);
  const [address, setAddress] = useState<AddressFields>(emptyAddress);
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const total = subtotal - discountAmount + (shippingRate?.price ?? 0);
  const taxAmount = Math.round(total - total / 1.19);

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
    email.trim() !== '' &&
    address.firstName.trim() !== '' &&
    address.lastName.trim() !== '' &&
    address.street.trim() !== '' &&
    address.number.trim() !== '' &&
    address.phone.trim() !== '';

  const canPay = addressComplete && shippingRate !== null;
  const communeName = communeId !== null ? communes.find((c) => c.id === communeId)?.name : undefined;

  if (lines.length === 0) {
    return (
      <div className={`${checkoutFont.className} flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white px-4 text-center`}>
        <h1 className="text-2xl font-black">Tu carrito está vacío</h1>
        <Link href="/" className="btn btn-primary">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className={`${checkoutFont.className} grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2`}>
      {/* Left column: contact + delivery form */}
      <div className="flex flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Contacto</h2>
            <Link href="/cuenta" className="text-sm font-bold underline underline-offset-2">
              Iniciar sesión
            </Link>
          </div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-foreground/25 bg-white px-4 py-3 text-sm placeholder:text-foreground/50 focus:border-foreground/60 focus:outline-none"
          />
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={newsletterOptIn}
              onChange={(e) => setNewsletterOptIn(e.target.checked)}
              className="h-4 w-4 rounded border-foreground/40"
            />
            Enviarme novedades y ofertas por correo electrónico
          </label>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-black">Entrega</h2>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-foreground/25 bg-white px-4 py-3 text-sm">
              <span className="block text-xs opacity-60">País / Región</span>
              Chile
            </div>

            <ShippingCalculator
              region={region}
              communeId={communeId}
              onRegionChange={(r) => {
                setRegion(r);
                setAddress(emptyAddress);
              }}
              onCommuneChange={setCommuneId}
            />

            <ShippingAddressForm address={address} onChange={setAddress} disabled={communeId === null} />

            {communeName && (
              <p className="text-xs opacity-60">Despachando a {communeName}, {region}.</p>
            )}

            <label className="mt-1 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="h-4 w-4 rounded border-foreground/40"
              />
              Guardar mi información y consultar más rápidamente la próxima vez
            </label>
          </div>
        </div>

        <ShippingMethodSelector lines={lines} communeId={communeId} onSelect={setShippingRate} />

        <div>
          <button type="button" disabled className="btn btn-primary w-full cursor-not-allowed opacity-50">
            Continuar con el pago (próximamente)
          </button>
          <p className="mt-4 text-center text-xs opacity-60">
            {canPay
              ? 'El pago con Webpay y Mercado Pago se conectará aquí una vez configurados.'
              : 'Completa el envío y tus datos de despacho para continuar con el pago.'}
          </p>
        </div>
      </div>

      {/* Right column: order summary, fills the entire right side */}
      <div className="flex flex-col items-center gap-8 bg-background px-8 py-12 sm:px-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:px-12 lg:py-16">
        <div className="w-full max-w-xl">
          <div className="relative mx-auto h-40 w-56">
            <Image src={LOGO_URL} alt="BRR" fill sizes="224px" className="object-contain" />
          </div>

          <ul className="mt-10 flex flex-col gap-6">
            {lines.map((line) => (
              <li key={line.variantId} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-tan/60 bg-white">
                      <Image src={line.image} alt={line.title} fill sizes="80px" className="object-contain" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1 text-sm font-bold text-background">
                      {line.quantity}
                    </span>
                  </div>
                  <p className="text-lg font-bold">{line.title}</p>
                </div>
                <span className="shrink-0 text-lg font-black">{formatCLP(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {appliedDiscount ? (
              <div className="flex items-center justify-between rounded-full border border-sage/60 bg-sage/10 px-5 py-3 text-base">
                <span className="font-bold">
                  Código {appliedDiscount.code} (-{appliedDiscount.percentage}%)
                </span>
                <button type="button" onClick={removeDiscount} className="text-sm opacity-60 hover:opacity-100">
                  Quitar
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleApplyDiscount}
                className="flex items-center gap-2 rounded-full border border-foreground/25 bg-white p-1.5 pl-5"
              >
                <input
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="Código de descuento"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-foreground/50"
                />
                <button
                  type="submit"
                  disabled={applyingDiscount}
                  className="rounded-full bg-foreground/10 px-5 py-2.5 text-base font-bold text-foreground/70 disabled:opacity-50"
                >
                  {applyingDiscount ? 'Validando…' : 'Aplicar'}
                </button>
              </form>
            )}
            {discountError && <p className="mt-2 text-sm text-red-700">{discountError}</p>}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-foreground/15 pt-6 text-base">
            <div className="flex items-center justify-between opacity-70">
              <span>Subtotal</span>
              <span>{formatCLP(subtotal)}</span>
            </div>
            {appliedDiscount && (
              <div className="flex items-center justify-between text-sage">
                <span>Descuento</span>
                <span>-{formatCLP(discountAmount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between opacity-70">
              <span>Envío</span>
              <span>{shippingRate ? formatCLP(shippingRate.price) : 'Por calcular'}</span>
            </div>
          </div>

          <div className="mt-8 border-t border-foreground/15 pt-6">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm opacity-60">CLP</span>
                <span className="text-4xl font-black">{formatCLP(total)}</span>
              </div>
            </div>
            <p className="text-right text-sm opacity-60">Incluye {formatCLP(taxAmount)} de impuestos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
