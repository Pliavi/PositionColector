<?php
require_once 'Config.php';

class Position extends Mysqli {

    private $data;
    private $folder;
    private $json_folder = Config::JSON_FOLDER;
    private $images_folder = Config::IMAGES_FOLDER;
    private $index;
    private $date;
    private $volunteer;

    public function __construct($data) {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");

        $this->data              = $data;
        $this->folder            = $_SESSION['folder'];
        $this->index             = $_SESSION['index'];
        $this->data['index']     = $this->index;
        $this->data['date']      = date('Y-m-d');
        $this->date              = $this->data['date'];
        $this->data['volunteer'] = $_SESSION['volunteer'];      
        $this->volunteer         = $this->data['volunteer'];

        # Tenta salvar os dados, caso dê errado remove-se o arquivo criado (caso tenha sido criado)
        if($file_name = $this->saveToFolder()){
            if(!$this->saveToDatabase()) {
                $this->sendMessage(Config::DEFAULT_ERROR_MESSAGE . 'Falha no envio'.$this->error, 500);
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
        if($query = $this->prepare("UPDATE Images SET done_at = ? WHERE `index` = ?")){
            $date = date('Y-m-d H:i:s');
            if($query->bind_param('si', $date, $this->index)){
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
