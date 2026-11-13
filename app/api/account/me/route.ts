import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/customer-session';
import { getCustomerByEmail, toPublicCustomer } from '@/lib/customers';
import { listOrdersForEmail } from '@/lib/orders';

export async function GET(request: NextRequest) {
  const email = await getSessionEmail(request);
  if (!email) {
    return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 });
  }

  const customer = await getCustomerByEmail(email);
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Cuenta no encontrada.' }, { status: 404 });
  }

  const orders = await listOrdersForEmail(email);
  return NextResponse.json({ ok: true, customer: toPublicCustomer(customer), orders });
}
