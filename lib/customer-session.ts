import { randomBytes } from 'crypto';
import { NextRequest } from 'next/server';
import { getRedis } from './redis';

export const CUSTOMER_COOKIE = 'brr_customer_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 días

function sessionKey(token: string): string {
  return `brr:session:${token}`;
}

export async function createCustomerSession(email: string): Promise<string> {
  const redis = getRedis();
  if (!redis) throw new Error('Las cuentas de cliente no están configuradas en el servidor.');
  const token = randomBytes(32).toString('hex');
  await redis.set(sessionKey(token), email.trim().toLowerCase(), { ex: SESSION_TTL_SECONDS });
  return token;
}

export async function destroyCustomerSession(token: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(sessionKey(token));
}

export async function getSessionEmail(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  const redis = getRedis();
  if (!redis) return null;
  const email = await redis.get<string>(sessionKey(token));
  return email ?? null;
}
