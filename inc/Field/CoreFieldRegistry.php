<?php

namespace F4\Field;

class CoreFieldRegistry {

    public static function register() {
        FieldRegistry::register('text', \F4\Field\FieldType\TextField::class);
        FieldRegistry::register('textarea', \F4\Field\FieldType\TextareaField::class);
        FieldRegistry::register('number', \F4\Field\FieldType\NumberField::class);
        FieldRegistry::register('hidden', \F4\Field\FieldType\HiddenField::class);
        FieldRegistry::register('select', \F4\Field\FieldType\SelectField::class);
        FieldRegistry::register('image', \F4\Field\FieldType\ImageField::class);
        FieldRegistry::register('url', \F4\Field\FieldType\UrlField::class);
        FieldRegistry::register('email', \F4\Field\FieldType\EmailField::class);
        FieldRegistry::register('password', \F4\Field\FieldType\PasswordField::class);
        FieldRegistry::register('wysiwyg', \F4\Field\FieldType\WysiwygField::class);
        FieldRegistry::register('group', \F4\Field\FieldType\GroupField::class);
        FieldRegistry::register('repeater', \F4\Field\FieldType\RepeaterField::class);
        FieldRegistry::register('range', \F4\Field\FieldType\RangeField::class);
        FieldRegistry::register('file', \F4\Field\FieldType\FileField::class);
        FieldRegistry::register('true_false', \F4\Field\FieldType\TrueFalseField::class);
        FieldRegistry::register('checkbox', \F4\Field\FieldType\CheckboxField::class);
        FieldRegistry::register('radio', \F4\Field\FieldType\RadioField::class);
        FieldRegistry::register('post', \F4\Field\FieldType\PostField::class);
        FieldRegistry::register('page', \F4\Field\FieldType\PageField::class);
        FieldRegistry::register('color', \F4\Field\FieldType\ColorField::class);
        FieldRegistry::register('date', \F4\Field\FieldType\DateField::class);
        FieldRegistry::register('post_relationship', \F4\Field\FieldType\PostRelationshipField::class);
        FieldRegistry::register('taxonomy', \F4\Field\FieldType\TaxonomyField::class);
        FieldRegistry::register('user', \F4\Field\FieldType\UserField::class);
        FieldRegistry::register('button_group', \F4\Field\FieldType\ButtonGroupField::class);
    }
}
