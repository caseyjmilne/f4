<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class TaxonomyField extends BaseField {

    /**
     * Render the taxonomy field.
     */
    public function render() {
        $values    = (array) $this->getValue();
        $key       = esc_attr($this->key);
        $name      = esc_html($this->name);
        $taxonomies = isset($this->args['taxonomies']) ? (array) $this->args['taxonomies'] : ['category'];

        // Fetch terms for the selected taxonomies
        $terms = [];
        foreach ($taxonomies as $taxonomy) {
            $taxonomy_terms = get_terms([
                'taxonomy'   => $taxonomy,
                'hide_empty' => false,
            ]);
            if (!is_wp_error($taxonomy_terms)) {
                $terms = array_merge($terms, $taxonomy_terms);
            }
        }

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select id='{$key}' name='{$key}[]' multiple size='5' class='widefat f4-taxonomyfield__select'>";

        foreach ($terms as $term) {
            $selected = in_array($term->term_id, $values) ? 'selected' : '';
            $term_name = esc_html($term->name);
            $taxonomy_name = esc_html($term->taxonomy);
            echo "<option value='{$term->term_id}' {$selected}>{$term_name} ({$taxonomy_name})</option>";
        }

        echo "</select></p>";
    }

    /**
     * Save selected term IDs as an array.
     */
    public function save($value) {
        $term_ids = array_map('intval', (array) $value);
        update_post_meta($this->post_id, $this->key, $term_ids);
    }

    /**
     * Get saved term IDs array.
     */
    public function getValue() {
        $value = get_post_meta($this->post_id, $this->key, true);
        return is_array($value) ? $value : [];
    }

}
