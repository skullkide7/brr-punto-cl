'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatCLP } from '@/lib/format';

export default function CartDrawer() {
  const {
    lines,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    appliedDiscount,
    discountAmount,
    total,
    applyDiscountCode,
    removeDiscount,
  } = useCart();
  const [discount, setDiscount] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [applying, setApplying] = useState(false);

  async function handleApplyDiscount(e: FormEvent) {
    e.preventDefault();
    if (!discount.trim()) return;
    setApplying(true);
    setDiscountError('');
    const result = await applyDiscountCode(discount);
    setApplying(false);
    if (!result.ok) {
      setDiscountError(result.error ?? 'Código inválido.');
      return;
    }
    setDiscount('');
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-foreground/30 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Carrito de compra"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-tan/60 p-5">
          <h2 className="text-lg font-black">
            Carrito {lines.length > 0 && <span className="font-normal opacity-60">({lines.length})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20"
          >
            &times;
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-lg font-bold">Tu carrito está vacío</p>
            <Link href="/" onClick={closeCart} className="btn btn-primary">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              <ul className="flex flex-col gap-5">
                {lines.map((line) => (
                  <li key={line.variantId} className="flex gap-4 border-b border-tan/40 pb-5">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-tan/60 bg-white">
                      <Image src={line.image} alt={line.title} fill sizes="80px" className="object-contain" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${line.handle}`}
                          onClick={closeCart}
                          className="text-sm font-bold leading-tight"
                        >
                          {line.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(line.variantId)}
                          aria-label="Quitar producto"
                          className="text-xs opacity-60 hover:opacity-100"
                        >
                          Quitar
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-foreground/20 px-2 py-1">
                          <button
                            type="button"
                            aria-label="Restar"
                            onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                            className="h-6 w-6 text-sm font-bold"
                          >
                            -
                          </button>
                          <span className="min-w-4 text-center text-sm font-semibold">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label="Sumar"
                            onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                            className="h-6 w-6 text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-black">{formatCLP(line.price * line.quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-tan/60 p-5">
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
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Código de descuento"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/50"
                  />
                  <button
                    type="submit"
                    disabled={applying}
                    className="btn btn-outline px-4 py-2 text-xs disabled:opacity-50"
                  >
                    {applying ? 'Validando…' : 'Aplicar'}
                  </button>
                </form>
              )}
              {discountError && <p className="text-xs text-red-700">{discountError}</p>}

              {appliedDiscount && (
                <div className="flex items-center justify-between text-sm opacity-70">
                  <span>Subtotal</span>
                  <span>{formatCLP(subtotal)}</span>
                </div>
              )}
              {appliedDiscount && (
                <div className="flex items-center justify-between text-sm text-sage">
                  <span>Descuento</span>
                  <span>-{formatCLP(discountAmount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-base font-black">
                <span>Total estimado</span>
                <span>{formatCLP(total)}</span>
              </div>
              <p className="text-xs opacity-60">IVA incluido. Envío calculado en el pago.</p>
              <Link href="/checkout" onClick={closeCart} className="btn btn-primary w-full">
                Finalizar compra
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
