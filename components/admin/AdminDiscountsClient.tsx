'use client';

import { useEffect, useState, type FormEvent } from 'react';

type DiscountCode = {
  code: string;
  percentage: number;
  createdAt: string;
};

export default function AdminDiscountsClient() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [listError, setListError] = useState('');

  const [percentage, setPercentage] = useState('10');
  const [customCode, setCustomCode] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [lastCreated, setLastCreated] = useState<DiscountCode | null>(null);

  async function loadCodes() {
    const response = await fetch('/api/admin/discounts');
    if (response.status === 401) {
      setAuthed(false);
      setAuthChecked(true);
      return;
    }
    const data = await response.json();
    if (data.ok) {
      setCodes(data.codes);
      setListError('');
    } else {
      setListError(data.error ?? 'No se pudo cargar la lista.');
    }
    setAuthed(true);
    setAuthChecked(true);
  }

  useEffect(() => {
    loadCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!data.ok) {
      setLoginError(data.error ?? 'Contraseña incorrecta.');
      return;
    }
    setPassword('');
    await loadCodes();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setCodes([]);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const percentageNumber = Number(percentage);
    if (!percentageNumber || percentageNumber <= 0 || percentageNumber > 100) {
      setCreateError('Ingresa un porcentaje válido entre 1 y 100.');
      return;
    }
    setCreating(true);
    setCreateError('');
    setLastCreated(null);
    const response = await fetch('/api/admin/discounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ percentage: percentageNumber, code: customCode || undefined }),
    });
    const data = await response.json();
    setCreating(false);
    if (!data.ok) {
      setCreateError(data.error ?? 'No se pudo crear el código.');
      return;
    }
    setLastCreated(data.entry);
    setCustomCode('');
    await loadCodes();
  }

  async function handleDelete(code: string) {
    await fetch(`/api/admin/discounts/${code}`, { method: 'DELETE' });
    await loadCodes();
  }

  if (!authChecked) {
    return <p className="p-8 text-sm opacity-60">Cargando…</p>;
  }

  if (!authed) {
    return (
      <section className="mx-auto flex max-w-sm flex-col gap-4 px-4 py-24">
        <h1 className="text-xl font-black">Acceso administrador</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
          />
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
          {loginError && <p className="text-sm text-red-700">{loginError}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-black">Códigos de descuento</h1>
        <button type="button" onClick={handleLogout} className="text-sm opacity-60 hover:opacity-100">
          Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={handleCreate}
        className="mb-8 flex flex-col gap-3 rounded-card border-2 border-tan p-6"
      >
        <h2 className="font-heading text-lg font-black">Generar nuevo código</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
          >
            <option value="10">10% de descuento</option>
            <option value="20">20% de descuento</option>
            <option value="custom">Otro porcentaje…</option>
          </select>
          {percentage === 'custom' && (
            <input
              type="number"
              min={1}
              max={100}
              placeholder="Porcentaje"
              onChange={(e) => setPercentage(e.target.value)}
              className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
            />
          )}
          <input
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="Código manual (opcional, si no se genera uno aleatorio)"
            className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm sm:col-span-2"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="btn btn-primary w-fit disabled:opacity-50"
        >
          {creating ? 'Generando…' : 'Generar código'}
        </button>
        {createError && <p className="text-sm text-red-700">{createError}</p>}
        {lastCreated && (
          <p className="text-sm">
            Código creado: <span className="font-black">{lastCreated.code}</span> (-
            {lastCreated.percentage}%)
          </p>
        )}
      </form>

      <h2 className="mb-4 font-heading text-lg font-black">Códigos activos</h2>
      {listError && <p className="text-sm text-red-700">{listError}</p>}
      {codes.length === 0 ? (
        <p className="text-sm opacity-60">No hay códigos activos todavía.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {codes.map((entry) => (
            <li
              key={entry.code}
              className="flex items-center justify-between rounded-2xl border border-foreground/20 px-4 py-3 text-sm"
            >
              <div>
                <span className="font-black">{entry.code}</span>{' '}
                <span className="opacity-70">(-{entry.percentage}%)</span>
                <p className="text-xs opacity-50">
                  Creado el {new Date(entry.createdAt).toLocaleDateString('es-CL')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(entry.code)}
                className="text-xs opacity-60 hover:opacity-100"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
