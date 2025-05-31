import React from 'react';

function PropertyList({ properties, onEdit, onDelete }) {
  return (
    <div className="f4-property-list">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Type</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Key</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.id}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.type}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.key}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.name}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                <button onClick={() => onEdit(prop)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => onDelete(prop.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyList;
