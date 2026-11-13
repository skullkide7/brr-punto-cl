import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import { allProducts, getProductByHandle, getRelatedProducts, getUnitPrice } from '@/lib/products';
import { formatCLP } from '@/lib/format';

export function generateStaticParams() {
  return allProducts.map((p) => ({ handle: p.handle }));
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle);
  if (!product) return notFound();

  const relatedProducts = getRelatedProducts(params.handle);
  const unitPrice = getUnitPrice(product);

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <div className="relative h-[70vh] max-h-[640px] self-start overflow-hidden md:sticky md:top-[140px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-black">{product.title}</h1>
          <div>
            <p className="text-2xl font-black">{formatCLP(product.price)}</p>
            {unitPrice !== null && (
              <p className="text-xs opacity-60">{formatCLP(unitPrice)} c/u (6 kg)</p>
            )}
          </div>
          <AddToCartButton product={product} />
          <div
            className="product-description opacity-90"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-8 text-2xl font-black">También te puede interesar</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
