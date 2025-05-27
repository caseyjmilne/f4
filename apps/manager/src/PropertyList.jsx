function PropertyList({ properties }) {
  if (!properties.length) {
    return <p>No properties loaded.</p>
  }

  return (
    <div className="property-list">
      <h3>Properties</h3>
      <ul>
        {properties.map((prop, index) => (
          <li key={index}>
            <strong>{prop.key}</strong>: {prop.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PropertyList
