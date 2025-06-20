<?php 

use JsonSchema\Validator;

class SchemaValidator {
    public function validate(array $schema, array $example = []): bool {
        $validator = new Validator();
        $validator->validate($example, $schema);

        return $validator->isValid();
    }

    public function getErrors(): array {
        return $this->validator->getErrors();
    }
}
