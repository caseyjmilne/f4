<?php 

namespace F4\Model;

class ModelType
{
    const POST_TYPE = 'post_type';
    const SCALABLE_TYPE = 'scalable_type';

    protected static $supportedTypes = [
        self::POST_TYPE,
        self::SCALABLE_TYPE,
    ];

    /**
     * Validate a model type.
     */
    public static function isValid(string $type): bool
    {
        return in_array($type, self::$supportedTypes, true);
    }

    /**
     * Get all supported model types.
     */
    public static function getSupportedTypes(): array
    {
        return self::$supportedTypes;
    }

    /**
     * Get a human-readable label for a type.
     */
    public static function getLabel(string $type): string
    {
        switch ($type) {
            case self::POST_TYPE:
                return 'Post Type';
            case self::SCALABLE_TYPE:
                return 'Scalable Type';
            default:
                return ucfirst($type);
        }
    }

    /**
     * Determine if the type uses native WordPress post meta.
     */
    public static function isPostType(string $type): bool
    {
        return $type === self::POST_TYPE;
    }

    /**
     * Determine if the type uses scalable database tables.
     */
    public static function isScalableType(string $type): bool
    {
        return $type === self::SCALABLE_TYPE;
    }
}
