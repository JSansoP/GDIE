<?php
$str = $_POST['str'];
$file = $_POST['f'];
//Appends text to file if it exists, otherwise creates a new file and writes text to it
$file = file_put_contents("../data/".$file,$str.PHP_EOL, FILE_APPEND | LOCK_EX);

//put contents $str to file $file
?>
