<?php
$xml = simplexml_load_file('nhansu.xml') or die("Lỗi đọc file");
echo "<h2>DANH SÁCH CÔNG NHÂN</h2>";
foreach ($xml->congnhan as $cn) {
    echo "Mã số: " . $cn->maso . "<br>";
    echo "Họ tên: " . $cn->hoten . "<br>";
    echo "Đơn vị: " . $cn->donvi . "<br>";
    echo "Lương: " . $cn->luong . "<br><hr>";
}
?>