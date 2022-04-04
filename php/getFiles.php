<?php
//return to javascript all directories in data folder
    $files = scandir("../videos");
    $files = array_slice($files, 2);
    echo json_encode($files);
?>