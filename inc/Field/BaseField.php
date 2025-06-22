<?php 

namespace F4\Field;

abstract class BaseField {

    protected $id = 0;
    protected $key;
    protected $name;
    protected $type;
    protected $args;
    protected $post_id;
    protected $settings = [];

    public function __construct($key, $name, $args = [], $post_id = null) {

        $this->type = $this->getType();

        $this->key     = $key;
        $this->name    = $name;
        $this->args    = $args;
        $this->post_id = $post_id;

        // Normalize settings on construction
        $this->settings = FieldSettings::sanitize($args['settings'] ?? [], static::class);
    }

    public static function getType(): string {
        $parts = explode('\\', static::class);
        $class = end($parts);
        return strtolower(str_replace('Field', '', $class));
    }

    public static function getLabel(): string {
        $type = static::getType();
        return ucwords(str_replace('_', ' ', $type));
    }

    abstract public function render();

    public function save($value) {
        update_post_meta($this->post_id, $this->key, sanitize_text_field($value));
    }

    public function getValue() {
        return get_post_meta($this->post_id, $this->key, true);
    }

    public static function getFieldScripts(): array {
        return [];
    }

    public static function getFieldStyles(): array {
        return [];
    }

    public static function enqueueFieldAssets() {
        foreach (static::getFieldStyles() as $style) {
            wp_enqueue_style($style);
        }
        foreach (static::getFieldScripts() as $script) {
            wp_enqueue_script($script);
        }
    }

    // NEW: Central method fields override to define settings
    public static function getSupportedSettings(): array {
        return [];
    }

    
    public function getSettings() {
        return $this->settings;
    }

    public function setSettings( $settings ) {
        $this->settings = $settings;
    }

    public function getSetting(string $key, $default = null) {
        return $this->settings[$key] ?? $default;
    }

    public static function supportsNestedFields(): bool {
        return false;
    }

    public function exportArray() {
        return get_object_vars($this);
    }

    public function exportJSON() {
        return json_encode( $this->exportArray() );
    }

    public function databaseSave() {
        
    }

}
