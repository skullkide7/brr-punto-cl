import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  caption: string;
  heading: string;
  text: string;
  buttonLabel: string;
  productHandle: string;
  mediaPosition: 'left' | 'right';
  background: string;
  textColor: string;
};

export default function EditorialSection({
  image,
  caption,
  heading,
  text,
  buttonLabel,
  productHandle,
  mediaPosition,
  background,
  textColor,
}: Props) {
  return (
    <section
      className="grid grid-cols-1 items-center md:grid-cols-2"
      style={{ backgroundColor: background, color: textColor }}
    >
      <div
        className={`relative aspect-square overflow-hidden md:aspect-[4/3] ${
          mediaPosition === 'right' ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <Image src={image} alt={heading} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-10" />
      </div>
      <div
        className={`flex flex-col gap-4 px-8 py-12 md:px-16 ${
          mediaPosition === 'right' ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <span className="text-sm font-black uppercase tracking-wide">{caption}</span>
        <h3 className="text-3xl font-black">{heading}</h3>
        <p className="max-w-sm text-base">{text}</p>
        <Link
          href={`/products/${productHandle}`}
          className="btn w-fit"
          style={{ backgroundColor: textColor, color: background, border: `1px solid ${textColor}` }}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
