<?php

namespace F4\Tests;

class FieldTypeApiResponseTest implements TestCaseInterface {
    public function run(): array {
        $response = wp_remote_get(rest_url('f4/v1/fields'));

        if (is_wp_error($response)) {
            return [
                'success' => false,
                'message' => 'Failed to fetch API response: ' . $response->get_error_message(),
            ];
        }

        $code = wp_remote_retrieve_response_code($response);
        if ($code !== 200) {
            return [
                'success' => false,
                'message' => "Unexpected response code: $code",
                'data'    => wp_remote_retrieve_body($response),
            ];
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (!is_array($body)) {
            return [
                'success' => false,
                'message' => 'API response is not a valid JSON array.',
                'data'    => wp_remote_retrieve_body($response),
            ];
        }

        foreach ($body as $field) {
            if (!isset($field['type'], $field['class'], $field['label'], $field['supportedSettings'])) {
                return [
                    'success' => false,
                    'message' => 'Missing expected keys in one or more field responses.',
                    'data'    => $field,
                ];
            }
        }

        return [
            'success' => true,
            'message' => 'API returned valid field type metadata.',
            'data'    => $body,
        ];
    }
}
