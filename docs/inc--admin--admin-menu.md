# AdminMenu Class

**Namespace:** `F4\Admin`

## Description

The `AdminMenu` class is responsible for registering the F4 plugin's admin menu pages and managing asset loading for the plugin's React-based dashboard.

It hooks into WordPress actions to:

- Register the main plugin dashboard and a debug submenu.
- Conditionally enqueue React build assets on the plugin's admin page.

## Methods

### `__construct()`

- Hooks into `admin_menu` to register plugin menus.
- Hooks into `admin_enqueue_scripts` to conditionally enqueue React assets.

### `registerMenus()`

- Registers the main menu page titled "F4 Dashboard" with the capability `manage_options`.
- Registers a "Debug" submenu page under the main dashboard menu.
- Uses `add_menu_page` and `add_submenu_page` WordPress functions.

### `renderDashboard()`

- Outputs the container `<div id="f4-app-manager"></div>` for mounting the React dashboard app.

### `maybeEnqueueReactAssets($hook)`

- Checks if the current admin page is the plugin dashboard (`toplevel_page_f4_dashboard`).
- If yes, uses `ReactBuildIntegration` to enqueue React JS and CSS assets.

**Parameters:**

- `$hook` (`string`): The current admin page hook suffix provided by WordPress.

## Usage Example

```php
use F4\Admin\AdminMenu;

new AdminMenu();
