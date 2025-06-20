<?php

namespace F4\Schema;

use WP_Error;
use F4\Model\ModelInstance;

class SchemaGenerator
{
    protected string $schema_dir;

    public function __construct($fieldSchemas = null)
    {
        $this->schema_dir = WP_CONTENT_DIR . '/f4-schema';
        // ...other initialization...
    }

    public function schema_directory_exists(): bool
    {
        return is_dir($this->schema_dir);
    }

    public function install_schema_directory(): bool|WP_Error
    {
        if ($this->schema_directory_exists()) {
            return true;
        }
        if (!wp_mkdir_p($this->schema_dir)) {
            return new WP_Error('schema_dir_creation_failed', 'Failed to create the f4-schema directory under wp-content.');
        }
        return true;
    }

    /**
     * Generate a minimal viable schema for a model and save it as model_$key.json
     *
     * @param ModelInstance $model
     * @return bool|WP_Error
     */
    public function generateForModel(ModelInstance $model): bool|WP_Error
    {
        $schema = [
            '$schema' => 'http://json-schema.org/draft-07/schema#',
            'title' => $model->getTitle(),
            'description' => 'Schema for the ' . $model->getTitle() . ' model',
            'type' => 'object',
            'properties' => [
                'id' => [
                    'type' => 'integer',
                    'description' => 'Unique database ID',
                ],
                'fields' => [
                    'type' => 'array',
                    'description' => 'Fields for this model',
                    'items' => [
                        'type' => 'object',
                    ],
                ],
            ],
            'required' => ['id', 'fields'],
            'additionalProperties' => false,
        ];

        $filename = $this->schema_dir . '/model_' . $model->getKey() . '.json';

        $result = file_put_contents(
            $filename,
            json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        if ($result === false) {
            return new WP_Error('schema_write_failed', 'Failed to write schema file: ' . $filename);
        }

        return true;
    }
}
