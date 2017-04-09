<?php
require_once('Config.php');

class Image extends Mysqli {

    public function __construct() {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");
    }

    public function nextImage() { $_SESSION['action'] = 'next'; $_SESSION['index'] += 1; $this->getImage(); }
    public function lastImage() { $_SESSION['action'] = 'last'; $_SESSION['index'] -= 1; $this->getImage(); }

    public function getImage() {
        $_SESSION['action'] = @($_SESSION['action']) ? : 'actual';
        $id = $tmpid = $_SESSION['index'];
        $limit = false;

        $sql = "SELECT `id`, `folder`, `file_name`, `index` , `done_at` FROM Images WHERE `index` = ? AND `folder` = ?";
        
        $query = $this->prepare($sql) or ($limit = true);
        $query->bind_param('is', $id, $_SESSION['folder']) or ($limit = true);
        $query->execute() or ($limit = true);
        $query->bind_result($id, $folder, $image_file, $index, $done_at) or ($limit = true);
        $query->fetch() or ($limit = true);

        $positions = [];
        $file_name = '../' . Config::JSON_FOLDER . '/FULL/' . $folder . '/frame' . $index . '.json';
        if (file_exists($file_name)){
            $file = file_get_contents($file_name);
            $data = json_decode($file);
            $positions = json_encode($data->positions);
        }

        if(!$limit){
            echo json_encode(
                [
                    'id' => $id,
                    'image' => Config::IMAGES_FOLDER . "/{$folder}/{$image_file}",
                    'positions' => $positions
                ]
            );
        } else if($_SESSION['action'] == 'next') {
            echo json_encode( [ 'limit' => '>' ] );
            $_SESSION['index'] -= 1;            
        } else if($_SESSION['action'] == 'last'){
            echo json_encode( [ 'limit' => '<' ] );
            $_SESSION['index'] += 1;
        }
    }
}