import FacetFilterBase from './FacetFilterBase.js';

export default class SelectFilter extends FacetFilterBase {
  constructor(container, filter) {
    super(container);
    this.id = filter.id;
    this.label = filter.label;
    this.options = filter.options;
  }

  init() {
    this.select = document.createElement('select');
    this.select.id = `${this.id}-select`;
    this.select.className = 'f4-filter-select';

    this.options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      this.select.appendChild(option);
    });

    this.container.innerHTML = '';

    if (this.label) {
      const labelElem = document.createElement('label');
      labelElem.htmlFor = this.select.id;
      labelElem.textContent = this.label;
      labelElem.className = 'f4-filter-label';
      this.container.appendChild(labelElem);
    }

    this.container.appendChild(this.select);

    this.select.addEventListener("change", (e) => {
      this.onChange(e.target.value);
    });

    this.currentValue = this.select.value;
  }

  setValue(value) {
    if (!this.select) return;
    this.select.value = value;
    this.onChange(value);
  }
}
