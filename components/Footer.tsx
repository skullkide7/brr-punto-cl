'use client';

import { useState } from 'react';
import { socialLinks } from '@/components/Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="border-t border-tan/60 bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-black">Únete a nuestra lista</h2>
          <p className="text-sm">Descuentos exclusivos y acceso anticipado a nuevos productos.</p>
          <p className="text-sm">
            Whatsapp: +56949610802 · Chile
            <br />
            contacto@brr.cl · www.brr.cl
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex items-center gap-2 rounded-full border border-foreground/30 p-1 pl-5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Dirección de correo electrónico"
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-foreground/50"
            />
            <button
              type="submit"
              aria-label="Suscribirse"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background"
            >
              &rarr;
            </button>
          </form>
          {submitted && <p className="text-xs">¡Gracias por suscribirte!</p>}

          <div className="flex gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-tan/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-4 py-4 text-xs opacity-70 md:grid-cols-3">
          <span>&copy; {new Date().getFullYear()} BRR</span>
          <span className="text-center font-semibold">BRR &reg; Todos los derechos reservados.</span>
          <span className="text-right">
            <a href="#" className="underline">
              Términos y políticas
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
