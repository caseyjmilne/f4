<?php

namespace F4\Model;

class ModelHook
{
    /**
     * Call this method whenever a model changes.
     *
     * @param string $type The type of change (e.g., 'create', 'update', 'delete').
     * @param mixed $model Optional: The model data or ID.
     */
    public static function ModelChangeAction(string $type, $model = null): void
    {
        /**
         * Fires when a model changes.
         *
         * @param string $type  The type of change.
         * @param mixed  $model The model data or ID.
         */
        do_action('f4_model_change', $type, $model);
    }
}