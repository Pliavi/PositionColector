<?php
include 'Config.php';
include 'Position.php';

// $data = $_POST['data'];

$data = [
  'folder' => 1,
  'index' => 1,
  'positions' => [
    'lhand' => [256, 256]
  ]
];

new Position($data);