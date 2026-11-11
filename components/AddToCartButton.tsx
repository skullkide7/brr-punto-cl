'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  function handleBuyNow() {
    addItem(product, quantity);
    router.push('/checkout');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-fit items-center gap-3 rounded-full border border-foreground/30 px-4 py-2">
        <button
          type="button"
          aria-label="Restar"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-lg font-bold"
        >
          -
        </button>
        <span className="min-w-6 text-center font-semibold">{quantity}</span>
        <button
          type="button"
          aria-label="Sumar"
          onClick={() => setQuantity((q) => q + 1)}
          className="text-lg font-bold"
        >
          +
        </button>
      </div>
      <button type="button" onClick={() => addItem(product, quantity)} className="btn btn-primary w-full">
        Agregar al carrito
      </button>
      <button type="button" onClick={handleBuyNow} className="btn btn-primary w-full">
        Comprar ahora
      </button>
    </div>
  );
}
