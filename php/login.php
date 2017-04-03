<?php
session_start();
session_unset();

$_SESSION['volunteer'] = $_POST['volunteer'];
$_SESSION['index'] = 1;

if(empty($_SESSION['volunteer'])){
  $_SESSION['volunteer'] = "Anônimo";
}

header('Location: ../player.html');