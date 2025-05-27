import { useState, useEffect } from 'react'
import AddPropertyForm from './AddPropertyForm'
import PropertyList from './PropertyList'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [properties, setProperties] = useState([])

  // Fetch existing properties from WP REST API (public GET)
  useEffect(() => {
    fetch('http://test1.local/wp-json/wp/v2/property')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          key: item.slug,
          name: item.title.rendered,
        }))
        setProperties(formatted)
      })
      .catch((err) => {
        console.error('Failed to load properties:', err)
      })
  }, [])

  // Create new property via custom API and update state
  const handleAddProperty = async (property) => {
    try {
      const created = await createProperty(property)
      setProperties((prev) => [...prev, created])
      setShowForm(false)
    } catch (error) {
      alert('Failed to create property: ' + error.message)
    }
  }

  // POST new property to custom/v1/property
  async function createProperty(property) {
    const response = await fetch('http://test1.local/wp-json/custom/v1/property', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create property')
    }

    return response.json()
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
  )
}

export default App
