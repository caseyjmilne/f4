import { Outlet } from 'react-router-dom';
import SchemaMenu from './SchemaMenu';

export default function SchemaLayout() {
  return (
    <div className="flex min-h-screen">
      <SchemaMenu />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
