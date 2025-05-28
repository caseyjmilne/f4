import { useState, useEffect } from 'react';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

function ModelProperties({ modelId }) {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState([]);

  // Fetch properties filtered by modelId (you need your API to support this filter)
  useEffect(() => {
    if (!modelId) return;

    fetch(`http://test1.local/wp-json/custom/v1/property?model_id=${modelId}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          key: item.key,
          name: item.name,
          type: item.type ?? 'text', // default fallback
        }));
        setProperties(formatted);
      })
      .catch(err => {
        console.error('Failed to load properties:', err);
      });
  }, [modelId]);

  const handleAddProperty = async (property) => {
    try {
      // attach modelId to new property data
      const created = await createProperty({ ...property, model_id: modelId });
      setProperties(prev => [...prev, created]);
      setShowForm(false);
    } catch (error) {
      alert('Failed to create property: ' + error.message);
    }
  };

  async function createProperty(property) {
    const response = await fetch('http://test1.local/wp-json/custom/v1/property', {
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

  return (
    <>
      <div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide' : 'Add Property'}
        </button>
      </div>

      {showForm && <AddPropertyForm onSubmit={handleAddProperty} />}

      <PropertyList properties={properties} />
    </>
  );
}

export default ModelProperties;
