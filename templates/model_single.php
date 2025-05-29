<?php

use F4\Front\ModelLoader;

$post_type_key = get_post_type();
$model = ModelLoader::getModelForPostType( $post_type_key );

var_dump($model);

if ( !$model ) {
    // @TODO Handle error in model loading.
}



get_header();

if (have_posts()) :
    while (have_posts()) : the_post();

        // Get current post ID and post type
        $post_id = get_the_ID();
        $post_type = get_post_type($post_id);

        ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h5>Model ID: <?php echo $model->getId(); ?></h5>
            <h5>Model Title: <?php echo $model->getTitle(); ?></h5>
            <h1><?php the_title(); ?></h1>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
        </article>

    <?php endwhile;
endif;

get_footer();
