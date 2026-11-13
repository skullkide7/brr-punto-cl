import { put } from '@vercel/blob';

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function uploadCatPhoto(email: string, file: File): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('El almacenamiento de fotos no está configurado en el servidor.');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Formato de imagen no soportado. Usa JPG, PNG, WEBP o GIF.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('La imagen es muy pesada (máximo 8 MB).');
  }

  const safeEmail = email.trim().toLowerCase().replace(/[^a-z0-9@._-]/g, '');
  const extension = file.type.split('/')[1] ?? 'jpg';
  const path = `cat-photos/${safeEmail}/${Date.now()}.${extension}`;

  const blob = await put(path, file, { access: 'public' });
  return blob.url;
}
