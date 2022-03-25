<?php
$str = $_POST['str'];
echo $str;
$file = file_put_contents("../data/test.vtt",$str.PHP_EOL, FILE_APPEND | LOCK_EX);
echo($file);
?>