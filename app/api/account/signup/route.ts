import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, toPublicCustomer } from '@/lib/customers';
import { createCustomerSession, CUSTOMER_COOKIE } from '@/lib/customer-session';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email: unknown = body.email;
  const password: unknown = body.password;
  const name: unknown = body.name;

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Ingresa un correo válido.' }, { status: 400 });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return NextResponse.json(
      { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' },
      { status: 400 }
    );
  }
  if (typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ ok: false, error: 'Ingresa tu nombre.' }, { status: 400 });
  }

  try {
    const customer = await createCustomer(email, password, name);
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
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'No se pudo crear la cuenta.' },
      { status: 400 }
    );
  }
}
