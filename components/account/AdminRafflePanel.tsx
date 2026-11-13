'use client';

import { useEffect, useState } from 'react';
import type { RaffleEntrant, RaffleWinner } from '@/lib/raffle';

function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export default function AdminRafflePanel() {
  const [month, setMonth] = useState(currentMonth());
  const [entrants, setEntrants] = useState<RaffleEntrant[]>([]);
  const [winner, setWinner] = useState<RaffleWinner | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadMonth() {
    setLoading(true);
    setError('');
    const response = await fetch(`/api/admin/raffle?month=${month}`);
    const data = await response.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.error ?? 'No se pudo cargar el sorteo.');
      return;
    }
    setEntrants(data.entrants);
    setWinner(data.winner);
  }

  useEffect(() => {
    loadMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  async function handleMarkWinner(email: string) {
    const response = await fetch('/api/admin/raffle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, email }),
    });
    const data = await response.json();
    if (data.ok) setWinner(data.winner);
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm font-bold" htmlFor="raffle-month">
          Mes
        </label>
        <input
          id="raffle-month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-full border border-foreground/30 bg-background px-4 py-2 text-sm"
        />
      </div>

      <p className="mb-6 text-sm opacity-60">Participan los clientes que compraron algo durante ese mes.</p>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {loading && <p className="text-sm opacity-60">Cargando…</p>}

      {winner && (
        <div className="mb-6 rounded-card border-2 border-sage bg-sage/10 p-4 text-sm">
          <span className="font-bold">Ganador/a de {month}:</span> {winner.email}
        </div>
      )}

      {!loading && entrants.length === 0 ? (
        <p className="text-sm opacity-60">Nadie cumple los requisitos para participar este mes todavía.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {entrants.map((entry) => (
            <li
              key={entry.customer.email}
              className="flex items-center justify-between rounded-2xl border border-foreground/20 px-4 py-3 text-sm"
            >
              <div>
                <span className="font-bold">{entry.customer.name}</span>{' '}
                <span className="opacity-60">({entry.customer.email})</span>
                <p className="text-xs opacity-50">{entry.orderCount} compra(s) este mes</p>
              </div>
              <button
                type="button"
                onClick={() => handleMarkWinner(entry.customer.email)}
                disabled={winner?.email === entry.customer.email}
                className="btn btn-outline px-4 py-2 text-xs disabled:opacity-50"
              >
                {winner?.email === entry.customer.email ? 'Ganador/a' : 'Marcar como ganador/a'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
