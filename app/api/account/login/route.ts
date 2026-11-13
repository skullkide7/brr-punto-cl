import { NextRequest, NextResponse } from 'next/server';
import { getCustomerByEmail, toPublicCustomer, verifyPassword } from '@/lib/customers';
import { createCustomerSession, CUSTOMER_COOKIE } from '@/lib/customer-session';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email: unknown = body.email;
  const password: unknown = body.password;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ ok: false, error: 'Datos inválidos.' }, { status: 400 });
  }

  const customer = await getCustomerByEmail(email);
  if (!customer || !verifyPassword(password, customer.passwordHash)) {
    return NextResponse.json({ ok: false, error: 'Correo o contraseña incorrectos.' }, { status: 401 });
  }

  const token = await createCustomerSession(customer.email);
  const response = NextResponse.json({ ok: true, customer: toPublicCustomer(customer) });
  response.cookies.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
