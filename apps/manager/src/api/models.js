import { smartFetch } from '../utils/apiClient.js';

export async function fetchModels() {
  try {
    return await smartFetch('model');
  } catch (err) {
    console.error('Failed to load models:', err);
    return [];
  }
}

export async function deleteModel(id) {
  await smartFetch(`model/${id}`, {
    method: 'DELETE',
  });
  return true;
}

export async function updateModel(model) {
  return await smartFetch(`model/${model.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  });
}

export async function createModel(model) {
  return await smartFetch('model', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  });
}

