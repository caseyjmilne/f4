<?php 

namespace F4\Field;

/**
 * Represents a field instance with all its metadata and settings.
 */
class FieldInstance {

    /**
     * @var object The field type class instance (e.g. NumberField, TextField)
     */
    protected $type;

    /**
     * @var string Field key (e.g. 'property_price')
     */
    protected $key;

    /**
     * @var string Field name (e.g. 'price')
     */
    protected $name;

    /**
     * @var string Field label (e.g. 'Price')
     */
    protected $label;

    /**
     * @var mixed Default value for the field
     */
    protected $default;

    /**
     * @var array Field settings and options
     */
    protected $settings;

    /**
     * Set the field type instance.
     * @param object $type
     */
    public function setType($type) { $this->type = $type; }

    /**
     * Get the field type instance.
     * @return object
     */
    public function getType() { return $this->type->getType(); }

    /**
     * Alias for getType() for clarity.
     * @return object
     */
    public function getFieldTypeInstance() { return $this->type; }

    public function setKey($key) { $this->key = $key; }
    public function getKey() { return $this->key; }

    public function setName($name) { $this->name = $name; }
    public function getName() { return $this->name; }

    public function setLabel($label) { $this->label = $label; }
    public function getLabel() { return $this->label; }

    public function setDefault($default) { $this->default = $default; }
    public function getDefault() { return $this->default; }

    public function setSettings($settings) { $this->settings = $settings; }
    public function getSettings() { return $this->settings; }
}
