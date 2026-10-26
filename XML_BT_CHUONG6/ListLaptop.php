<?php
$xml = simplexml_load_file('Laptop.xml') or die("Lỗi đọc file");
echo "<h2>DANH SÁCH LAPTOP</h2>";
$i = 1;
foreach ($xml->laptop as $lap) {
    echo "$i. name: " . $lap->name . "<br>";
    echo "&nbsp;&nbsp;&nbsp;&nbsp;cpu: " . $lap->donvi . "<br>";
    echo "&nbsp;&nbsp;&nbsp;&nbsp;Ram: " . $lap->ram . "<br><br>";
    $i++;
}
?>