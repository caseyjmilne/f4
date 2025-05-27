function AddPropertyForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const key = e.target.elements.key.value.trim()
    const name = e.target.elements.name.value.trim()
    if (!key || !name) return

    onSubmit({ key, name })
    e.target.reset()
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div>
        <label>Key:</label>
        <input name="key" type="text" required />
      </div>
      <div>
        <label>Name:</label>
        <input name="name" type="text" required />
      </div>
      <button type="submit">Save Property</button>
    </form>
  )
}

export default AddPropertyForm
