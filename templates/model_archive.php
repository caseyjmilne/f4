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

<script>
const archiveConfig = {
    recordsPerRow: 3,
    // Add more config options as needed
};

document.addEventListener('DOMContentLoaded', function() {
    // Set grid columns based on config
    const recordsContainer = document.getElementById('records');
    recordsContainer.style.display = 'grid';
    recordsContainer.style.gridTemplateColumns = `repeat(${archiveConfig.recordsPerRow}, 1fr)`;
    recordsContainer.style.gap = '24px';

    fetch('/wp-json/f4/v1/collection/refresh')
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
});
</script>

<?php get_footer(); ?>