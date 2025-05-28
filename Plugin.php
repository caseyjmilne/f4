<?php 

/*
 * Plugin Name: F4
 */

define( 'F4_URL', plugin_dir_url( __FILE__ ) );
define( 'F4_PATH', plugin_dir_path( __FILE__ ) );
define( 'F4_VERSION', '0.0.1' );

class Plugin {

    function __construct() {

        require_once( F4_PATH . '/inc/ModelController.php' );
        new ModelController();

        require_once( F4_PATH . '/inc/ModelRoutes.php' );
        new ModelRoutes();

        require_once( F4_PATH . '/inc/ModelPropertyController.php' );
        new ModelPropertyController();

        require_once( F4_PATH . '/inc/ModelPropertyRoutes.php' );
        new ModelPropertyRoutes();

    }

}

new Plugin();