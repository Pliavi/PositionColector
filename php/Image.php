<?php
class Image {

    public function nextImage(){
        session_start();
        $sql = "SELECT * FROM Images WHERE id = ?";
        $id = $_SESSION['$id'];
        
        if(!is_null($id)
        && $query = $this->prepare($sql) 
        && $query->bind_param('i', $id) 
        && $query->execute()) {
            return json_encode($query->fetch_object()[0]);
        }
    }
}