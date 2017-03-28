<?php
class Config {
    const DEV_EMAIL = 'pliavi.contato@gmail.com';
    const DEFAULT_ERROR_MESSAGE = 'Não foi possível enviar os dados, informe o desenvolvedor: ' . self::DEV_EMAIL . '. err:';

    const DB_HOST = 'localhost';
    const DB_USER = 'root';
    const DB_PASS = '';
    const DB_BASE = 'PositionColector';
    const DB_LIST = [ self::DB_BASE, self::DB_PASS, self::DB_USER, self::DB_HOST ];
}

session_start();
