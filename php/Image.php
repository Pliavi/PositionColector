<?php
require_once('Config.php');

class Image extends Mysqli {

    public function __construct() {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");
    }

    public function nextImage() { $_SESSION['index'] += 1; $this->getImage(); }
    public function lastImage() { $_SESSION['index'] -= 1; $this->getImage(); }

    public function getImage() {
        $id = $_SESSION['index'];

        $sql = "SELECT `id`, `folder`, `file_name`, `index` , `done_at` FROM Images WHERE `index` = ?";

        try{
            $query = $this->prepare($sql);
            $query->bind_param('i', $id);
            $query->execute();
            $query->bind_result($id, $folder, $file_name, $index, $done_at);
            $query->fetch();

            // $file_name = "../{$this->json_folder}/FULL/scene{$this->folder}/frame{$this->index}.json";
            // if (file_exists($file_name)){
            //     $positions = json_encode(file_get_contents($file_name));
            // }

            echo json_encode(
                [
                    'id' => $id,
                    'image' => Config::IMAGES_FOLDER . "/{$folder}/{$file_name}",
                    // 'positions' => $positions
                ]
            );
        }catch(Exception $e){
            echo $e;
        }
    }
}