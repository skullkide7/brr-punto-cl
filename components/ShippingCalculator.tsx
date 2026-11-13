'use client';

import { useMemo } from 'react';
import { regions, getCommunesByRegion } from '@/lib/communes';

export default function ShippingCalculator({
  region,
  communeId,
  onRegionChange,
  onCommuneChange,
}: {
  region: string;
  communeId: number | null;
  onRegionChange: (region: string) => void;
  onCommuneChange: (communeId: number | null) => void;
}) {
  const communes = useMemo(() => (region ? getCommunesByRegion(region) : []), [region]);

  const selectClass =
    'w-full rounded-xl border border-foreground/25 bg-background px-4 py-3 text-sm focus:border-foreground/60 focus:outline-none disabled:opacity-50';

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <select
        value={region}
        onChange={(e) => {
          onRegionChange(e.target.value);
          onCommuneChange(null);
        }}
        className={selectClass}
      >
        <option value="">Región</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={communeId ?? ''}
        onChange={(e) => onCommuneChange(e.target.value ? Number(e.target.value) : null)}
        disabled={!region}
        className={selectClass}
      >
        <option value="">Comuna</option>
        {communes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
