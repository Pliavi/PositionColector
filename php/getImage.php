<?php
require_once('Config.php');
require_once('Image.php');
$action = $_GET['action'];

$image = new Image;

$_SESSION['id'] = 0;

switch($action){
    case 'next':
        $image->nextImage();
        break;
}