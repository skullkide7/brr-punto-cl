import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getRaffleEntrants, getRaffleWinner, setRaffleWinner } from '@/lib/raffle';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  const month = request.nextUrl.searchParams.get('month');
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ ok: false, error: 'Mes inválido (formato YYYY-MM).' }, { status: 400 });
  }

  const [entrants, winner] = await Promise.all([getRaffleEntrants(month), getRaffleWinner(month)]);
  return NextResponse.json({ ok: true, entrants, winner });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  const body = await request.json();
  const month: unknown = body.month;
  const email: unknown = body.email;

  if (typeof month !== 'string' || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ ok: false, error: 'Mes inválido.' }, { status: 400 });
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Correo inválido.' }, { status: 400 });
  }

  try {
    const winner = await setRaffleWinner(month, email);
    return NextResponse.json({ ok: true, winner });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'No se pudo guardar el ganador.' },
      { status: 500 }
    );
  }
}
