<?php
$a = simplexml_load_file("mess01.xml") or die("Lỗi");
echo $a->hello . "<br>";
echo $a->body . "<br>";
?>