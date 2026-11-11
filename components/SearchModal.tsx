'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { allProducts } from '@/lib/products';
import { formatCLP } from '@/lib/format';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 px-4 pt-24" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-card bg-background p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 rounded-full border border-foreground/30 px-5 py-3">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-foreground/50"
          />
          <button type="button" onClick={onClose} aria-label="Cerrar búsqueda" className="text-sm font-bold opacity-60">
            Cerrar
          </button>
        </div>

        {query.trim() && (
          <div className="mt-4 flex max-h-96 flex-col gap-2 overflow-y-auto">
            {results.length === 0 && (
              <p className="py-6 text-center text-sm opacity-60">No se encontraron productos para “{query}”.</p>
            )}
            {results.map((p) => (
              <Link
                key={p.handle}
                href={`/products/${p.handle}`}
                onClick={onClose}
                className="flex items-center gap-4 rounded-xl p-2 hover:bg-tan/20"
              >
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-tan/60 bg-white">
                  <Image src={p.image} alt={p.title} fill sizes="56px" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{p.title}</span>
                  <span className="text-sm font-black">{formatCLP(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
