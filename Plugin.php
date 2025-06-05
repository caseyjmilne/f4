<?php 

/*
 * Plugin Name: F4
 * Author: Casey J. Milne
 * Description: Scalable fields for WordPress with powerful data modelling and dynamic content support. 
 * Version: 0.0.1
 */

define( 'F4_URL', plugin_dir_url( __FILE__ ) );
define( 'F4_PATH', plugin_dir_path( __FILE__ ) );
define( 'F4_VERSION', '0.0.1' );

class Plugin {

    function __construct() {

        // Model Module
        require_once( F4_PATH . '/inc/Model/ModelInstance.php' );

        require_once( F4_PATH . '/inc/Model/ModelController.php' );
        new \F4\Model\ModelController();

        require_once( F4_PATH . '/inc/Model/ModelRoutes.php' );
        new \F4\Model\ModelRoutes();

        // Properties.
        require_once( F4_PATH . '/inc/Property/PropertyController.php' );
        require_once( F4_PATH . '/inc/Property/PropertyInstance.php' );
        require_once( F4_PATH . '/inc/Property/PropertyRoutes.php' );
        new \F4\Property\PropertyController();
        new \F4\Property\PropertyRoutes();

        require_once( F4_PATH . '/inc/Model/ModelType.php' );
        require_once( F4_PATH . '/inc/Model/ModelTypeInterface.php' );
        require_once( F4_PATH . '/inc/Model/ModelTypePost.php' );
        require_once( F4_PATH . '/inc/Model/ModelTypeScalable.php' );

        // Database Handlers.

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
        require_once( F4_PATH . '/inc/Field/CoreFieldRegistry.php' );
        require_once( F4_PATH . '/inc/Field/FieldFactory.php' );
        require_once( F4_PATH . '/inc/Field/FieldRoutes.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/TextField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/NumberField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/HiddenField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/SelectField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/TextareaField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/ImageField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/UrlField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/EmailField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/PasswordField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/WysiwygField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/GroupField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/RepeaterField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/RangeField.php' );
        \F4\Field\CoreFieldRegistry::register();
        \F4\Field\FieldRoutes::register();

        // Frontend Module || NS: \F4\Front
        require_once( F4_PATH . '/inc/Front/ModelLoader.php' );
        require_once( F4_PATH . '/inc/Front/TemplateLoader.php' );
        require_once( F4_PATH . '/inc/Front/PropertyLoader.php' );
        new \F4\Front\TemplateLoader();

        // Tests
        require_once( F4_PATH . '/inc/Tests/TestCaseInterface.php' );
        require_once( F4_PATH . '/inc/Tests/TestRunner.php' );
        require_once( F4_PATH . '/inc/Tests/CloneTableTest.php' );
        require_once( F4_PATH . '/inc/Tests/AddColumnTest.php' );
        require_once( F4_PATH . '/inc/Tests/ListFieldTypesTest.php' );

        // React Integration
        require_once( F4_PATH . '/inc/React/ReactBuildIntegration.php' );

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