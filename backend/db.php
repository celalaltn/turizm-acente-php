<?php
$host = 'localhost';

if (isset($_SERVER['HTTP_HOST'])) {
    $hostHeader = $_SERVER['HTTP_HOST'];
    $isLocalHost = $hostHeader === 'localhost' || strncmp($hostHeader, 'localhost:', 10) === 0;
} else {
    $isLocalHost = false;
}

if ($isLocalHost) {
    $db   = 'turizm_db';
    $user = 'root';
    $pass = '';
} else {
    $db   = 'karanahsap_asr-turizm';
    $user = 'karanahsap_asr-user';
    $pass = 'Antalya07..';
}
$charset = 'utf8mb4';


$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
