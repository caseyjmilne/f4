<?php 

/*
 * Plugin Name: F4
 * Author: Casey J. Milne
 * Description: Scalable fields for WordPress with powerful data modelling and dynamic content support. 
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

        require_once( F4_PATH . '/inc/DatabaseHandler.php' );
        require_once(F4_PATH . '/inc/Database/TableCloner.php');

        // Admin interface
        if ( is_admin() ) {
            require_once( F4_PATH . '/inc/Admin/AdminMenu.php' );
            require_once( F4_PATH . '/inc/Admin/DebugPage.php' );
        }

        // Tests
        require_once( F4_PATH . '/inc/Tests/TestCaseInterface.php' );
        require_once( F4_PATH . '/inc/Tests/TestRunner.php' );
        require_once( F4_PATH . '/inc/Tests/CloneTableTest.php' );

        // Initialize main admin menu
        if ( is_admin() ) {
            new \F4\Admin\AdminMenu();
        }

    }

    public static function activate() {
        require_once( F4_PATH . '/inc/PluginActivation.php' );
        \F4\PluginActivation::activate();
    }

}

new Plugin();

register_activation_hook(__FILE__, ['Plugin', 'activate']);