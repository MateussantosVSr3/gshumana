export type Risk = { level: 'Low' | 'Moderate' | 'High' | 'Extreme'; heatIndexC: number; guidance: string; calculatedAt: string };
export type SafePoint = { id: number; name: string; address: string; kind: string; isAccessible: boolean; isVerified: boolean };
const base = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5080';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${base}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return response.json() as Promise<T>;
}
export const getRisk = () => request<Risk>('/api/v1/risk/latest?neighborhood=Bela%20Vista');
export const getSafePoints = () => request<SafePoint[]>('/api/v1/safe-points?accessible=true');
export const sendReport = (body: { category: string; neighborhood: string; description: string }) => request('/api/v1/reports', { method: 'POST', body: JSON.stringify(body) });
