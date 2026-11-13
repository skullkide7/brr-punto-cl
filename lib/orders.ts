import { randomBytes } from 'crypto';
import { getRedis } from './redis';

export type OrderLine = {
  title: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customerEmail: string | null;
  lines: OrderLine[];
  subtotal: number;
  discountCode: string | null;
  discountAmount: number;
  shipping: number;
  total: number;
};

const ORDERS_KEY = 'brr:orders';

export async function recordOrder(input: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  const redis = getRedis();
  if (!redis) throw new Error('El registro de ventas no está configurado en el servidor.');

  const order: Order = {
    ...input,
    id: `${Date.now()}-${randomBytes(4).toString('hex')}`,
    createdAt: new Date().toISOString(),
  };

  await redis.zadd(ORDERS_KEY, { score: Date.now(), member: JSON.stringify(order) });

  if (order.customerEmail) {
    const { addPoints } = await import('./customers');
    const totalItems = order.lines.reduce((sum, l) => sum + l.quantity, 0);
    await addPoints(order.customerEmail, totalItems);
  }

  return order;
}

export async function listOrders(): Promise<Order[]> {
  const redis = getRedis();
  if (!redis) return [];
  const raw = await redis.zrange<string[]>(ORDERS_KEY, 0, -1, { rev: true });
  return raw.map((item) => (typeof item === 'string' ? JSON.parse(item) : item));
}

export async function listOrdersForEmail(email: string): Promise<Order[]> {
  const all = await listOrders();
  const normalized = email.trim().toLowerCase();
  return all.filter((o) => o.customerEmail === normalized);
}

export function monthKey(dateIso: string): string {
  return dateIso.slice(0, 7); // YYYY-MM
}

export async function listOrdersInMonth(email: string, yyyyMm: string): Promise<Order[]> {
  const orders = await listOrdersForEmail(email);
  return orders.filter((o) => monthKey(o.createdAt) === yyyyMm);
}
