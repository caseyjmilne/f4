<?php

namespace F4\Model\Type;

use F4\Model\ModelTypeInterface;

class ModelTypePost implements ModelTypeInterface
{
    /**
     * Return the type identifier.
     */
    public function getType(): string
    {
        return 'post_type';
    }

    /**
     * Return a human-readable label.
     */
    public function getLabel(): string
    {
        return 'Post Type';
    }

    /**
     * Get storage mechanism (post meta).
     */
    public function getStorage(): string
    {
        return 'post_meta';
    }

    /**
     * Load data for the model (from post meta).
     */
    public function load($postId): array
    {
        $fields = get_post_meta($postId);
        return is_array($fields) ? $fields : [];
    }

    /**
     * Save data for the model (to post meta).
     */
    public function save($postId, array $data): void
    {
        foreach ($data as $key => $value) {
            update_post_meta($postId, $key, $value);
        }
    }

    /**
     * Optional: Delete data for the model.
     */
    public function delete($postId): void
    {
        $meta = get_post_meta($postId);
        foreach ($meta as $key => $_) {
            delete_post_meta($postId, $key);
        }
    }
}
