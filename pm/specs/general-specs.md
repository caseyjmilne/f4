# General Specs

User can make models and properties and have the properties show up as fields on Post Editing forms for create and edit post. The fields are displayed using Metaboxes. 

## Models

Models are an object type that has a unique key. Models have a $type, which is either "scalable" or "post". A post type model will register a post type or attach the model to an existing post type. The F4 UI provides an option to select a post type already registered for attachment. This is then stored as $model->attachment with an object {key: post_type_key, title: post_type_title}.

Post type models store data in post meta. This is a convenient, but not very scalable approach to storage that uses key/value pairs. The result is poor performance when filtering or searching the data, as well as potential to affect performance of the WordPress site more broadly as the post and post_meta database tables become overloaded with records. 

Scalable models are F4's answer to the scalability challenges faced when using traditional WordPress fields systems like ACF and Metaboxes. Inspired by Strapi (the headless NodeJS CMS), F4 scalable models build a normalized database table for the model. Most field types then utilize a single column for database storage.

### Difference Between F4 Models and ACF Field Groups

The goal of F4 is quite similar to ACF, to provide fields that can be configured with a UI. F4 utilizes a "model" object instead of the approach taken with ACF Field Groups. This approach enables F4 to support the registration of new WordPress objects (post types, taxonomies). While ACF does this through a separate interface, in F4 the model is a flexible object that can either register (a new WP object) or attach (to an existing WP object). The F4 model also acts as a container for fields, serving in this role as equivalent to an ACF Field Group. 

## F4 Forms

F4 enables form building (for front-end forms) using the same fundamental building blocks: F4 models and F4 field types. An F4 form is a special type of model that extends the base model. It is managed separately from other models using the form_manager React app. Forms have their own submenu item at F4 > Forms. 

### Form Validation

F4 forms have form-level validation in addition to the field-level validation that is attached via the field settings. The form-level validators allow users to compare fields or require one field to be set out of a range of fields, and other validation types that would be impossible at the field-level. 

## Admin Pages

All admin pages are built in React. Each page is a separate React app. 

## Getting Field Values

F4 provides a simple value fetching function f4_value() that is roughly equivalent to ACF's get_field(). F4 also has the concept of "records" and enables fast fetching of an entire set of fields within a model using f4_record(). 

## Gutenberg Integration 

### Form Layouts

F4 fields are available as blocks and can be organized into F4 form layout blocks. The F4 form layout blocks are specifically designed to serve the needs of a form, providing customization options while keeping structure intact. 

### Filter Blocks

F4 filter blocks work with a loop layout to provide the end-user with control over the records fetched. For example on a real estate site, we may have a property model with a bedroom field. A select filter can be used to provide options such as 1+, 2+ etc. The select filter will reference the bedroom field to hook everything up as needed to form the query. 

## Use Case Real Estate

### Property Model 

User makes a property model to store properties. First problem: different types of properties require different fields. This is solved in ACF with conditional fields. 

Bedrooms and bathrooms are common fields. Address is a common set of fields. 

#### Property List Page

Filters and loop display with pagination and sorting. There is a query to fetch the initial listings. Filters such as price and bedrooms refine the results. User can choose to sort by price or other options. There is pagination set to a number of results. 

First we have to support the query in a way that it is filterable. 

Second we have to provide filters as blocks/elements. 

Third we need build out the loop handling so that it displays correctly in the editor and handles looping over records on the front. 

## Use Case Testing Engine

### Question Model 

User makes question model. Single choice fields are used. Perhaps multiple choice fields are also used. Fill in the blank is another type of field. 

## Quiz Field Types

By supporting quiz field types the plugin can be used for elearning and survey applications. 


