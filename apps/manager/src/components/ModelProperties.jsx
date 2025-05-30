import { useState, useEffect } from 'react';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

function ModelProperties({ modelId }) {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!modelId) return;

    fetch(`http://test1.local/wp-json/custom/v1/property?model_id=${modelId}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          key: item.key,
          name: item.name,
          type: item.type ?? 'text',
        }));
        setProperties(formatted);
      })
      .catch(err => {
        console.error('Failed to load properties:', err);
      });
  }, [modelId]);

  const handleAddProperty = async (property) => {
    try {
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const response = await fetch(`http://test1.local/wp-json/custom/v1/property/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete property');
      }

      setProperties(prev => prev.filter(prop => prop.id !== id));
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  const handleEdit = async (updatedProp) => {

    try {
      const response = await fetch(`http://test1.local/wp-json/custom/v1/property/${updatedProp.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProp),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update property');
      }

      const updated = await response.json();
      setProperties(prev =>
        prev.map(prop => (prop.id === updated.id ? updated : prop))
      );
    } catch (error) {
      alert('Update failed: ' + error.message);
    }

  };

  return (
    <>

      {showForm && <AddPropertyForm onSubmit={handleAddProperty} />}

      <PropertyList
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
    </>
  );
}

export default ModelProperties;
