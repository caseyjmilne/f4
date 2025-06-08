import SelectFilter from './SelectFilter.js';

// Single filter: Numbers 5-15
const filters = [
  {
    id: 'field1_min',
    label: 'Minimum Value',
    options: Array.from({ length: 11 }, (_, i) => {
      const value = i + 5;
      return { value, label: value.toString() };
    }),
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('filter-container');
  filters.forEach(f => {
    const filter = new SelectFilter(container, f);
    filter.init();
  });
});