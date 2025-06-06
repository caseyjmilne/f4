<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class PostRelationshipField extends BaseField {

    /**
     * Render the field.
     */
    public function render() {
        $values     = (array) $this->getValue();
        $key        = esc_attr($this->key);
        $name       = esc_html($this->name);
        $post_types = isset($this->args['post_types']) ? (array) $this->args['post_types'] : ['post'];
        $multiple   = true;

        // Get available posts for selection
        $query_args = [
            'post_type'      => $post_types,
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
        ];
        $posts = get_posts($query_args);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select id='{$key}' name='{$key}[]' multiple size='5' class='widefat f4-postrelationship__select'>";

        foreach ($posts as $post) {
            $selected = in_array($post->ID, $values) ? 'selected' : '';
            $title    = esc_html($post->post_title ?: "(no title)");
            echo "<option value='{$post->ID}' {$selected}>{$title} ({$post->post_type})</option>";
        }

        echo "</select></p>";
    }

    /**
     * Save selected post IDs as an array.
     */
    public function save($value) {
        $ids = array_map('intval', (array) $value);
        update_post_meta($this->post_id, $this->key, $ids);
    }

    /**
     * Get saved post ID array.
     */
    public function getValue() {
        $value = get_post_meta($this->post_id, $this->key, true);
        return is_array($value) ? $value : [];
    }

    /**
     * Support post_types setting.
     */
    public static function supportsSettingPostTypes(): bool {
        return true;
    }
}
