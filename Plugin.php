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
        require_once( F4_PATH . '/inc/Field/FieldSettings.php' );
        require_once( F4_PATH . '/inc/Field/FieldInstance.php' );
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
        require_once( F4_PATH . '/inc/Field/FieldType/FileField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/TrueFalseField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/CheckboxField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/RadioField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/PostField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/PageField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/ColorField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/DateField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/PostRelationshipField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/TaxonomyField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/UserField.php' );
        require_once( F4_PATH . '/inc/Field/FieldType/ButtonGroupField.php' );
        \F4\Field\CoreFieldRegistry::register();
        \F4\Field\FieldRoutes::register();

        // Frontend Module || NS: \F4\Front
        require_once( F4_PATH . '/inc/Front/ModelLoader.php' );
        require_once( F4_PATH . '/inc/Front/TemplateLoader.php' );
        require_once( F4_PATH . '/inc/Front/PropertyLoader.php' );
        new \F4\Front\TemplateLoader();

        // Auth 
        require_once( F4_PATH . '/inc/Auth/Permission.php' );

        // Tests
        require_once( F4_PATH . '/inc/Tests/TestCaseInterface.php' );
        require_once( F4_PATH . '/inc/Tests/TestRunner.php' );
        require_once( F4_PATH . '/inc/Tests/CloneTableTest.php' );
        require_once( F4_PATH . '/inc/Tests/AddColumnTest.php' );
        require_once( F4_PATH . '/inc/Tests/ListFieldTypesTest.php' );
        require_once( F4_PATH . '/inc/Tests/FieldTypeApiResponseTest.php' );

        // React Integration
        require_once( F4_PATH . '/inc/React/ReactBuildIntegration.php' );

        // Collections
        require_once( F4_PATH . '/inc/Collection/CollectionController.php' );
        require_once( F4_PATH . '/inc/Collection/CollectionRoutes.php' );
        \F4\Collection\CollectionRoutes::register_routes();

        // Records 
        require_once( F4_PATH . '/inc/Record/Record.php' );


        // Initialize main admin menu
        if ( is_admin() ) {
            new \F4\Admin\AdminMenu();
        }

        add_action('wp_enqueue_scripts', [$this, 'f4_enqueue_facet_filter_modules']);

    }

    public static function activate() {
        require_once( F4_PATH . '/inc/PluginActivation.php' );
        \F4\PluginActivation::activate();
    }

    public static function deactivate() {
        
    }

    function f4_enqueue_facet_filter_modules() {
        
        $url = F4_URL . 'js/filters/';

        wp_register_script_module(
            'f4-filter-base',
            F4_URL . 'js/filters/FacetFilterBase.js'
        );
        wp_register_script_module(
            'f4-select-filter',
            F4_URL . 'js/filters/SelectFilter.js',
        [
            ['id' => 'f4-filter-base', 'import' => 'static']
        ]
        );


    }

    function f4_enqueue_facet_filter_styles() {
        // Enqueue base filter styles
        wp_enqueue_style(
            'f4-facet-filter-base',
            F4_URL . 'css/filters/FacetFilterBase.css',
            [],
            null
        );

        // Enqueue select filter styles
        wp_enqueue_style(
            'f4-select-filter',
            F4_URL . 'css/filters/SelectFilter.css',
            [],
            null
        );
    }

}

new Plugin();

register_activation_hook(__FILE__, ['Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['Plugin', 'deactivate']);