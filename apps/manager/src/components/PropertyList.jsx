import React from 'react';

function PropertyList({ properties, onEditClick, onDelete }) {
  return (
    <div className="f4-property-list">
      <table className="f4-property-list__table">
        <thead>
          <tr className="f4-property-list__row f4-property-list__row--header">
            <th className="f4-property-list__cell f4-property-list__cell--header">ID</th>
            <th className="f4-property-list__cell f4-property-list__cell--header">Type</th>
            <th className="f4-property-list__cell f4-property-list__cell--header">Key</th>
            <th className="f4-property-list__cell f4-property-list__cell--header">Name</th>
            <th className="f4-property-list__cell f4-property-list__cell--header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id} className="f4-property-list__row">
              <td className="f4-property-list__cell">{prop.id}</td>
              <td className="f4-property-list__cell">{prop.type}</td>
              <td className="f4-property-list__cell">{prop.key}</td>
              <td className="f4-property-list__cell">{prop.name}</td>
              <td className="f4-property-list__cell f4-property-list__cell--actions">
                <div className="f4-property-list__actions">
                  <button
                    onClick={() => onEditClick(prop)}
                    className="f4-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(prop.id)}
                    className="f4-button f4-button--secondary"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyList;
