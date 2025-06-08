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

    <div id="records" class="archive__records">
        Loading...
    </div>

    <div class="archive__pagination">
        <button class="archive__pagination-btn">Prev</button>
        <span class="archive__pagination-info">Page 1 of 10</span>
        <button class="archive__pagination-btn">Next</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    fetch('/wp-json/f4/v1/collection/refresh')
        .then(response => response.json())
        .then(data => {
            document.getElementById('records').textContent = 'Response: ' + JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('records').textContent = 'Error: ' + error;
        });
});
</script>

<?php get_footer(); ?>