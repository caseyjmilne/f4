
# AddPropertyForm Component Documentation

## Overview

`AddPropertyForm` is a React component that renders a modal form for adding a new property (field) to a model. It dynamically loads field types and their configurable settings from an API, allowing users to specify the property key, name, type, and additional settings.

## Imports

```js
import { useEffect, useState } from 'react';
import Modal from './Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../api/field';
```

- React hooks for state and lifecycle management.
- `Modal` component to display the form as a popup.
- `FieldSettingsForm` to render field-specific settings inputs.
- API functions to fetch available field types and their details.

## Props

| Prop       | Type       | Description                                              |
|------------|------------|----------------------------------------------------------|
| `parentId` | `number`   | Optional parent property ID (default 0) for nested fields. |
| `onSubmit` | `function` | Callback to receive the new property data on form submit.|
| `onCancel` | `function` | Callback to close/cancel the form modal.                 |

## State Variables

| State Variable   | Initial Value | Purpose                                              |
|------------------|---------------|-----------------------------------------------------|
| `key`            | `''`          | The machine-readable property key.                   |
| `name`           | `''`          | The human-readable property name.                    |
| `type`           | `'text'`      | Selected field type (e.g., text, number, radio).     |
| `fieldOptions`   | `[]`          | Available field types fetched from API.              |
| `fieldSettings`  | `{}`          | Supported settings metadata for selected field type.|
| `settings`       | `{}`          | Current settings values for the property.            |

## Lifecycle Effects

- On mount, fetch available field types (`fetchFieldTypes`) and set them in `fieldOptions`.
- When `type` changes, fetch detailed settings support for the selected type (`fetchFieldTypeDetails`) and initialize supported settings in `settings`.

## Event Handlers

- `handleSubmit`: Prevents default form submit, invokes `onSubmit` with composed property data (`key`, `name`, `type`, `settings`, and `parent_id`), then resets form fields.

## Render

- Renders a `Modal` containing:
  - Select dropdown for field `type`.
  - Text inputs for `key` and `name`.
  - `FieldSettingsForm` for dynamic additional settings.
  - Buttons for "Cancel" and "Add Property".

---

# ModelProperties Component Analysis

`ModelProperties` is a React component managing the properties of a selected model. It handles loading, adding, editing, deleting, and reordering properties, and conditionally renders modals for adding, editing, and deleting.

## Key Responsibilities

- Fetches properties for the `selectedModelId` on change.
- Maintains local state for properties, modal visibility, and currently selected or deleted property.
- Provides handlers for adding, deleting, editing, and reordering properties.
- Renders the list via `PropertyList` and modals via `AddPropertyForm`, `EditPropertyForm`, and `Modal`.

## Relation to AddPropertyForm

- The `handleAddProperty` function defined in `ModelProperties` is passed as the `onSubmit` prop to the `AddPropertyForm`.
- This means when a user submits the form in `AddPropertyForm`, the data bubbles up to `ModelProperties` which performs the API call to create the property and updates the local state.
- The modal for adding a property (`AddPropertyForm`) is conditionally rendered in `ModelProperties` based on `showAddPropertyModal` state.

## Summary Flow

1. User clicks "+ Property" button in `ModelProperties`, toggling `showAddPropertyModal` to `true`.
2. `AddPropertyForm` modal opens.
3. User fills form and submits.
4. `AddPropertyForm` calls `onSubmit` → `handleAddProperty` in `ModelProperties`.
5. `handleAddProperty` calls API `createProperty` and updates local state.
6. Modal closes on successful add.

---

# Summary

- `AddPropertyForm` is a controlled modal form component for adding properties.
- `ModelProperties` is the parent component managing properties and handling CRUD operations.
- The property addition flow originates in `ModelProperties` and uses `AddPropertyForm` to collect user input.
