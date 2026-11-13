'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { LOGO_URL } from '@/lib/products';
import { AccountIcon, CartIcon, SearchIcon, socialLinks } from '@/components/Icons';
import SearchModal from '@/components/SearchModal';

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="border-b border-tan/60 bg-background py-2 text-center text-xs font-bold md:text-sm">
        Envío a todo Chile · Arena premium hecha con amor
      </div>

      <header className="sticky top-0 z-40 border-b border-tan/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex flex-col items-start">
              <div className="relative h-16 w-20">
                <Image src={LOGO_URL} alt="BRR" fill sizes="80px" className="object-contain object-left" />
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-lg font-bold md:flex">
              <Link href="/">Inicio</Link>
              <Link href="/collections">Catálogo</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 md:flex">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-90 hover:opacity-100"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label="Buscar"
              className="hidden md:block"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <Link href="/cuenta" aria-label="Cuenta" className="hidden md:block">
              <AccountIcon className="h-5 w-5" />
            </Link>
            <button type="button" onClick={openCart} aria-label="Carrito" className="relative">
              <CartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
