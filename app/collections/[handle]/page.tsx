import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { collections, getCollectionByHandle } from '@/lib/products';

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const collection = getCollectionByHandle(params.handle);
  if (!collection) return notFound();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-black">{collection.title}</h1>
        {collection.description && <p className="opacity-70">{collection.description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collection.products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
