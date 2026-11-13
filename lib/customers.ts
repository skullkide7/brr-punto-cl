import { getRedis } from './redis';

export type Customer = {
  email: string;
  name: string;
  createdAt: string;
  points: number;
};

const CUSTOMERS_SET = 'brr:customers';

function customerKey(email: string): string {
  return `brr:customer:${email.trim().toLowerCase()}`;
}

async function saveCustomer(customer: Customer): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('Las cuentas de cliente no están configuradas en el servidor.');
  await redis.set(customerKey(customer.email), customer);
  await redis.sadd(CUSTOMERS_SET, customer.email);
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const redis = getRedis();
  if (!redis) return null;
  const customer = await redis.get<Customer>(customerKey(email));
  return customer ?? null;
}

export async function getOrCreateCustomer(email: string, name: string): Promise<Customer> {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await getCustomerByEmail(normalizedEmail);
  if (existing) return existing;

  const customer: Customer = {
    email: normalizedEmail,
    name: name.trim() || normalizedEmail,
    createdAt: new Date().toISOString(),
    points: 0,
  };
  await saveCustomer(customer);
  return customer;
}

export async function addPoints(email: string, delta: number): Promise<Customer | null> {
  const customer = await getCustomerByEmail(email);
  if (!customer) return null;
  customer.points += delta;
  await saveCustomer(customer);
  return customer;
}

export async function listCustomers(): Promise<Customer[]> {
  const redis = getRedis();
  if (!redis) return [];
  const emails = await redis.smembers(CUSTOMERS_SET);
  if (emails.length === 0) return [];
  const customers = await Promise.all(emails.map((email) => redis.get<Customer>(customerKey(email))));
  return customers.filter((c): c is Customer => c !== null);
}
