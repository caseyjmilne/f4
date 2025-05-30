# Model Settings Handling

Documenting everywhere that settings for models are handled in the codebase.

Current settings list:

1. Model Key (model_key) | unique model key
2. Type (type) | select from list of model types

## Model Routes

inc/ModelRoutes.php
21 mentions of model_key

## Model Controller 

inc/Model/ModelController.php

15 mentions of model_key. Inconsistent use of _model_key compared to ModelRoutes where it is "model_key". 

## Field Renderer

5 mentions of model key. Used in setting up meta boxes.

## Model Synchronizer

1 mention.

## Model Instance

inc/Front/ModelInstance / 4 mentions.

## Model Loader 

inc/Front/ModelLoader / 1 mention
