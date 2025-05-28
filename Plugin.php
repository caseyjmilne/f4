<?php 

/*
 * Plugin Name: F4
 * Author: Casey J. Milne
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

        // Test database handler. 
        $db = new \F4\Utility\DatabaseHandler();
        
        //$db->createStandardTable('test2');

        $db->addColumn('test2', [
            'name' => 'status2',
            'type' => "VARCHAR(20) NOT NULL DEFAULT 'draft'",
            'after' => 'id'
        ]);

        /*
         *
         * Table Clone Test
         * 
         */
        /*
        $tc = new \F4\Database\TableCloner();
        $table_name = $tc->prefixTableName( 'test2' );
        $cloned = $tc->cloneTable( $table_name );

        if (!$cloned) {
            echo 'Table clone failed — check error log.';
        } else {
            echo "Cloned to: $cloned";
        }
        */

        $cloner = new \F4\Database\TableCloner();
        $table_name = $cloner->prefixTableName( 'test2' );
        $cloner->removeClonesFor( $table_name );


    }

    public static function activate() {
        require_once( F4_PATH . '/inc/PluginActivation.php' );
        \F4\PluginActivation::activate();
    }

}

new Plugin();

register_activation_hook(__FILE__, ['Plugin', 'activate']);