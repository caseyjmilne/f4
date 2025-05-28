# F4 Plans

## How to make fields? 

In ACF Field Types are defined in PHP. Should F4 follow this? Or should they be defined in JS? 

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

