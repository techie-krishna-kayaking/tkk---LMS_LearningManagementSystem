import { API_BASE_URL } from './constants';

function getAuthHeaders() {
  const token = localStorage.getItem('tkk_lms_access_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function apiGet<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        ...getAuthHeaders(),
      },
    });
  } catch {
    throw new Error(`Cannot reach API at ${API_BASE_URL}`);
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, payload: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(`Cannot reach API at ${API_BASE_URL}`);
  }

  if (!res.ok) {
    const maybeJson = await res.json().catch(() => null);
    const msg = maybeJson?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return (await res.json()) as T;
}
