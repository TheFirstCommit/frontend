export async function loadImageBinary(path: string): Promise<ArrayBuffer> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load image: ${path}`);
  return res.arrayBuffer();
}