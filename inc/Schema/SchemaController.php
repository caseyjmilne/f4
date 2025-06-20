<?php 

class SchemaController {
    protected SchemaGenerator $generator;
    protected SchemaValidator $validator;

    public function __construct(SchemaGenerator $generator, SchemaValidator $validator) {
        $this->generator = $generator;
        $this->validator = $validator;
    }

    public function getSchemaForCollection($collectionId): ?Schema {
        $collection = Collection::find($collectionId);
        if (!$collection) return null;

        $schema = $this->generator->generateForCollection($collection);

        if (!$this->validator->validate($schema->get())) {
            // log or store error
        }

        return $schema;
    }
}
