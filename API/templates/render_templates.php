<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dir = "c://xampp/htdocs/CMS/API/templates/img_templates/*";
    echo json_encode($dir);
    $files = glob($dir);


    //check the number available themes
echo json_encode(["Number of files found: " . count($files) . "<br> \n"]);

    $file = fopen('iframe_sources.js', 'w');
    if ($file === false) {
        echo json_encode(["Error: Failed to open the file."]);
    } else {
        echo json_encode(["File opened successfully.<br> \n"]);
        fwrite($file, "function setIframeSources() {\n");
        foreach (glob($dir) as $filepath) {
            $filename = basename($filepath);

            //check processing stages
            echo json_encode(["Processing file: $filename<br> \n"]);
            echo json_encode(["Creating iframe for $filename<br> \n"]);
            echo json_encode(["Appending iframe to section<br> \n"]);
            echo json_encode(["Processing file: $filename<br> \n"]);
            fwrite($file, " var section = document.getElementById('themes');\n");
            fwrite($file, " var img = document.createElement('img');\n");
            fwrite($file, " var overlay = document.createElement('div');\n");
            fwrite($file, " overlay.classList.add('overlay--container');\n");
            fwrite($file, " img.src = '../API/templates/img_templates/$filename';\n");
            fwrite($file, " overlay.appendChild(img);\n");
            fwrite($file, " section.appendChild(overlay);\n");

        }
        fwrite($file, "}\n");
        fwrite($file, " document.addEventListener('DOMContentLoaded', setIframeSources);\n");

        //close file writing
        fclose($file);
        echo json_encode("File written and closed successfully.");
    }
}
?>
