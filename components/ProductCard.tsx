'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { formatCLP } from '@/lib/format';
import { useCart } from '@/lib/cart-context';
import { CartIcon } from '@/components/Icons';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col gap-4 rounded-card border-2 border-tan p-6 transition-transform hover:-translate-y-1">
      <Link href={`/products/${product.handle}`} className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-card p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 90vw"
            className="object-contain"
          />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => addItem(product, 1)}
        className="flex items-center justify-center gap-2 rounded-full border border-foreground/30 py-3 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
      >
        <CartIcon className="h-4 w-4" />
        Llevar para mi gato
      </button>

      <Link href={`/products/${product.handle}`} className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-black leading-tight">{product.title}</h3>
        <p className="text-xl font-black">{formatCLP(product.price)}</p>
      </Link>
    </div>
  );
}
