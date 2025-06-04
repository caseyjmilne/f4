<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;
use F4\Field\FieldFactory;

class GroupField extends BaseField {

    public function render() {
        echo "<div class='f4-group-field'>";
        echo "<strong>{$this->name}</strong>";

        $value = $this->getValue() ?: [];
        $fields = $this->args['fields'] ?? [];

        foreach ($fields as $fieldDef) {
            $fieldKey = "{$this->key}_{$fieldDef['key']}";
            $fieldDef['key'] = $fieldKey;
            $field = FieldFactory::make($fieldDef, $this->post_id);

            if ($field) {
                $field->render();
            }
        }

        echo "</div>";
    }

    public function save($input) {
        $fields = $this->args['fields'] ?? [];

        foreach ($fields as $fieldDef) {
            $originalKey = $fieldDef['key'];
            $composedKey = "{$this->key}_{$originalKey}";
            $fieldDef['key'] = $composedKey;

            $field = FieldFactory::make($fieldDef, $this->post_id);

            if ($field) {
                $field->save($input[$originalKey] ?? null);
            }
        }
    }

    public static function supportsNestedFields(): bool {
        return true;
    }
}
