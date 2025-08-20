export async function normalizeImageToDataUrl(
  path: string,
  mime: 'image/jpeg' | 'image/png' = 'image/jpeg',  // JPEG 권장
  quality = 0.92
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas 2D context not available'));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL(mime, quality)); // -> "data:image/jpeg;base64,..."
    };
    img.onerror = () => reject(new Error('Failed to load image: ' + path));
    img.src = path; // public/ 경로면 CORS 문제 없음
  });
}