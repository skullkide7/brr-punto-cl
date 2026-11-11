import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ProductCard from '@/components/ProductCard';
import EditorialSection from '@/components/EditorialSection';
import VideoGallery from '@/components/VideoGallery';
import { allProducts, getProductByHandle } from '@/lib/products';
import Link from 'next/link';

export default function HomePage() {
  const bentonita = getProductByHandle(
    'arena-sanitaria-natural-brr-de-bentonita-6-kg-ligera-aglomerante-y-sin-fragancia'
  )!;
  const premium = getProductByHandle(
    'arena-sanitaria-premium-brr-con-carbon-activado-6-kg-bentonita-control-de-olores-y-ultra-bajo-polvo'
  )!;
  const tofu = getProductByHandle(
    'arena-sanitaria-natural-brr-de-tofu-y-cassava-6-kg-premium-sostenible-y-premezclada'
  )!;

  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-black">Productos destacados</h2>
          <Link href="/collections" className="text-sm font-bold underline">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      <EditorialSection
        image={bentonita.image}
        caption="Bentonita"
        heading="Ligera, aglomerante y sin fragancia"
        text="Nuestra arena de bentonita se aglomera al instante y controla el olor sin perfumes agresivos para tu gato."
        buttonLabel="Comprar Bentonita"
        productHandle={bentonita.handle}
        mediaPosition="left"
        background="#DCC2A0"
        textColor="#3A5238"
      />

      <EditorialSection
        image={premium.image}
        caption="Premium"
        heading="Control de olores y ultra bajo polvo"
        text="Con carbón activado para la máxima absorción de olores y una experiencia premium en cada detalle."
        buttonLabel="Comprar Premium"
        productHandle={premium.handle}
        mediaPosition="right"
        background="#6D8B6A"
        textColor="#FAF4EC"
      />

      <EditorialSection
        image={tofu.image}
        caption="Tofu y Cassava"
        heading="Mezcla vegetal, natural y sostenible"
        text="Elaborada con tofu y cassava, se aglomera al instante y cuida a tu gato y al planeta."
        buttonLabel="Comprar Tofu"
        productHandle={tofu.handle}
        mediaPosition="left"
        background="#FAF4EC"
        textColor="#3A5238"
      />

      <section className="bg-foreground px-6 py-16 text-center text-background">
        <h2 className="text-3xl font-black">Detalles que lo hacen ronronear</h2>
        <p className="mx-auto mt-3 max-w-md">
          Natural, eficiente y sostenible — para un hogar más limpio y un planeta más verde.
        </p>
        <Link href="/collections" className="btn mt-6 inline-flex bg-background text-foreground">
          Comprar ahora
        </Link>
      </section>

      <VideoGallery />
    </>
  );
}
