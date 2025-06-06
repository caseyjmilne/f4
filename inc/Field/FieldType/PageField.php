<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class PageField extends BaseField {

    /**
     * Render a select dropdown of pages/posts, saving the permalink.
     */
    public function render() {
        $value       = esc_url($this->getValue());
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $post_types  = $this->args['post_type'] ?? ['page']; // Default to pages
        $placeholder = $this->args['placeholder'] ?? '-- Select a page --';

        $post_types = is_array($post_types) ? $post_types : [$post_types];

        $posts = get_posts([
            'post_type'      => $post_types,
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
        ]);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select name='{$key}' id='{$key}' class='widefat'>";
        echo "<option value=''>" . esc_html($placeholder) . "</option>";

        foreach ($posts as $post) {
            $url      = esc_url(get_permalink($post));
            $selected = selected($value, $url, false);
            echo "<option value='{$url}' {$selected}>" . esc_html($post->post_title) . "</option>";
        }

        echo "</select></p>";
    }

    /**
     * Save the permalink (URL).
     */
    public function save($value) {
        update_post_meta($this->post_id, $this->key, esc_url_raw($value));
    }

    public static function supportsSettingPlaceholder(): bool {
        return true;
    }
}
