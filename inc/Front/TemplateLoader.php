<?php

namespace F4\Front;

use F4\Model\ModelController;

class TemplateLoader {

    protected ModelController $modelController;

    public function __construct() {
        $this->modelController = new ModelController();

        add_filter('template_include', [$this, 'handleSingleTemplate']);
        add_filter('template_include', [$this, 'handleArchiveTemplate']);
        add_filter('template_include', [$this, 'handleFieldTemplate']);
    }

    public function handleSingleTemplate($template) {
        if (!is_singular()) {
            return $template;
        }

        $post_type = get_post_type();
        if (!$post_type) {
            return $template;
        }

        $model = $this->modelController->get_model_for_post_type($post_type);
        if (!$model) {
            return $template;
        }

        $custom_template = F4_PATH . '/templates/model_single.php';
        return file_exists($custom_template) ? $custom_template : $template;
    }

    public function handleArchiveTemplate($template) {
        if (!is_post_type_archive()) {
            return $template;
        }

        $post_type = get_query_var('post_type');
        if (!$post_type || is_array($post_type)) {
            return $template;
        }

        $model = $this->modelController->get_model_for_post_type($post_type);
        if (!$model) {
            return $template;
        }

        $custom_template = F4_PATH . '/templates/model_archive.php';
        return file_exists($custom_template) ? $custom_template : $template;
    }

    public function handleFieldTemplate($template) {
        if (!is_singular('f4_field')) {
            return $template;
        }

        $custom_template = F4_PATH . '/templates/field_single.php';
        return file_exists($custom_template) ? $custom_template : $template;
    }
} 
