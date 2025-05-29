# 🧪 F4 Plugin: End User Testing Guide

This guide walks you through testing the current functionality of the F4 plugin, from creating a model and its properties to verifying the data output in the single view.

---

## 🧱 1. Create a New Model

1. Log into your **WordPress Admin**.
2. Go to **Models** (`/wp-admin/edit.php?post_type=model`).
3. Click **"Add New"**.
4. Fill in the **Model Title** (e.g., `Product`, `Location`, etc.).
5. Publish the model.

👉 This will register a new **custom post type** based on the model’s slug.

---

## 🧩 2. Add Properties to the Model

1. Go to **Properties** (`/wp-admin/edit.php?post_type=property`).
2. Click **"Add New"** for each property you want to define for the model.
3. For each property:
   - **Name**: e.g., "Price"
   - **Key**: e.g., `price` (used as meta key)
   - **Type**: e.g., `text`, `number`, `boolean` (for future input validation/rendering)
   - **Model ID**: Use the numeric post ID of the model created in step 1.
4. Save each property.

✅ Each property is now linked to the model via post meta (`model_id`).

---

## 📝 3. Create Test Posts for the Model

1. From the admin sidebar, go to the new **Custom Post Type** (e.g., if you named the model "Product", go to **Products**).
2. Click **"Add New"**.
3. Enter a title and content for your test item.
4. In the **Custom Fields** area (enable it via *Screen Options* if necessary):
   - Add new fields using the **keys** defined in the properties (e.g., `price`, `location`, etc.).
   - Set example values.
5. Publish the post.

📌 These meta fields are saved using standard `post_meta`.

---

## 🔍 4. View and Verify the Output

1. Navigate to the frontend single view of the test post.
   - Example: `https://yoursite.test/product/example-product`
2. Confirm that:
   - The **Model Title** and **Model ID** are shown.
   - A **table** of properties appears below the content.
   - Each property row displays:
     - Name
     - Key
     - Type
     - The **actual value** from the current post's meta

✅ You should see correct data populated from both the property definitions and the current post.

---

## 🧼 Example Output

| Name      | Key      | Type   | Value        |
|-----------|----------|--------|--------------|
| Price     | price    | number | 19.99        |
| In Stock  | in_stock | bool   | true         |
| Location  | location | text   | Warehouse A  |

---

## 🚧 Notes

- If no properties are defined, the single view will show: `No properties found for this model.`
- If a property exists but no meta value is saved in the post, the value will appear blank.
- Current logic assumes scalar values. Array/object handling is not yet implemented.
