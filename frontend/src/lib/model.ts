import type { DemoInput, Prediction } from '../types';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fleetguard_api_url');
    if (saved) return saved.replace(/\/+$/, '');
  }
  if (import.meta.env.VITE_API_URL) {
    return (import.meta.env.VITE_API_URL as string).replace(/\/+$/, '');
  }
  return 'http://localhost:8000/api';
}

export async function predictWithModel(input: DemoInput, signal?: AbortSignal): Promise<Prediction> {
  const baseUrl = getApiBaseUrl();
  const primaryUrl = `${baseUrl}/predict`;
  const fallbackUrl = 'http://127.0.0.1:8000/api/predict';

  const sendRequest = async (url: string) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal,
    });
  };

  let response: Response;
  try {
    response = await sendRequest(primaryUrl);
  } catch (err) {
    if (primaryUrl !== fallbackUrl) {
      try {
        response = await sendRequest(fallbackUrl);
      } catch {
        throw err;
      }
    } else {
      throw err;
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: any } | null;
    let detailMsg = 'The prediction service encountered an error.';
    if (body?.detail) {
      if (typeof body.detail === 'string') {
        detailMsg = body.detail;
      } else if (Array.isArray(body.detail)) {
        detailMsg = body.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
      }
    }
    throw new Error(detailMsg);
  }

  return response.json() as Promise<Prediction>;
}
