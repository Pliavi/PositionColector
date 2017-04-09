<?php
require_once('Config.php');
require_once('Position.php');

# Isso é porque JSON não é recebido pela $_POST
$data = json_decode(file_get_contents('php://input'), true);
// print_r($data);exit;

new Position($data);