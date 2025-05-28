<?php

namespace F4\Admin;

class AdminMenu {

    public function __construct() {
        add_action('admin_menu', [$this, 'registerMenus']);
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
            'F4 Debug Tools',
            'Debug',
            'manage_options',
            'f4_debug',
            [new \F4\Admin\DebugPage(), 'render']
        );
    }

    public function renderDashboard() {
        echo '<div class="wrap"><h1>F4 Dashboard</h1><p>Welcome to the F4 plugin dashboard.</p></div>';
    }

    public function renderDebug() {
        echo '<div class="wrap"><h1>Debug Tools</h1><p>Debug utilities and output go here.</p></div>';
    }
}
