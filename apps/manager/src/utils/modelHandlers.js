export async function submitNewModel(form, onModelAdded) {
  const response = await fetch('http://test1.local/wp-json/f4/v1/model', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: form.title,
      model_type: form.type,
      model_key: form.key,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create model');
  }

  onModelAdded();
}
