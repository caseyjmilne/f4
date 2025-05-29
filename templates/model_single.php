<?php

use F4\Front\ModelLoader;
use F4\Front\PropertyLoader;

$post_type_key = get_post_type();
$model = ModelLoader::getModelForPostType($post_type_key);

if (!$model) {
    echo '<p>Model not found.</p>';
    return; // Or handle error more gracefully
}

// Load properties for this model
$property_loader = new PropertyLoader();
$properties = $property_loader->get_properties_for_model($model->getId());

get_header();

if (have_posts()) :
    while (have_posts()) : the_post();

        ?>
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
                    <ul>
                        <?php foreach ($properties as $property): ?>
                            <li>
                                <strong><?php echo esc_html(get_post_meta($property->ID, 'name', true)); ?></strong> 
                                (Key: <?php echo esc_html(get_post_meta($property->ID, 'key', true)); ?>, 
                                Type: <?php echo esc_html(get_post_meta($property->ID, 'type', true)); ?>)
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </section>
            <?php else: ?>
                <p>No properties found for this model.</p>
            <?php endif; ?>

        </article>

    <?php endwhile;
endif;

get_footer();
