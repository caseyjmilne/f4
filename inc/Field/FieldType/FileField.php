<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class FileField extends BaseField {

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

    public static function getFieldScripts(): array {
        return ['jquery', 'media-upload'];
    }

    public static function getFieldStyles(): array {
        return ['thickbox'];
    }

    public function render() {
        wp_enqueue_media();
        static::enqueueFieldAssets();

        $value       = intval($this->getValue());
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        $input_id   = 'f4-filefield-input-'   . $this->key;
        $button_id  = 'f4-filefield-button-'  . $this->key;
        $display_id = 'f4-filefield-display-' . $this->key;

        $file_url = $value ? esc_url(wp_get_attachment_url($value)) : '';

        echo "<p><label for='{$input_id}'><strong>{$name}</strong></label><br/>";

        // File URL or message
        echo "<div id='{$display_id}' class='f4-filefield__display' style='margin-bottom:8px;'>";
        echo $file_url ? "<a href='{$file_url}' target='_blank'>{$file_url}</a>" : 'No file selected.';
        echo "</div>";

        // Input for attachment ID
        echo "<input 
                  type='text' 
                  name='{$key}' 
                  id='{$input_id}' 
                  class='widefat f4-filefield__input' 
                  value='{$value}' 
                  placeholder='{$placeholder}' 
              />";

        // Media button
        echo "<button type='button' id='{$button_id}' class='button f4-filefield__button' style='margin-top:4px;'>Select File</button>";

        echo "</p>";
        ?>

        <script type="text/javascript">
        jQuery(function($) {
            var frame;
            $('#' + '<?php echo $button_id; ?>').on('click', function(e) {
                e.preventDefault();
                if (frame) {
                    frame.open();
                    return;
                }

                frame = wp.media({
                    title: 'Select or Upload File',
                    button: { text: 'Use this File' },
                    library: { type: ['application', 'text'] },
                    multiple: false
                });

                frame.on('select', function() {
                    var attachment = frame.state().get('selection').first().toJSON();
                    $('#' + '<?php echo $input_id; ?>').val(attachment.id);
                    $('#' + '<?php echo $display_id; ?>').html(
                        '<a href="' + attachment.url + '" target="_blank">' + attachment.url + '</a>'
                    );
                });

                frame.open();
            });
        });
        </script>

        <?php
    }

}
