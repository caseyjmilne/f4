<?php

namespace F4\Field;

abstract class BaseField {

    protected $key;
    protected $name;
    protected $args;
    protected $post_id;

    public function __construct($key, $name, $args = [], $post_id = null) {
        $this->key     = $key;
        $this->name    = $name;
        $this->args    = $args;
        $this->post_id = $post_id;
    }

    /**
     * Render the field’s HTML.
     * Field types should override this.
     */
    abstract public function render();

    /**
     * Save a simple text/ID value to post meta.
     * Field types storing non-string values should override.
     */
    public function save($value) {
        update_post_meta($this->post_id, $this->key, sanitize_text_field($value));
    }

    /**
     * Retrieve the saved value from post meta.
     */
    public function getValue() {
        return get_post_meta($this->post_id, $this->key, true);
    }

    /**
     * Return an array of WP script handles this field needs.
     */
    public static function getFieldScripts(): array {
        return [];
    }

    /**
     * Return an array of WP style handles this field needs.
     */
    public static function getFieldStyles(): array {
        return [];
    }

    /**
     * Enqueue all scripts/styles returned by getFieldScripts()/getFieldStyles().
     * Should be called before rendering the field (e.g. in admin_enqueue_scripts).
     */
    public static function enqueueFieldAssets() {
        foreach (static::getFieldStyles() as $style) {
            wp_enqueue_style($style);
        }
        foreach (static::getFieldScripts() as $script) {
            wp_enqueue_script($script);
        }
    }

    /**
     * Settings support: override in subclasses as needed.
     */
    public static function supportsSettingAppend(): bool {
        return false;
    }

    public static function supportsSettingPrepend(): bool {
        return false;
    }

    public static function supportsSettingPlaceholder(): bool {
        return false;
    }

    public static function supportsSettingRows(): bool {
        return false;
    }

    public static function supportsSettingMaxLength(): bool {
        return false;
    }
}
