import { Link, useLocation } from 'react-router-dom';

const schemaLinks = [
  { path: '/schema/model-instance', label: 'Model Instance Schema' },
  { path: '/schema/text-field', label: 'Text Field Schema' },
  // add more as needed
];

export default function SchemaMenu() {
  const location = useLocation();

  return (
    <nav className="p-4 border-r border-gray-300 w-64 bg-white">
      <h2 className="text-lg font-semibold mb-3">Schemas</h2>
      <ul className="space-y-2">
        {schemaLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`block px-3 py-2 rounded ${
                location.pathname === path
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-100'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
