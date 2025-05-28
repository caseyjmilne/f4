=== F4 ===
Contributors: caseymilne  
Tags: custom post types, database, fields, metaboxes, rest api  
Requires at least: 6.0  
Tested up to: 6.5  
Stable tag: 0.0.1  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

F4 is a model-driven plugin framework for WordPress. It allows developers to define content types and fields in the admin and automatically implements them as custom post types and meta fields.

== Description ==

F4 is a developer-first WordPress plugin that turns user-defined "models" and "properties" into custom post types and fields.

Models are created and configured in the WordPress admin, and the plugin automatically:
- Registers the model as a custom post type
- Applies the defined fields as post meta
- Exposes everything via the WordPress REST API

F4 also includes powerful table management and cloning features for advanced developers, as well as a debug panel with test triggers.

This plugin is ideal for developers building dynamic data structures without writing repeated boilerplate code.

== Features ==

- Define models and properties in the admin UI
- Automatically generates CPTs and meta fields
- REST API support for all registered types
- Custom database table builder with column management
- Safe table cloning and reordering
- Debug tools and extensibility hooks

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Go to **F4 > Dashboard** in the admin menu to start defining models

== Frequently Asked Questions ==

= Who is this plugin for? =  
Primarily for developers who want a structured way to define and implement content types in WordPress.

= Can I use this without writing code? =  
Currently, some configuration is UI-based, but implementation logic is handled by backend classes. You may still need developer support for custom logic.

= Will this work with ACF or Metabox? =  
No, F4 handles field creation and storage independently using native WordPress methods.

== Screenshots ==

1. Admin Dashboard
2. Debug Panel for Manual Tests
3. Model Definition UI *(in progress)*

== Changelog ==

= 0.0.1 =
* Initial release
* Register models as CPTs based on post meta
* Add column/table management features
* Introduce admin debug panel

== Upgrade Notice ==

= 0.0.1 =
First release of the plugin. Use with caution in production.

== License ==

This plugin is licensed under the GPLv2 or later. See license.txt for details.
