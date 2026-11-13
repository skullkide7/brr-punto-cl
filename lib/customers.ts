import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { getRedis } from './redis';

export type CatPhoto = { url: string; uploadedAt: string };

export type Customer = {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  points: number;
  catPhotos: CatPhoto[];
};

export type PublicCustomer = Omit<Customer, 'passwordHash'>;

const CUSTOMERS_SET = 'brr:customers';

function customerKey(email: string): string {
  return `brr:customer:${email.trim().toLowerCase()}`;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, 'hex');
  const suppliedBuffer = scryptSync(password, salt, 64);
  return hashBuffer.length === suppliedBuffer.length && timingSafeEqual(hashBuffer, suppliedBuffer);
}

export function toPublicCustomer(customer: Customer): PublicCustomer {
  const { passwordHash: _passwordHash, ...rest } = customer;
  return rest;
}

export async function createCustomer(
  email: string,
  password: string,
  name: string
): Promise<Customer> {
  const redis = getRedis();
  if (!redis) throw new Error('Las cuentas de cliente no están configuradas en el servidor.');

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await redis.get<Customer>(customerKey(normalizedEmail));
  if (existing) throw new Error('Ya existe una cuenta con ese correo.');

  const customer: Customer = {
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    points: 0,
    catPhotos: [],
  };

  await redis.set(customerKey(normalizedEmail), customer);
  await redis.sadd(CUSTOMERS_SET, normalizedEmail);
  return customer;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const redis = getRedis();
  if (!redis) return null;
  const customer = await redis.get<Customer>(customerKey(email));
  return customer ?? null;
}

export async function saveCustomer(customer: Customer): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('Las cuentas de cliente no están configuradas en el servidor.');
  await redis.set(customerKey(customer.email), customer);
}

export async function addPoints(email: string, delta: number): Promise<Customer | null> {
  const customer = await getCustomerByEmail(email);
  if (!customer) return null;
  customer.points += delta;
  await saveCustomer(customer);
  return customer;
}

export async function addCatPhoto(email: string, url: string): Promise<Customer | null> {
  const customer = await getCustomerByEmail(email);
  if (!customer) return null;
  customer.catPhotos.push({ url, uploadedAt: new Date().toISOString() });
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
