export default function ErrorList({ errors = [] }) {
  if (!errors.length) return null;

  return (
    <div className="f4-form__errors" style={{ color: 'red', marginBottom: '1rem' }}>
      <ul className="f4-form__errors-list">
        {errors.map((error, index) => (
          <li key={index} className="f4-form__error-item">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
