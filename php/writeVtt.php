<?php
$str = $_POST['str'];
$file = $_POST['f'];
$file = file_put_contents("../data/".$file.".vtt",$str.PHP_EOL, FILE_APPEND | LOCK_EX);
?>