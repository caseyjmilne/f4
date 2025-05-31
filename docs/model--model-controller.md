
# ModelController API Responses

This document describes the responses returned by methods in the `F4\Model\ModelController` class.

---

## get_all_models()

Fetches all models (`post_type = model`).

**Returns**  
`ModelInstance[]`

**Response Example**
```json
[
  {
    "id": 15,
    "name": "Customer",
    "model_key": "customer"
  },
  {
    "id": 16,
    "name": "Order",
    "model_key": "order"
  }
]
```

---

## create_model(string $name, string $model_key)

Creates a new model post.

**Parameters**
- `name`: Model title.
- `model_key`: Unique model key.

**Returns**  
`ModelInstance|null`

**Success Example**
```json
{
  "id": 25,
  "name": "Invoice",
  "model_key": "invoice"
}
```

**Failure Example**
```json
{
  "code": "create_failed",
  "message": "Failed to create model",
  "data": {
    "status": 500
  }
}
```

---

## update_model(int $id, ?string $name, ?string $model_key)

Updates the title and/or key of an existing model.

**Parameters**
- `id`: Model ID.
- `name` (optional): New name.
- `model_key` (optional): New key.

**Returns**  
`ModelInstance|null`

**Success Example**
```json
{
  "id": 25,
  "name": "Updated Invoice",
  "model_key": "invoice_v2"
}
```

**Failure Example**
```json
{
  "code": "update_failed",
  "message": "Failed to update model",
  "data": {
    "status": 500
  }
}
```

---

## ModelInstance::to_array()

All methods return model data via `ModelInstance::to_array()`.

**Structure**
```json
{
  "id": 123,
  "name": "Model Name",
  "model_key": "model_key"
}
```
