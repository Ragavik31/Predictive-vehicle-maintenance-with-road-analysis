import type { DemoInput, Prediction } from '../types';

const predictionUrl = 'http://localhost:8000/api/predict';

export async function predictWithModel(input: DemoInput, signal?: AbortSignal): Promise<Prediction> {
  const response = await fetch(predictionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    signal,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string } | null;
    throw new Error(body?.detail ?? 'The prediction service is unavailable.');
  }

  return response.json() as Promise<Prediction>;
}
