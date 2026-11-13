'use client';

import { useState, type FormEvent } from 'react';

export default function AuthForms({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [tab, setTab] = useState<'login' | 'signup' | 'admin'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.error ?? 'No se pudo iniciar sesión.');
      return;
    }
    onAuthenticated();
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/account/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.error ?? 'No se pudo crear la cuenta.');
      return;
    }
    onAuthenticated();
  }

  async function handleAdminLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    });
    const data = await response.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.error ?? 'Contraseña incorrecta.');
      return;
    }
    onAuthenticated();
  }

  return (
    <section className="mx-auto flex max-w-sm flex-col gap-6 px-4 py-24">
      {tab !== 'admin' && (
        <>
          <div className="flex gap-2 rounded-full border border-foreground/20 p-1">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`flex-1 rounded-full py-2 text-sm font-bold ${
                tab === 'login' ? 'bg-foreground text-background' : ''
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError('');
              }}
              className={`flex-1 rounded-full py-2 text-sm font-bold ${
                tab === 'signup' ? 'bg-foreground text-background' : ''
              }`}
            >
              Crear cuenta
            </button>
          </div>

          {tab === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
              />
              <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-50">
                {loading ? 'Entrando…' : 'Entrar'}
              </button>
            </form>
          )}

          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña (mínimo 6 caracteres)"
                className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
              />
              <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-50">
                {loading ? 'Creando…' : 'Crear cuenta'}
              </button>
            </form>
          )}

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="button"
            onClick={() => {
              setTab('admin');
              setError('');
            }}
            className="text-center text-xs opacity-50 hover:opacity-80"
          >
            ¿Eres la administradora de Brr? Inicia sesión aquí
          </button>
        </>
      )}

      {tab === 'admin' && (
        <>
          <h1 className="text-center text-lg font-black">Acceso administrador</h1>
          <form onSubmit={handleAdminLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Contraseña de administradora"
              className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
            />
            <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-50">
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError('');
            }}
            className="text-center text-xs opacity-50 hover:opacity-80"
          >
            Volver
          </button>
        </>
      )}
    </section>
  );
}
