export function resolveIconUrl(url: string): string {
  if (!url) return "";
  const iconBase = import.meta.env.VITE_BACKEND_URL;
  return url.startsWith("http") ? url : `${iconBase}${url}`;
}