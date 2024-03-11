<?php   
if ($_SERVER['REQUEST_METHOD']=='POST'){
    // Parse the JSON data from the POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $edited_content = $data['content'];
   // $userID = $data['userID'];

    $baseDirectory = "../users/";
    $fileName = $baseDirectory . $userID . '/edited_content.html';

    // Ensure the directory exists
    if (!file_exists($baseDirectory . $userID)) {
        mkdir($baseDirectory . $userID,  0755, true);
    }

    // Check if the file exists and write the content
    if (file_exists($fileName)) {
        if (file_put_contents($fileName, $edited_content) === false) {
            echo json_encode(['error' => 'Could not overwrite file']);
        } else {
            echo json_encode(['success' => 'Your theme customization has been updated successfully']);
        }
    } else {
        if (file_put_contents($fileName, $edited_content) === false) {
            echo json_encode(['error' => 'Could not create the file at the moment, please check back later']);
        } else {
            echo json_encode(['success' => 'Your theme customization has been set up successfully']);
        }
    }
}
?>
