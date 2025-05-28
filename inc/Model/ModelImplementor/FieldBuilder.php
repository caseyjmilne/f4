<?php 

namespace F4\Model\ModelImplementor;

class FieldBuilder {

    public function registerMetaField(string $postType, string $key, array $args): void {
        register_post_meta($postType, $key, $args);
    }

    public function addMetaBox(string $postType, string $metaBoxId, string $title, callable $callback): void {
        add_meta_box($metaBoxId, $title, $callback, $postType);
    }

}
