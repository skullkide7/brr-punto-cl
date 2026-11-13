import { NextRequest, NextResponse } from 'next/server';
import { getDiscountCode } from '@/lib/discounts';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const code: unknown = body.code;

  if (typeof code !== 'string' || code.trim() === '') {
    return NextResponse.json({ ok: false, error: 'Ingresa un código.' }, { status: 400 });
  }

  const entry = await getDiscountCode(code);
  if (!entry) {
    return NextResponse.json({ ok: false, error: 'Código inválido o vencido.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, code: entry.code, percentage: entry.percentage });
}
