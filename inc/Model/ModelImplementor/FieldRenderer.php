<?php

namespace F4\Model\ModelImplementor;

use F4\Model\ModelController;
use F4\Model\ModelInstance;
use F4\Field\FieldRegistry;

class FieldRenderer {

    public function __construct() {
        add_action('add_meta_boxes', [$this, 'registerFieldsBox']);
        add_action('save_post', [$this, 'saveFields']);
    }

    public function registerFieldsBox() {

        $mc = new ModelController();
        $models = $mc->get_all_models();

        foreach ($models as $model) {
            $model_key = $model->getKey();
            if (!$model_key) continue;

            add_meta_box(
                'f4_fields_box',
                'F4 Fields',
                [$this, 'renderBox'],
                $model_key,
                'normal',
                'default',
                ['model_id' => $model->getId()]
            );
        }
    }

    public function renderBox($post, $meta) {

        $model_id = $meta['args']['model_id'];
        $model_post = get_post( $model_id );
        $model = new ModelInstance( $model_post );

        if (empty($model->getProperties())) {
            echo '<p>No F4 Fields for this Model.</p>';
            return;
        }

        wp_nonce_field('f4_fields_nonce_action', 'f4_fields_nonce');

        foreach ($model->getProperties() as $property) {

            $key   = $property->getKey();
            $name  = $property->getName();
            $type  = $property->getType();
            $value = esc_attr(get_post_meta($post->ID, $property->getKey(), true));

            $field_class = FieldRegistry::get($type);

            if ($field_class && class_exists($field_class)) {
                // Pass $post and $property to constructor as required
                $field_instance = new $field_class($key, $name, [], $post->ID);
                $field_instance->setSettings( $property->getSettings() );

                if (method_exists($field_instance, 'render')) {
                    $field_instance->render();
                }
            } else {
                // fallback render for missing class or unknown type
                echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
                echo "<input type='text' name='{$key}' id='{$key}' value='{$value}' class='widefat' /></p>";
            }
        }
    }

    public function saveFields($post_id) {
        if (!isset($_POST['f4_fields_nonce']) || !wp_verify_nonce($_POST['f4_fields_nonce'], 'f4_fields_nonce_action')) {
            return;
        }

        $post_type = get_post_type($post_id);
        $model_post = get_posts([
            'post_type' => 'model',
            'meta_key' => 'model_key',
            'meta_value' => $post_type,
            'numberposts' => 1
        ]);

        if (empty($model_post)) return;

        $model_id = $model_post[0]->ID;
        $properties = get_posts([
            'post_type' => 'property',
            'post_status' => 'publish',
            'meta_key' => 'model_id',
            'meta_value' => $model_id,
            'numberposts' => -1
        ]);

        foreach ($properties as $property) {
            $key = get_post_meta($property->ID, 'key', true);
            if (isset($_POST[$key])) {
                update_post_meta($post_id, $key, sanitize_text_field($_POST[$key]));
            }
        }
    }
}
