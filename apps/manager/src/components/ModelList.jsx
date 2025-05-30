function ModelList({ models, selectedModelId, onSelect }) {
  return (
    <ul className="f4-models-list">
      {models.map(model => (
        <li
          key={model.id}
          className={`f4-models-list--item${model.id === selectedModelId ? ' selected' : ''}`}
          onClick={() => onSelect(model.id)}
        >
          {model.name}
        </li>
      ))}
    </ul>
  );
}

export default ModelList;
