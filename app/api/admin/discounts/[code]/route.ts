import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { deleteDiscountCode } from '@/lib/discounts';

export async function DELETE(_request: Request, { params }: { params: { code: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 });
  }
  await deleteDiscountCode(params.code);
  return NextResponse.json({ ok: true });
}
