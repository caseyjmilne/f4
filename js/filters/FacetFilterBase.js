// /assets/js/filters/FacetFilterBase.js

export default class FacetFilterBase {
  
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('FacetFilterBase: a valid DOM container is required');
    }

    this.container = container;
    this.id = null; // id is now set via setId()
    this.currentValue = null;
    this.eventTarget = window;
    this.disabled = false;
  }

  setId(id) {
    this.id = id;
  }

  init() {
    throw new Error("init() must be implemented by subclass");
  }

  onChange(value) {
    if (this.disabled) return;
    this.currentValue = value;
    this.dispatch();
  }

  getValue() {
    return this.currentValue;
  }

  setValue(value) {
    this.currentValue = value;
  }

  dispatch() {
    const event = new CustomEvent("facetFilterChange", {
      detail: {
        id: this.id,
        value: this.currentValue,
      },
    });
    this.eventTarget.dispatchEvent(event);
    console.log('event dispatched:', event);
  }

  disable() {
    this.disabled = true;
    this._setContainerDisabled(true);
  }

  enable() {
    this.disabled = false;
    this._setContainerDisabled(false);
  }

  _setContainerDisabled(state) {
    const inputs = this.container.querySelectorAll('input, select, button, textarea');
    inputs.forEach(el => el.disabled = state);
  }
}
