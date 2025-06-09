<?php

namespace F4\React;

class ReactBuildIntegration {

    protected $assetDir;
    protected $assetUrl;

    public function __construct() {
        $this->assetDir = F4_PATH . 'apps/manager/dist/assets';
        $this->assetUrl = F4_URL . '/apps/manager/dist/assets';
    }

    public function enqueueAssets() {
        $jsFile = $this->findAsset('js');
        $cssFile = $this->findAsset('css');

        if ($cssFile) {
            wp_enqueue_style('f4-react-style', $this->assetUrl . '/' . $cssFile, [], null);
        }

        if ($jsFile) {
            wp_enqueue_script('f4-react-script', $this->assetUrl . '/' . $jsFile, [], null, true);

            // Localize the REST nonce for authenticated requests
            wp_localize_script('f4-react-script', 'wpApiSettings', [
                'nonce' => wp_create_nonce('wp_rest')
            ]);
        }
    }

    protected function findAsset($type = 'js') {
        $files = glob($this->assetDir . "/*.$type");
        foreach ($files as $file) {
            $filename = basename($file);
            // Match filenames like index-Fr6Dq8_l-F.js
            if (preg_match('/^index[-_a-zA-Z0-9]+\.'. preg_quote($type, '/') .'$/', $filename)) {
                return $filename;
            }
        }
        return null;
    }

}
