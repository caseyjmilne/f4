<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class UserField extends BaseField
{

    public static function getSupportedSettings(): array {
        return [
            'default', 
            'required', 
            'instructions', 
            'append', 
            'placeholder', 
            'prepend', 
            'maxLength',
            'conditions'
        ];
    }

    /**
     * Validate and sanitize the value before saving
     * Accepts user ID(s) as int or array of ints if multiple is true
     */
    public function sanitize($value)
    {
        if ($this->settings['multiple'] ?? false) {
            if (!is_array($value)) {
                return [];
            }
            return array_filter(array_map('intval', $value));
        }

        return intval($value);
    }

    /**
     * Render the field input HTML for admin UI
     */
    public function render()
    {
        $multiple = $this->settings['multiple'] ?? false;
        $roles = $this->settings['roles'] ?? [];

        // Fetch users by role filter
        $args = [
            'orderby' => 'display_name',
            'order' => 'ASC',
            'fields' => 'ID',
        ];
        if (!empty($roles)) {
            $args['role__in'] = $roles;
        }

        $users = get_users($args);

        echo '<select name="' . esc_attr($name) . ($multiple ? '[]' : '') . '" ' . ($multiple ? 'multiple' : '') . ' class="f4-field-user-select">';
        echo '<option value="">' . esc_html__('Select User', 'f4') . '</option>';

        foreach ($users as $user_id) {
            $user = get_userdata($user_id);
            if (!$user) continue;

            $selected = '';
            if ($multiple && is_array($value) && in_array($user_id, $value)) {
                $selected = 'selected';
            } elseif (!$multiple && $value == $user_id) {
                $selected = 'selected';
            }

            echo '<option value="' . esc_attr($user_id) . '" ' . $selected . '>' . esc_html($user->display_name) . '</option>';
        }
        echo '</select>';
    }
}
