import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { collections } from '@/lib/products';

export default function CatalogPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-black">Catálogo</h1>
      <div className="flex flex-col gap-16">
        {collections.map((collection) => (
          <div key={collection.handle} className="flex flex-col gap-6">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-black">{collection.title}</h2>
              <Link href={`/collections/${collection.handle}`} className="text-sm font-bold underline">
                Ver colección
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.products.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
