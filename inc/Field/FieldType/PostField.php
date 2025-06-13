<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class PostField extends BaseField {

    public static function getSupportedSettings(): array {
        return [
            'default', 
            'required', 
            'instructions', 
            'append', 
            'placeholder', 
            'prepend', 
            'maxLength',
            'conditions'
        ];
    }

    /**
     * Render a dropdown for selecting a post.
     */
    public function render() {
        $value       = $this->getValue();
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $post_type   = $this->args['post_type'] ?? 'post';
        $placeholder = $this->args['placeholder'] ?? '-- Select a post --';

        // Get posts of the given type
        $posts = get_posts([
            'post_type'      => $post_type,
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
        ]);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select name='{$key}' id='{$key}' class='widefat'>";

        echo "<option value=''>" . esc_html($placeholder) . "</option>";

        foreach ($posts as $post) {
            $selected = selected($value, $post->ID, false);
            echo "<option value='{$post->ID}' {$selected}>" . esc_html($post->post_title) . "</option>";
        }

        echo "</select></p>";
    }

    /**
     * Sanitize and save selected post ID.
     */
    public function save($value) {
        update_post_meta($this->post_id, $this->key, intval($value));
    }

}
