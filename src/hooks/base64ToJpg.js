export const base64ToJpg = async (url, filename, mimeType) => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
};
