# FieldRoutes 

See class \F4\Field\FieldRoutes.

## [GET] f4/v1/fields

Method getFieldTypeList() is the callback for the route. FieldRegistry::all() is used to get the simple registry info which has only 2 properties: key and class. 

## [GET] f4/v1/field/[type] 

Callback getFieldTypeInfo(). FieldRegistry::get($type) is used to load the field type registration summary (key/class). 

### Example Response 

{
    "type": "text",
    "class": "F4\\Field\\FieldType\\TextField",
    "label": "Text",
    "supportedSettings": [
        "append",
        "placeholder",
        "prepend",
        "maxLength"
    ]
}