<?php 

class Schema {
    protected array $schema;
    protected string $source;

    public function __construct(array $schema, string $source = 'unknown') {
        $this->schema = $schema;
        $this->source = $source;
    }

    public function get(): array {
        return $this->schema;
    }

    public function toJson(): string {
        return wp_json_encode($this->schema, JSON_PRETTY_PRINT);
    }
}
