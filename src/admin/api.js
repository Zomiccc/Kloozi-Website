// Admin client: API calls, draft save/publish, and media upload.
// Loaded only for the admin (never part of the public bundle).

async function call(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/admin/${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `Request failed (${res.status})`), { status: res.status });
  return data;
}

export const api = {
  session: () => call('session'),
  login: (email, password) => call('login', { method: 'POST', body: { email, password } }),
  logout: () => call('logout', { method: 'POST' }),
  getContent: () => call('content'),
  saveDraft: (content) => call('content', { method: 'PUT', body: content }),
  publish: () => call('publish', { method: 'POST', body: {} }),
  history: () => call('history'),
  restore: (id) => call('restore', { method: 'POST', body: { id } }),
  media: () => call('media'),
  deleteMedia: (url) => call('media-delete', { method: 'POST', body: { url } }),
};

export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
export const VIDEO_TYPES = ['video/mp4', 'video/webm'];
export const ACCEPT = [...IMAGE_TYPES, ...VIDEO_TYPES].join(',');
const MAX_VIDEO_MB = 150;

/* Resize big photos and convert them to WebP in the browser before upload,
   so an 8 MB phone photo becomes a ~300 KB web image. GIFs are left alone
   (to keep animation). */
async function optimiseImage(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const max = 2400;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.82));
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' });
}

const safeName = (name) => name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '').slice(-80) || 'file';

/* Upload a file; returns { url, type: 'image' | 'video' }. */
export async function uploadFile(file, storage, onProgress) {
  const isVideo = VIDEO_TYPES.includes(file.type);
  if (!isVideo && !IMAGE_TYPES.includes(file.type)) throw new Error('Please choose a JPG, PNG, WebP, AVIF or GIF image, or an MP4/WebM video.');
  if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024) throw new Error(`Videos must be under ${MAX_VIDEO_MB} MB.`);
  const ready = isVideo ? file : await optimiseImage(file);
  const name = safeName(ready.name);

  if (storage === 'blob') {
    const { upload } = await import('@vercel/blob/client');
    const result = await upload(`media/${name}`, ready, {
      access: 'public',
      handleUploadUrl: '/api/admin/upload',
      contentType: ready.type,
      multipart: ready.size > 20 * 1024 * 1024,
      onUploadProgress: onProgress ? (e) => onProgress(e.percentage) : undefined,
    });
    return { url: result.url, type: isVideo ? 'video' : 'image' };
  }

  const res = await fetch('/api/admin/upload-local', {
    method: 'POST',
    headers: { 'Content-Type': ready.type, 'X-Filename': name },
    body: ready,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Upload failed.');
  return { url: data.url, type: isVideo ? 'video' : 'image' };
}

export const isVideoUrl = (url) => /\.(mp4|webm)(\?|$)/i.test(url || '');
export const formatSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
