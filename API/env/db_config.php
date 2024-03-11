<?php 
$db_name = "cms";
$db_password="";
$db_user="root";
$db_host="localhost";

try{
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['Error: ' . $e->getMessage()]);
}
?>