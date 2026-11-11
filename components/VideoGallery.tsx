const videos = [
  'https://cdn.shopify.com/videos/c/vp/9930312d0d02462daeade6e7cf70d3e8/9930312d0d02462daeade6e7cf70d3e8.HD-720p-1.6Mbps-100631374.mp4',
  'https://cdn.shopify.com/videos/c/vp/c46dc934bcd54879b079f2aa03a973ef/c46dc934bcd54879b079f2aa03a973ef.HD-720p-4.5Mbps-100631156.mp4',
  'https://cdn.shopify.com/videos/c/vp/1207f9fc427149a7b4c90ff6b9f7510c/1207f9fc427149a7b4c90ff6b9f7510c.HD-720p-4.5Mbps-100631154.mp4',
];

export default function VideoGallery() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-3">
      {videos.map((src, i) => (
        <video
          key={i}
          className="aspect-[9/16] w-full rounded-card border-2 border-tan object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </section>
  );
}
