import { isStandaloneDevMode } from './env.js';

const SECRET_KEY = 'butter';
const API_BASE = 'http://test1.local/wp-json/f4/v1';

export async function smartFetch(path, options = {}) {
  const url = new URL(`${API_BASE}/${path}`);

  if (isStandaloneDevMode()) {
    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${SECRET_KEY}`,
    };
  }

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}): ${errorText}`);
    throw new Error(`Fetch failed (${response.status})`);
  }
  return response.json();
}