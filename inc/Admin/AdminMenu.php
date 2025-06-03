<?php 

namespace F4\Admin;

use F4\React\ReactBuildIntegration;

class AdminMenu {

    public function __construct() {
        add_action('admin_menu', [$this, 'registerMenus']);
        add_action('admin_enqueue_scripts', [$this, 'maybeEnqueueReactAssets']);
    }

    public function registerMenus() {
        add_menu_page(
            'F4 Dashboard',
            'F4',
            'manage_options',
            'f4_dashboard',
            [$this, 'renderDashboard'],
            'dashicons-admin-generic',
            3
        );

        add_submenu_page(
            'f4_dashboard',
            'Dashboard',
            'Dashboard',
            'manage_options',
            'f4_dashboard',
            [$this, 'renderDashboard'],
        );

        add_submenu_page(
            'f4_dashboard',
            'F4 Debug Tools',
            'Debug',
            'manage_options',
            'f4_debug',
            [new \F4\Admin\DebugPage(), 'render']
        );
    }

    public function renderDashboard() {
        echo '<div class="wrap"><div id="f4-app-manager"></div></div>';
    }

    public function maybeEnqueueReactAssets($hook) {
        // Only enqueue on our main plugin dashboard page
        if ($hook !== 'toplevel_page_f4_dashboard') {
            return;
        }

        $rbi = new ReactBuildIntegration();
        $rbi->enqueueAssets();
    }
}
