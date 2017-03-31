<?php
require_once 'Image.php';

class Position extends Mysqli {

    protected $json_folder = 'results';
    protected $images_folder = 'images';
    private $data;
    private $folder;
    private $index;
    private $date;
    private $volunteer;

    public function __construct($data) {
        session_start();
        $image = new Image;
        $_SESSION['id'] = 1;

        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");

        $this->data          = $data;
        $this->folder        = $data['folder'];
        $this->index         = $_SESSION['id'];
        $this->data['index'] = $this->index;
        $this->data['date']  = date('Y-m-d');
        $this->date          = $this->data['date'];
        $this->volunteer     = $this->data['volunteer'];;

        # Tenta salvar os dados, caso dê errado remove-se o arquivo criado (caso tenha sido criado)
        if($file_name = $this->saveToFolder()){
            if($this->saveToDatabase()) {
                $image->nextImage();
            } else {
                $this->sendMessage(Config::DEFAULT_ERROR_MESSAGE . 'Falha no envio', 500);
            }
        } else {
            $this->sendMessage(Config::DEFAULT_ERROR_MESSAGE . 'Falha na criação do arquivo', 500);
        }
    }

    public function removeFromFolder($file_name){
        if (file_exists($file_name)) unlink($file_name);
    }

    public function sendMessage($message, $code){
        echo $message;
        http_response_code($code);
    }

    # Altera o estado de pronto da imagem no banco, para mostrar as imagens já alteradas e as faltantes
    public function saveToDatabase() {
        if($query = $this->prepare("UPDATE Images SET done_at = ? WHERE id = ?")){
            if($query->bind_param('si', date('Y-m-d H:i:s'), $this->index)){
                if($query->execute()){
                    return true;
                }
            }
        }

        return false;
    }

    # Salva ou 'atualiza' o json das posições, caso dê errado ele tenta novamente por até 5 vezes
    public function saveToFolder($tries = 0) {
        $result = false;
        if($tries >= 5) return false; # 5 tentativas
        
        # FULL data
        if(!is_dir("../{$this->json_folder}/FULL/scene{$this->folder}")){
            mkdir("../{$this->json_folder}/FULL/scene{$this->folder}", 0777, true);
        }
        $file_name = "../{$this->json_folder}/FULL/scene{$this->folder}/frame{$this->index}.json";
        $this->removeFromFolder($file_name);
        $position_metadata = fopen($file_name, 'w');
        if(fwrite($position_metadata, json_encode($this->data))){
            if(fclose($position_metadata)){
                $result = true;
            }
        }

        # RAW data
        if(!is_dir("../{$this->json_folder}/RAW/scene{$this->folder}")){
            mkdir("../{$this->json_folder}/RAW/scene{$this->folder}", 0777, true);
        }
        $file_name_RAW = "../{$this->json_folder}/RAW/scene{$this->folder}/frame{$this->index}_{$this->volunteer}_{$this->date}.json";
        $this->removeFromFolder($file_name_RAW);
        $raw = $this->data['positions'];

        $position_metadata = fopen($file_name_RAW, 'w');
        if(fwrite($position_metadata, json_encode(array_values($raw)))){
            $result = $result && fclose($position_metadata);
        }
        
        if($result){
            return true;
        } else {
            return $this->saveToFolder(++$tries);
        }
    }
}
