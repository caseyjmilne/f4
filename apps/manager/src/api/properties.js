const API_BASE = 'http://test1.local/wp-json/f4/v1/property';

export async function fetchProperties(modelId) {
  const response = await fetch(`${API_BASE}?model_id=${modelId}`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  const data = await response.json();

  return data.map(item => ({
    id: item.id,
    key: item.key,
    name: item.name,
    type: item.type ?? 'text',
  }));
}

export async function createProperty(property) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create property');
  }

  return response.json();
}

export async function deleteProperty(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete property');
  }

  return true;
}

export async function updateProperty(updatedProp) {
  const response = await fetch(`${API_BASE}/${updatedProp.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProp),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update property');
  }

  return response.json();
}
