import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { listOrders } from '@/lib/orders';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ ok: true, orders });
}
