import React from 'react';

function PropertyList({ properties }) {
  return (
    <div>
      <h2>Properties List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Type</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Key</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.id}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.type}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.key}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{prop.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyList;
