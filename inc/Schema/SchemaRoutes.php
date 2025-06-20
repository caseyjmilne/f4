<?php 

class SchemaRoutes {
    public function register(): void {
        register_rest_route('custom/v1', '/collection-schema/(?P<id>\d+)', [
            'methods'  => 'GET',
            'callback' => [$this, 'getSchema'],
            'permission_callback' => fn() => current_user_can('edit_posts'),
        ]);
    }

    public function getSchema(WP_REST_Request $request): WP_REST_Response {
        $id = (int) $request['id'];
        $controller = Plugin::getSchemaController();
        $schema = $controller->getSchemaForCollection($id);

        return rest_ensure_response($schema ? $schema->get() : []);
    }
}
