<?php 

namespace F4\Model\ModelImplementor;

class PostTypeBuilder {

    public function register(string $slug, array $args): void {
        register_post_type($slug, $args);
    }

}
