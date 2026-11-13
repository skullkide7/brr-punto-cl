import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { listOrders } from '@/lib/orders';

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ ok: true, orders });
}
