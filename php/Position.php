<?php
class Position extends Mysqli {

    protected $json_folder = 'result';
    protected $images_folder = 'images';
    private $data;
    private $folder;
    private $index;

    public function __construct($data) {
        list($base, $pass, $user, $host ) = Config::DB_LIST;
        parent::__construct($host, $user, $pass, $base);
        if (mysqli_connect_error()) die(Config::DEFAULT_ERROR_MESSAGE . "Conexão");

        $this->data         = $data;
        $this->folder       = $data['folder'];
        $this->index        = $data['index'];
        $this->data['date'] = date('Y-m-d');

        # Tenta salvar os dados, caso dê errado remove-se o arquivo criado (caso tenha sido criado)
        if($file_name = $this->saveToFolder()){
            if(!$this->saveToDatabase()) {
                $this->removeFromFolder($file_name);
                $this->sendMessage(Config::DEFAULT_ERROR_MESSAGE . 'Falha no envio', 500);
            }
        } else {
            $this->removeFromFolder($file_name);
            $this->sendMessage(Config::DEFAULT_ERROR_MESSAGE . 'Falha na criação do arquivo', 500);
        }
    }

    public function removeFromFolder($filename){
        if (file_exists($file_name)) unlink($file_name);
    }

    public function sendMessage($message, $code){
        echo $message;
        http_response_code($code);
    }

    # Altera o estado de pronto da imagem no banco, para mostrar as imagens já alteradas e as faltantes
    public function saveToDatabase() {
        if($query = $this->prepare("UPDATE Images SET done = true WHERE folder = ? and index = ?")){
            if($query->bind_param('i', $this->folder, $this->index)){
                if($query->execute()){
                    return true;
                }
            }
        }
        return false;
    }

    # Salva ou 'atualiza' o json das posições, caso dê errado ele tenta novamente por até 5 vezes
    public function saveToFolder($tries = 0) {
        if($tries >= 5) return false;

        $file_name = "../{$this->json_folder}/{$this->folder}/{$this->index}.json";
        $this->removeFromFolder($file_name);

        $position_metadata = fopen($file_name, 'w');
        if(fwrite($position_metadata, json_encode($this->data))){
            if(fclose($position_metadata)){
                return $file_name;
            }
        }
        
        return $this->saveToFolder(++$tries);
    }
}
