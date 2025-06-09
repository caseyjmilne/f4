<?php get_header(); ?>

<div class="archive">
    <div class="archive__filters">
        <div id="filter-container"></div>
    </div>

    <div class="archive__sort">
        <label class="archive__sort-label">
            Sort by:
            <select class="archive__sort-select">
                <option value="date_desc">Date (Newest)</option>
                <option value="date_asc">Date (Oldest)</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
            </select>
        </label>
    </div>

    <div id="records" class="archive__records" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        Loading...
    </div>

    <template id="record-template">
        <div class="archive__record">
            <img class="archive__record-image" src="{image}" alt="{title}">
            <div class="archive__record-content">
                <h3 class="archive__record-title">{title}</h3>
                <p class="archive__record-summary">{summary}</p>
                <p class="archive__record-author">By {author}</p>
            </div>
        </div>
    </template>

    <div class="archive__pagination">
        <button class="archive__pagination-btn">Prev</button>
        <span class="archive__pagination-info">Page 1 of 10</span>
        <button class="archive__pagination-btn">Next</button>
    </div>
</div>

<script type="module">
import SelectFilter from '/wp-content/plugins/f4/js/filters/SelectFilter.js';

const archiveConfig = {
    recordsPerRow: 3,
    // Add more config options as needed
};

let filters = {}; // { [filterId]: value }

function getActiveFiltersPayload() {
  return filterDefinitions
    .map(def => ({
      id: def.id,
      type: def.type,
      metaKey: def.metaKey,
      metaType: def.metaType,
      compare: def.compare, // Include compare
      value: filters[def.id] ?? '',
    }))
    .filter(f => f.value !== '');
}

function fetchAndRenderRecords() {
  const recordsContainer = document.getElementById('records');
  recordsContainer.style.display = 'grid';
  recordsContainer.style.gridTemplateColumns = `repeat(${archiveConfig.recordsPerRow}, 1fr)`;
  recordsContainer.style.gap = '24px';

  // Send all filters as a JSON string in a single param
  const filterPayload = encodeURIComponent(JSON.stringify(getActiveFiltersPayload()));
  const url = '/wp-json/f4/v1/collection/refresh' + (filterPayload ? `?filters=${filterPayload}` : '');

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const template = document.getElementById('record-template').innerHTML;
      recordsContainer.innerHTML = '';
      data.forEach(record => {
        let html = template
          .replace(/{image}/g, record.image)
          .replace(/{title}/g, record.title)
          .replace(/{summary}/g, record.summary)
          .replace(/{author}/g, record.author);
        recordsContainer.insertAdjacentHTML('beforeend', html);
      });
    })
    .catch(error => {
      recordsContainer.textContent = 'Error: ' + error;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAndRenderRecords();

  window.addEventListener('facet-filter-change', function(e) {
    filters[e.detail.id] = e.detail.value;
    fetchAndRenderRecords();
  });
});

// Single filter: Numbers 5-15
const filterDefinitions = [
  {
    id: 'field1_min',
    label: 'Minimum Value',
    metaKey: 'field1',
    type: 'select',
    metaType: 'NUMERIC',
    compare: '>=', // Explicitly set compare
    options: Array.from({ length: 11 }, (_, i) => {
      const value = i + 5;
      return { value, label: value.toString() };
    }),
  },
  {
    id: 'field2-filter',
    label: 'Field 2',
    metaKey: 'field2',
    type: 'select',
    metaType: 'CHAR',
    compare: '=', // Explicitly set compare
    options: [
      { value: '', label: 'Any' }, // <-- Add this line
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
    ],
  },
];

const container = document.getElementById('filter-container');
filterDefinitions.forEach(f => {
  const filter = new SelectFilter(container, f);
  filter.init();
});
</script>

<?php get_footer(); ?>