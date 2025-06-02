<?php

namespace F4\Model\Type;

use F4\Model\ModelTypeInterface;
use F4\Utility\DatabaseHandler;

class ModelTypeScalable implements ModelTypeInterface
{
    /**
     * Return the type identifier.
     */
    public function getType(): string
    {
        return 'scalable';
    }

    /**
     * Return a human-readable label.
     */
    public function getLabel(): string
    {
        return 'Scalable (Custom Tables)';
    }

    /**
     * Return the storage type.
     */
    public function getStorage(): string
    {
        return 'custom_table';
    }

    /**
     * Load data for the model from custom tables.
     */
    public function load($modelId): array
    {
        return DatabaseHandler::getModelData($modelId);
    }

    /**
     * Save model data to custom tables.
     */
    public function save($modelId, array $data): void
    {
        DatabaseHandler::saveModelData($modelId, $data);
    }

    /**
     * Delete model data from custom tables.
     */
    public function delete($modelId): void
    {
        DatabaseHandler::deleteModelData($modelId);
    }
}
