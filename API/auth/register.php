<?php
/*
echo $_SERVER['HTTP_ACCEPT'].'<br>';
echo $_SERVER['HTTP_REFERER'].'<br>';
echo $_SERVER['REMOTE_ADDR'].'<br>';
echo $_SERVER['SCRIPT_NAME'].'<br>';
echo $_SERVER['REQUEST_URI'].'<br>';
echo $_SERVER['SERVER_PROTOCOL'].'<br>';
echo $_SERVER['HTTP_ACCEPT_LANGUAGE'].'<br>';
*/

function validate_input($data){
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    $data = addslashes($data);
    return $data;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require('entry.php');
    $jsonData = file_get_contents('php://input');
    $formData = json_decode($jsonData, true);

    if (!isset($formData['firstName'],$formData['lastName'],$formData['business'], $formData['email'], $formData['myPassword'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Incomplete data']);
        exit;
    }

    $first_name=(validate_input($formData['firstName']));
    $last_name=validate_input($formData['lastName']);
    $email=validate_input($formData['email']);
    $business=validate_input($formData['business']);
    $password=$formData['myPassword'];
    $password=password_hash($password,PASSWORD_DEFAULT);
    $username=$first_name." ".$last_name;

    require('../env/db_config.php');
    $register=$pdo->prepare("INSERT INTO users (`username`,`password`,`email`,`business`,`os`,`browser`) VALUES(?,?,?,?,?,?)");
    $register->execute([$username,$password,$email,$business,$browser_platform,$browser_name]);


    echo json_encode(['message' => 'Registration successful']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
}


?>