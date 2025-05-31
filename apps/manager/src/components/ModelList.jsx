function ModelList({ models, selectedModelId, onSelect }) {

  console.log(models)

  return (
    <ul className="f4-models-list">
      {models.map(model => (
        <li
          key={model.id}
          className={`f4-models-list__item${model.id === selectedModelId ? ' f4-models-list__item--selected' : ''}`}
          onClick={() => onSelect(model.id)}
        >
          {model.title}
        </li>
      ))}
    </ul>
  );
}

export default ModelList;
