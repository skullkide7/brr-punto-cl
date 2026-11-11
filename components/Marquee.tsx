const items = [
  '· Fórmula natural',
  '· Aglomeración superior',
  '· Bajo polvo y control de olores',
  '· No se adhiere a la bandeja',
  '· Calidad premium',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-tan py-4">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="px-6 whitespace-nowrap text-lg font-black uppercase text-foreground">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
