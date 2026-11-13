import { getRedis } from './redis';
import { listCustomers, type PublicCustomer, toPublicCustomer } from './customers';
import { listOrders, monthKey } from './orders';

export type RaffleEntrant = {
  customer: PublicCustomer;
  orderCount: number;
  photoCount: number;
};

export type RaffleWinner = {
  email: string;
  markedAt: string;
};

const WINNERS_KEY = 'brr:raffle:winners';

export async function getRaffleEntrants(yyyyMm: string): Promise<RaffleEntrant[]> {
  const [customers, orders] = await Promise.all([listCustomers(), listOrders()]);

  const ordersByEmail = new Map<string, number>();
  for (const order of orders) {
    if (!order.customerEmail || monthKey(order.createdAt) !== yyyyMm) continue;
    ordersByEmail.set(order.customerEmail, (ordersByEmail.get(order.customerEmail) ?? 0) + 1);
  }

  const entrants: RaffleEntrant[] = [];
  for (const customer of customers) {
    const orderCount = ordersByEmail.get(customer.email) ?? 0;
    const photoCount = customer.catPhotos.filter((p) => monthKey(p.uploadedAt) === yyyyMm).length;
    if (orderCount > 0 && photoCount > 0) {
      entrants.push({ customer: toPublicCustomer(customer), orderCount, photoCount });
    }
  }

  return entrants;
}

export async function getRaffleWinner(yyyyMm: string): Promise<RaffleWinner | null> {
  const redis = getRedis();
  if (!redis) return null;
  const winner = await redis.hget<RaffleWinner>(WINNERS_KEY, yyyyMm);
  return winner ?? null;
}

export async function setRaffleWinner(yyyyMm: string, email: string): Promise<RaffleWinner> {
  const redis = getRedis();
  if (!redis) throw new Error('El sorteo no está configurado en el servidor.');
  const winner: RaffleWinner = { email: email.trim().toLowerCase(), markedAt: new Date().toISOString() };
  await redis.hset(WINNERS_KEY, { [yyyyMm]: winner });
  return winner;
}

export async function listRaffleWinners(): Promise<Record<string, RaffleWinner>> {
  const redis = getRedis();
  if (!redis) return {};
  const all = await redis.hgetall<Record<string, RaffleWinner>>(WINNERS_KEY);
  return all ?? {};
}
