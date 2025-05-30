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

        require_once( F4_PATH . '/inc/Model/ModelController.php' );
        new \F4\Model\ModelController();

        require_once( F4_PATH . '/inc/Model/ModelRoutes.php' );
        new \F4\Model\ModelRoutes();

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

        // ModelImplementor Module || NS: \F4\Model\ModelImplementor 
        require_once( F4_PATH . '/inc/Model/ModelImplementor/PostTypeBuilder.php' );
        require_once( F4_PATH . '/inc/Model/ModelImplementor/FieldBuilder.php' );
        require_once( F4_PATH . '/inc/Model/ModelImplementor/FormRenderer.php' );
        require_once( F4_PATH . '/inc/Model/ModelImplementor/ModelSynchronizer.php' );
        require_once( F4_PATH . '/inc/Model/ModelImplementor/FieldRenderer.php' );
        new \F4\Model\ModelImplementor\ModelSynchronizer();
        new \F4\Model\ModelImplementor\FieldRenderer();

        // Field Registration and Types || NS: \F4\Field\
        require_once( F4_PATH . '/inc/Field/BaseField.php' );
        require_once( F4_PATH . '/inc/Field/FieldRegistry.php' );
        require_once( F4_PATH . '/inc/Field/TextField.php' );
        require_once( F4_PATH . '/inc/Field/CoreFieldRegistry.php' );
        \F4\Field\CoreFieldRegistry::register();

        // Frontend Module || NS: \F4\Front
        require_once( F4_PATH . '/inc/Front/ModelLoader.php' );
        require_once( F4_PATH . '/inc/Front/ModelInstance.php' );
        require_once( F4_PATH . '/inc/Front/TemplateLoader.php' );
        require_once( F4_PATH . '/inc/Front/PropertyLoader.php' );
        new \F4\Front\TemplateLoader();

        // Tests
        require_once( F4_PATH . '/inc/Tests/TestCaseInterface.php' );
        require_once( F4_PATH . '/inc/Tests/TestRunner.php' );
        require_once( F4_PATH . '/inc/Tests/CloneTableTest.php' );
        require_once( F4_PATH . '/inc/Tests/AddColumnTest.php' );

        // Initialize main admin menu
        if ( is_admin() ) {
            new \F4\Admin\AdminMenu();
        }

    }

    public static function activate() {
        require_once( F4_PATH . '/inc/PluginActivation.php' );
        \F4\PluginActivation::activate();
    }

    public static function deactivate() {
        
    }

}

new Plugin();

register_activation_hook(__FILE__, ['Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['Plugin', 'deactivate']);