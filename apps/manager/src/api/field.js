import { smartFetch } from '../utils/apiClient.js';

export async function fetchFieldTypes() {
  const data = await smartFetch('field' + 's');
  return data.map(item => ({
    label: item.label,
    value: item.type,
  }));
}

export async function fetchFieldTypeDetails(type) {
  return await smartFetch(`field/${type}`);
}
