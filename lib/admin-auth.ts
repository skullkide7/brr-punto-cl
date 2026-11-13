import { createHash } from 'crypto';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'brr_admin_session';

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash('sha256').update(password).digest('hex');
}

export function isAdminRequest(request: NextRequest): boolean {
  const token = expectedToken();
  if (!token) return false;
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  return cookie === token;
}

export function checkPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function sessionToken(): string {
  const token = expectedToken();
  if (!token) throw new Error('ADMIN_PASSWORD no está configurado en el servidor.');
  return token;
}
