<?php
$str = $_POST['str'];
$file = $_POST['f'];
$file = file_put_contents("../data/".$file,$str.PHP_EOL, FILE_APPEND | LOCK_EX);

//put contents $str to file $file


?>
