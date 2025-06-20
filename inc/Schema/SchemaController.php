<?php

namespace F4\Schema;

use F4\Model\ModelInstance;

class SchemaController
{
    public static function init(): void
    {
        // Hook into the model change action
        add_action('f4_model_change', [self::class, 'on_model_change'], 10, 2);
    }

    /**
     * Callback for model changes to generate schema.
     *
     * @param string $type
     * @param ModelInstance|null $model
     */
    public static function on_model_change(string $type, $model = null): void
    {
        if (($type === 'create' || $type === 'update') && $model instanceof ModelInstance) {
            $generator = new SchemaGenerator();
            $generator->generateForModel($model);
        }
    }
}
