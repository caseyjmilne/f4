# F4 Plans

## Refactoring Plans

2. Move non-route specific functions out of ModelRoutes and into the ModelController so they can be repurposed for direct calls. 
4. Add ModelType classes; ModelTypePost, ModelTypeScalable.
5. Move post type specific handling like CPT registration and metabox handling out of the ModelController and into ModelTypePost.
6. Remove all instances of using get_posts() directly to fetch list of models. Replace with a ModelQuery getAll() method that returns ModelInstance.

## Model Testing

### Add Single Template to Model Posts

Preview the details of the model including list of properties, model type/key, number of current posts for model.

## Loop Over Models to Make CPT's

This is a test of support for P-type models. It is simpler than the S-type models which require a database table to be created.

Get all (published) model posts. Use the key as the CPT key. Make the labels. Make the rest of the settings static for now. 

## Loop over properties to make fields

Make meta boxes for the P-type models and loop over the properties to create fields. Process the fields on post save hooks. Save the data as meta data. Create only text fields for now. 

## Add support for options pages

Save data to options. Make options a model type? 

## Add number field type

Validate for number. 

# Create tables for each S-type model 

On create, make table. On delete S-type model, delete the table. Clone table before delete to enable rollback. If model updated (name change) update the table name. 

# Create columns for each model property

Loop over the model properties and make columns. Practice just making varchars. Each field type should declare the column type it needs. 

# Handle field reordering

Add support for position field. Add drag-n-drop sorting of properties. Update field position on drop event. Add API route for handling order changes. 

#### Column remove

If fields are removed, we may need to remove columns. 

# F4 Extensions

## F4 Query Pro / Queries with Filter Support

Build on top of WP Query for post type models. 
Support checkbox filter. Supports select type fields. Get filter options from the select field options. 
Provide Query UI. 
User chooses model. Adds query to the model. Can add multiple queries for a single model. 
How many per page (or limit for single page)? Support paging?
Filter by field. Date before, date after, date between. 
Static filters are presets that never change and form part of the query params. 
Order by can be set to a default value (static). User can also enable the order to be user controlled by a sorter. 
Each query creates an API endpoint where the data can be fetched. Developers can bypass the endpoint and run the query directly with PHP.
The queries job ends at returning the data and notices. 

## F4 Gutenberg Pro / Gutenberg Page Builder Support

Gutenberg first. Query block. Choose a query that was already made in the UI. Block passes the data down to the inner blocks. Filter block, choose a UI type. Select a query filter. 

Property blocks render out the properties of a given model. Number render with formatting options. Image render. 

Front end rendering initial load with default query result. Apply event handlers to the filters. Send requests to query API endpoint, get results and use Gutenberg reactivity to swap content.

Enhancements Noted 2025-06-01

1. Add link to model (post type) to the model details.
2. Add record count (post count) for the model in model details. 

# Missing Field Types 

Compared to ACF Pro.

oembed (embedding external media)

gallery (multi-image selector)

button_group (button-based select UI)

link (URL/link selector)

google_map (map selector)

date_time_picker (date + time selector)

time_picker (time selector)

flexible_content (layout builder field)

clone (clone another field/group)


