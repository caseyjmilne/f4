<?php 

namespace F4\Field;

class FieldInstance {

    protected $type; // A field type object from \F4\Field\FieldType that extends \F4\FieldBase.
    protected $key;
    protected $name;
    protected $label;
    protected $default;
    protected $settings = []; // renamed from config for consistency with PropertyInstance

    public function getType() {
        // Return field type key like 'text' if available from type class
        if (is_object($this->type) && method_exists($this->type, 'getKey')) {
            return $this->type->getKey();
        }

        return $this->type;
    }

    public function getTypeInstance() {
        return $this->type;
    }

    public function setType($type): self {
        $this->type = $type;
        return $this;
    }

    public function getKey() {
        return $this->key;
    }

    public function setKey($key): self {
        $this->key = $key;
        return $this;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name): self {
        $this->name = $name;
        return $this;
    }

    public function getLabel() {
        return $this->label;
    }

    public function setLabel($label): self {
        $this->label = $label;
        return $this;
    }

    public function getDefault() {
        return $this->default;
    }

    public function setDefault($default): self {
        $this->default = $default;
        return $this;
    }

    public function getSettings(): array {
        return $this->settings;
    }

    public function setSettings(array $settings): self {
        $this->settings = $settings;
        return $this;
    }

    public function getSetting(string $key, $default = null) {
        return $this->settings[$key] ?? $default;
    }

    public function setSetting(string $key, $value): self {
        $this->settings[$key] = $value;
        return $this;
    }
}
