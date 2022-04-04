<?php
$str = $_POST['str'];
$file = $_POST['f'];
//Appends text to file if it exists, otherwise creates a new file and writes text to it

//create file and write to it
$fh = fopen("../".$file, 'w') or die("can't open file");
fwrite($fh, $str);
fclose($fh);
$file = file_put_contents("../".$file, $str.PHP_EOL, LOCK_EX);

//put contents $str to file $file
?>  
