import { getRedis } from './redis';

export type DiscountCode = {
  code: string;
  percentage: number;
  createdAt: string;
};

const REDIS_KEY = 'brr:discounts';

export function generateRandomCode(length = 8): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin caracteres ambiguos (0/O, 1/I, etc)
  let code = '';
  for (let i = 0; i < length; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export async function listDiscountCodes(): Promise<DiscountCode[]> {
  const redis = getRedis();
  if (!redis) return [];
  const all = await redis.hgetall<Record<string, DiscountCode>>(REDIS_KEY);
  if (!all) return [];
  return Object.values(all).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createDiscountCode(
  percentage: number,
  requestedCode?: string
): Promise<DiscountCode> {
  const redis = getRedis();
  if (!redis) throw new Error('El almacenamiento de descuentos no está configurado en el servidor.');

  let code = (requestedCode ?? generateRandomCode()).trim().toUpperCase();
  if (!code) code = generateRandomCode();

  const entry: DiscountCode = { code, percentage, createdAt: new Date().toISOString() };
  await redis.hset(REDIS_KEY, { [code]: entry });
  return entry;
}

export async function deleteDiscountCode(code: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.hdel(REDIS_KEY, code.trim().toUpperCase());
}

export async function getDiscountCode(code: string): Promise<DiscountCode | null> {
  const redis = getRedis();
  if (!redis) return null;
  const entry = await redis.hget<DiscountCode>(REDIS_KEY, code.trim().toUpperCase());
  return entry ?? null;
}
