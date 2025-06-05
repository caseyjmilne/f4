const FIELD_API_BASE = 'http://test1.local/wp-json/f4/v1/field';

export async function fetchFieldTypes() {
  const response = await fetch(`${FIELD_API_BASE}s`);
  if (!response.ok) {
    throw new Error('Failed to fetch field types');
  }

  const data = await response.json();

  return data.map(item => ({
    label: item.label,
    value: item.type,
  }));
}

export async function fetchFieldTypeDetails(type) {
  const response = await fetch(`${FIELD_API_BASE}/${type}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch field type details');
  }

  return await response.json();
}
