export type PackageDimensions = {
  length: number;
  width: number;
  height: number;
};

export function estimatePackageDimensions(totalWeightKg: number): PackageDimensions {
  if (totalWeightKg <= 6) return { length: 30, width: 25, height: 20 };
  if (totalWeightKg <= 12) return { length: 40, width: 30, height: 25 };
  if (totalWeightKg <= 18) return { length: 45, width: 35, height: 30 };
  if (totalWeightKg <= 36) return { length: 55, width: 40, height: 35 };
  return { length: 60, width: 45, height: 40 };
}

export type ShippingRate = {
  courierName: string;
  serviceName: string;
  price: number;
  days: number;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  complement: string;
  postalCode: string;
  communeId: number;
  communeName: string;
  phone: string;
  email: string;
};

export type ShippingQuoteResult =
  | { ok: true; rates: ShippingRate[] }
  | { ok: false; error: string };

export async function fetchShippingRates(
  toCommuneId: number,
  totalWeightKg: number
): Promise<ShippingQuoteResult> {
  const email = process.env.SHIPIT_EMAIL;
  const token = process.env.SHIPIT_ACCESS_TOKEN;

  if (!email || !token) {
    return { ok: false, error: 'Shipit no está configurado en el servidor.' };
  }

  const { length, width, height } = estimatePackageDimensions(totalWeightKg);

  const response = await fetch('https://api.shipit.cl/v/prices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.shipit.v3',
      'X-Shipit-Email': email,
      'X-Shipit-Access-Token': token,
    },
    body: JSON.stringify({
      package: {
        length,
        width,
        height,
        weight: totalWeightKg,
        destiny: 'Domicilio',
        to_commune_id: String(toCommuneId),
      },
    }),
  });

  const data = await response.json();

  if (!response.ok || data.state === 'error') {
    return { ok: false, error: data.message ?? 'No se pudo cotizar el envío para esa comuna.' };
  }

  const rates: ShippingRate[] = (data.prices ?? [])
    .filter((p: { available_to_shipping: boolean }) => p.available_to_shipping)
    .map((p: { courier: { display_name: string }; name: string; price: number; days: number }) => ({
      courierName: p.courier.display_name,
      serviceName: p.name,
      price: p.price,
      days: p.days,
    }))
    .sort((a: ShippingRate, b: ShippingRate) => a.price - b.price);

  return { ok: true, rates };
}
