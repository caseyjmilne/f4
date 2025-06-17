import './app-header.css';
import { Link } from 'react-router-dom';

export default function AppHeader({ setShowForm, setSelectedModelId }) {
  return (
    <header className="model-section-header">
      <h2 className="f4-logo-text">F4</h2>

      <nav>
        <ul className="f4-nav-list">
          <li>
            <Link to="/" className="f4-nav-link">Dashboard</Link>
          </li>
          {/* Add more links here later if needed */}
        </ul>
      </nav>

      <button
        className="f4-button"
        onClick={() => {
          setShowForm(true);
          setSelectedModelId(0);
        }}
      >
        + Model
      </button>
    </header>
  );
}
