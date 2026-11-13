'use client';

import { signIn } from 'next-auth/react';

export default function SignInPrompt() {
  return (
    <section className="mx-auto flex max-w-sm flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-xl font-black">Mi cuenta Brr</h1>
      <p className="text-sm opacity-70">
        Inicia sesión con tu cuenta de Google para ver tus puntos y tu historial de compras.
      </p>
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/cuenta' })}
        className="btn btn-primary w-full"
      >
        Continuar con Google
      </button>
    </section>
  );
}
