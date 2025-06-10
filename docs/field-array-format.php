<?php 

$field = [
  'key' => 'property_price',
  'name' => 'price',
  'label' => 'Price',
  'type' => 'number', // maps to FieldNumber::class
  'default' => 0,
  'required' => true,
  'min' => 0,
  'max' => 1000000,
  'step' => 1,
  'instructions' => 'Set the price in USD',
  'conditions' => [], // optional conditional display rules
];
