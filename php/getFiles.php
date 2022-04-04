<?php
//return to javascript all directories in data folder
    $files = scandir("../Videos");
    $files = array_slice($files, 2);
    echo json_encode($files);
?>