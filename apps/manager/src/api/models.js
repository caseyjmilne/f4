// src/api/models.js

export async function fetchModels() {
  try {
    const response = await fetch('http://test1.local/wp-json/custom/v1/model');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Failed to load models:', err);
    return []; // return empty array on error
  }
}
