import { useEffect, useState } from 'react';
import { JsonViewer } from '@textea/json-viewer';

export default function TextFieldSchemaRoute() {
  const [schema, setSchema] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://test1.local/wp-json/f4/v1/schema/text_field')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setSchema)
      .catch(setError);
  }, []);

  return (
    <div className="p-4 text-sm overflow-auto max-h-[80vh]">
      {error && <div className="text-red-600">Error: {error.message}</div>}
      {!schema && !error && <div>Loading schema...</div>}
      {schema && (
        <JsonViewer
          value={schema}
          displayDataTypes={true}
          rootName={false}
          theme="dark"
          style={{ fontSize: '13px' }}
        />
      )}
    </div>
  );
}
