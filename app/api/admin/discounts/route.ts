import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { createDiscountCode, listDiscountCodes } from '@/lib/discounts';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  const codes = await listDiscountCodes();
  return NextResponse.json({ ok: true, codes });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }

  const body = await request.json();
  const percentage: unknown = body.percentage;
  const requestedCode: unknown = body.code;

  if (typeof percentage !== 'number' || percentage <= 0 || percentage > 100) {
    return NextResponse.json(
      { ok: false, error: 'El porcentaje debe ser un número entre 1 y 100.' },
      { status: 400 }
    );
  }

  try {
    const entry = await createDiscountCode(
      percentage,
      typeof requestedCode === 'string' ? requestedCode : undefined
    );
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'No se pudo crear el código.' },
      { status: 500 }
    );
  }
}
