<?php
class Image extends Mysqli {

    public function __construct() {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");
    }

    public function nextImage() { $id = ++$_SESSION['id'] or 1; $this->getImage($id); }
    public function lastImage() { $id = --$_SESSION['id'] or 1; $this->getImage($id); }

    public function getImage($id) {
        $sql = "SELECT id, folder, file_name, done_at FROM Images WHERE id = ?";

        $query = $this->prepare($sql);
        if(!is_null($id)){
            $query->bind_param('i', $id) ;
            if($query->execute()){
                $query->bind_result($id, $folder, $file_name, $done_at);
                $query->fetch();
                echo json_encode([
                    'id' => $id, 
                    'folder' => $folder, 
                    'file_name' => $file_name, 
                    'done_at' => $done_at
                ]);
            }
        }
    }
}