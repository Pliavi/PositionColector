<?php
require_once('Config.php');
require_once('Image.php');
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'];
$image = new Image;

switch($action){
    case 'next':
        $image->nextImage();
        break;
    case 'last':
        $image->lastImage();
        break;
    case 'actual':
        $image->getImage();
        break;
}