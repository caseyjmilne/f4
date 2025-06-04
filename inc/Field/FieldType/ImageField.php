<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class ImageField extends BaseField {

    /**
     * Enqueue WP media scripts/styles.
     */
    public static function getFieldScripts(): array {
        // 'media-upload' and 'thickbox' for the old media modal
        // 'wp-mediaelement' if needed; however wp_enqueue_media() covers most needs.
        return ['jquery', 'media-upload'];
    }

    public static function getFieldStyles(): array {
        return ['thickbox'];
    }

    /**
     * Render the image field.
     * For now, display a text input for the attachment ID and a placeholder preview.
     * Later, this can be changed to a hidden input + real uploader UI.
     */
    public function render() {
        // Enqueue the necessary media scripts/styles
        wp_enqueue_media(); // ensures the media library scripts are loaded
        static::enqueueFieldAssets();

        $value       = intval($this->getValue()); // attachment ID
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        // Unique IDs for JS selectors
        $input_id   = 'f4-imagefield-input-'   . esc_attr($this->key);
        $button_id  = 'f4-imagefield-button-'  . esc_attr($this->key);
        $preview_id = 'f4-imagefield-preview-' . esc_attr($this->key);

        echo "<p><label for='{$input_id}'><strong>{$name}</strong></label><br/>";

        // Show a preview <img> if an attachment ID is set
        if ($value) {
            $url = esc_url( wp_get_attachment_url($value) );
            echo "<div class='f4-imagefield__preview'><img id='{$preview_id}' src='{$url}' style='max-width:150px;height:auto;margin-bottom:8px;'/></div>";
        } else {
            echo "<div class='f4-imagefield__preview'><img id='{$preview_id}' src='' style='display:none; max-width:150px;height:auto;margin-bottom:8px;'/></div>";
        }

        // Text input to hold the attachment ID (for testing)
        echo "<input 
                  type='text' 
                  name='{$key}' 
                  id='{$input_id}' 
                  class='widefat f4-imagefield__input' 
                  value='{$value}' 
                  placeholder='{$placeholder}' 
              />";

        // Button to launch media uploader
        echo "<button type='button' id='{$button_id}' class='button f4-imagefield__button' style='margin-top:4px;'>Select Image</button>";

        echo "</p>";

        // Inline JS to open the WP media modal and capture attachment ID
        ?>
        <script type="text/javascript">
        jQuery(function($) {
            var frame;
            $('#' + '<?php echo $button_id; ?>').on('click', function(e) {
                e.preventDefault();
                // If the media frame already exists, reopen it.
                if (frame) {
                    frame.open();
                    return;
                }
                // Create a new media frame
                frame = wp.media({
                    title: 'Select or Upload Image',
                    button: { text: 'Use this Image' },
                    library: { type: 'image' },
                    multiple: false
                });
                // When an image is selected, run a callback.
                frame.on('select', function() {
                    var attachment = frame.state().get('selection').first().toJSON();
                    // Set the attachment ID in the input
                    $('#' + '<?php echo $input_id; ?>').val(attachment.id);
                    // Show the preview
                    $('#' + '<?php echo $preview_id; ?>').attr('src', attachment.url).show();
                });
                // Finally, open the modal
                frame.open();
            });
        });
        </script>
        <?php
    }

    /**
     * This field supports a placeholder setting.
     */
    public static function supportsSettingPlaceholder(): bool {
        return true;
    }
}
