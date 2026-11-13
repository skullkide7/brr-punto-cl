import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { deleteDiscountCode } from '@/lib/discounts';

export async function DELETE(request: NextRequest, { params }: { params: { code: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  await deleteDiscountCode(params.code);
  return NextResponse.json({ ok: true });
}
