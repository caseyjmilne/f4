<?php 

namespace F4\Model\ModelImplementor;

class ModelSynchronizer {

    protected PostTypeBuilder $postTypeBuilder;

    public function __construct() {
        $this->postTypeBuilder = new PostTypeBuilder();
        add_action('init', [$this, 'syncAllModels']);
    }

    public function syncAllModels(): void {
        
        $models = get_posts([
            'post_type' => 'model',
            'post_status' => 'publish',
            'numberposts' => -1
        ]);

        foreach ($models as $model) {
            $key = get_post_meta($model->ID, 'model_key', true);
            $label = $model->post_title;

            if (!$key) {
                error_log("[F4] Model '{$model->ID}' is missing a CPT key.");
                continue;
            }

            $args = [
                'label' => $label,
                'public' => true,
                'show_in_menu' => true,
                'show_in_rest' => true,
                'supports' => ['title', 'editor'],
                'has_archive' => true,
                'rewrite' => ['slug' => $key],
            ];

            $this->postTypeBuilder->register($key, $args);
        }

    }
}
