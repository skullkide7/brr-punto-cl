import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_COOKIE, destroyCustomerSession } from '@/lib/customer-session';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(CUSTOMER_COOKIE)?.value;
  if (token) await destroyCustomerSession(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CUSTOMER_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}
