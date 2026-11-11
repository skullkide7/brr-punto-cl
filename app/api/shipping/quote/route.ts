import { NextRequest, NextResponse } from 'next/server';
import { getProductByHandle, getProductWeightKg } from '@/lib/products';
import { fetchShippingRates } from '@/lib/shipping';

type QuoteRequestItem = { handle: string; quantity: number };

export async function POST(request: NextRequest) {
  const body = await request.json();
  const toCommuneId: unknown = body.communeId;
  const items: unknown = body.items;

  if (typeof toCommuneId !== 'number' || !Array.isArray(items)) {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const totalWeightKg = (items as QuoteRequestItem[]).reduce((sum, item) => {
    const product = getProductByHandle(item.handle);
    if (!product) return sum;
    return sum + getProductWeightKg(product) * item.quantity;
  }, 0);

  if (totalWeightKg <= 0) {
    return NextResponse.json({ ok: false, error: 'El carrito está vacío.' }, { status: 400 });
  }

  const result = await fetchShippingRates(toCommuneId, totalWeightKg);

  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result);
}
