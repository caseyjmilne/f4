<?php 

namespace F4\Field;

class FieldInstance {

    protected $type; // A field type object from \F4\Field\FieldType that extends \F4\FieldBase.

    public function getType() {
        return $this->type;
    }

}