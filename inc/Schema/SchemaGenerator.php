<?php 

class SchemaGenerator {
    protected StaticFieldSchemas $fieldSchemas;

    public function __construct(StaticFieldSchemas $fieldSchemas) {
        $this->fieldSchemas = $fieldSchemas;
    }

    public function generateForCollection(Collection $collection): Schema {
        $schema = [
            'type' => 'object',
            'properties' => [],
            'required' => [],
        ];

        foreach ($collection->getFields() as $field) {
            $fieldSchema = $this->fieldSchemas->get($field->getType());
            if (!$fieldSchema) continue;

            $schema['properties'][$field->getName()] = $fieldSchema;

            if ($field->isRequired()) {
                $schema['required'][] = $field->getName();
            }
        }

        return new Schema($schema, 'generated');
    }
}
