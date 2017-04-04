<?php
class Image extends Mysqli {

    public function __construct() {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");
    }

    public function nextImage() { $_SESSION['index'] = $_SESSION['index'] + 1; $this->getImage(); }
    public function lastImage() { $_SESSION['index'] = $_SESSION['index'] - 1; $this->getImage(); }

    public function getImage() {
        $id = $_SESSION['index'];

        $sql = "SELECT `id`, `folder`, `file_name`, `index` , `done_at` FROM Images WHERE `index` = ?";

        try{
            $query = $this->prepare($sql);
            $query->bind_param('i', $id);
            $query->execute();
            $query->bind_result($id, $folder, $file_name, $index, $done_at);
            $query->fetch();
            echo json_encode(
                [
                    'id' => $id,
                    'image' => Config::IMAGES_FOLDER . "/{$folder}/{$file_name}"
                ]
            );
        }catch(Exception $e){
            echo $e;
        }
    }
}