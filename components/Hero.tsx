import Link from 'next/link';

const VIDEOS = [
  '/videos/hero-video-3.mp4',
  'https://cdn.shopify.com/videos/c/vp/b1dfea31369b40d19f50c2dd1994c898/b1dfea31369b40d19f50c2dd1994c898.SD-480p-1.5Mbps-100667380.mp4',
  'https://cdn.shopify.com/videos/c/vp/c46dc934bcd54879b079f2aa03a973ef/c46dc934bcd54879b079f2aa03a973ef.SD-480p-1.5Mbps-100631156.mp4',
  '/videos/hero-video-4.mp4',
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="absolute inset-0 mx-auto grid max-w-6xl grid-cols-4 gap-2 py-6">
        {VIDEOS.map((src, i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl bg-foreground/10">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6">
        <h1 className="text-4xl font-black leading-tight md:text-6xl">Sabemos que tu gato te lo pidió</h1>
        <p className="text-lg font-bold">Arena premium - tu gato tendrá el mejor baño de su barrio.</p>
        <Link
          href="/collections"
          className="btn"
          style={{ backgroundColor: '#6D8B6A', color: '#FFFFFF', border: '1px solid #3A5238' }}
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
