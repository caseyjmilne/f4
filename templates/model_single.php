<?php

use F4\Front\ModelLoader;
use F4\Front\PropertyLoader;

$post_type_key = get_post_type();
$model = ModelLoader::getModelForPostType($post_type_key);

if (!$model) {
    echo '<p>Model not found.</p>';
    return;
}

// Load properties for this model
$property_loader = new PropertyLoader();
$properties = $property_loader->get_properties_for_model($model->getId());

get_header();

if (have_posts()) :
    while (have_posts()) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h5>Model ID: <?php echo esc_html($model->getId()); ?></h5>
            <h5>Model Title: <?php echo esc_html($model->getTitle()); ?></h5>
            <h1><?php the_title(); ?></h1>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>

            <?php if (!empty($properties)): ?>
                <section class="model-properties">
                    <h2>Properties</h2>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Key</th>
                                <th>Type</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($properties as $property): 
                                $name = get_post_meta($property->ID, 'name', true);
                                $key  = get_post_meta($property->ID, 'key', true);
                                $type = get_post_meta($property->ID, 'type', true);
                                $value = get_post_meta(get_the_ID(), $key, true); // actual value from current model post
                                ?>
                                <tr>
                                    <td><?php echo esc_html($name); ?></td>
                                    <td><?php echo esc_html($key); ?></td>
                                    <td><?php echo esc_html($type); ?></td>
                                    <td><?php echo esc_html($value); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </section>
            <?php else: ?>
                <p>No properties found for this model.</p>
            <?php endif; ?>

        </article>

    <?php endwhile;
endif;

get_footer();
