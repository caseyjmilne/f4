<?php

namespace F4\Front;

use F4\Model\ModelController;

class TemplateLoader {

    public function __construct() {
        add_filter('template_include', [$this, 'loadTemplate']);
    }

    public function loadTemplate($template) {
        if (!is_singular()) return $template;

        $post_type = get_post_type();

        $modelController = new ModelController();
        $model = $modelController->get_model_for_post_type($post_type);

        if ($model) {
            $custom_template = F4_PATH . '/templates/model_single.php';
            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }

        return $template;
    }
}
