import { smartFetch } from '../utils/apiClient.js';

export async function fetchProperties(modelId) {
  const data = await smartFetch(`property?model_id=${modelId}`);
  return data.map(item => ({
    id: item.id,
    model_id: item.model_id,
    parent_id: item.parent_id,
    key: item.key,
    name: item.name,
    type: item.type ?? 'text',
    settings: item.settings,
  }));
}

export async function createProperty(property) {
  return await smartFetch('property', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  });
}

export async function deleteProperty(id) {
  await smartFetch(`property/${id}`, {
    method: 'DELETE',
  });
  return true;
}

export async function updateProperty(updatedProp) {
  return await smartFetch(`property/${updatedProp.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProp),
  });
}

export async function updatePropertyOrder(properties) {
  return await smartFetch('property/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(properties),
  });
}
