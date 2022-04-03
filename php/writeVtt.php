<?php
$str = $_POST['str'];
$file = $_POST['f'];
$file = file_put_contents("../data/".$file,$str.PHP_EOL, FILE_APPEND | LOCK_EX);

$myfile = fopen("../data/".$file, "w") or die("Unable to open file!");
fwrite($myfile, $str);

fclose($myfile);

//put contents $str to file $file
?>
