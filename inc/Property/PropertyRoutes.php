<?php 

namespace F4\Property;

use F4\Property\PropertyController;

class PropertyRoutes {

    protected $controller;

    public function __construct() {
        $this->controller = new PropertyController();
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('custom/v1', '/property', [
            'methods' => 'GET',
            'callback' => [$this, 'get_properties'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('custom/v1', '/property', [
            'methods' => 'POST',
            'callback' => [$this, 'create_property'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('custom/v1', '/property/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'update_property'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('custom/v1', '/property/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'delete_property'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_properties(\WP_REST_Request $request) {
        $model_id = $request->get_param('model_id');
        return $this->controller->get_properties($model_id);
    }

    public function create_property(\WP_REST_Request $request) {
        $data = $request->get_json_params();
        return $this->controller->create_property($data);
    }

    public function update_property(\WP_REST_Request $request) {
        $id = (int) $request['id'];
        $data = $request->get_json_params();
        return $this->controller->update_property($id, $data);
    }

    public function delete_property(\WP_REST_Request $request) {
        $id = (int) $request['id'];
        return $this->controller->delete_property($id);
    }
}
