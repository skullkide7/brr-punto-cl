import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/customer-session';
import { addCatPhoto, toPublicCustomer } from '@/lib/customers';
import { uploadCatPhoto } from '@/lib/photos';

export async function POST(request: NextRequest) {
  const email = await getSessionEmail(request);
  if (!email) {
    return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('photo');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Adjunta una imagen.' }, { status: 400 });
  }

  try {
    const url = await uploadCatPhoto(email, file);
    const customer = await addCatPhoto(email, url);
    if (!customer) {
      return NextResponse.json({ ok: false, error: 'Cuenta no encontrada.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, customer: toPublicCustomer(customer) });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'No se pudo subir la foto.' },
      { status: 400 }
    );
  }
}
