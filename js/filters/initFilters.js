import SelectFilter from './SelectFilter.js';

// Filters (will be from API or localized JSON). 
const filters = 
[
  { id: 'category', label: 'Category', options: [{ value: 'all', label: 'All' }, { value: 'books', label: 'Books' }, { value: 'electronics', label: 'Electronics' }] },
  { id: 'price', label: 'Price Range', options: [{ value: 'all', label: 'All' }, { value: 'low', label: 'Low' }, { value: 'high', label: 'High' }] }
];


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('filter-container');
  filters.forEach(f => {
    const filter = new SelectFilter(container, f);
    filter.init();
  });
});