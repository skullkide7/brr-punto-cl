import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, checkPassword, sessionToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const password: unknown = body.password;

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Contraseña incorrecta.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
