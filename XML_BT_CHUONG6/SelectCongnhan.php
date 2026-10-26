<?php
$xml = simplexml_load_file('nhansu.xml') or die("Lỗi đọc file");
echo "<h2>THÔNG TIN NHÂN VIÊN MÃ SỐ 003</h2>";
foreach ($xml->congnhan as $cn) {
    if (trim($cn->maso) == "003") {
        echo "Mã số: " . $cn->maso . "<br>";
        echo "Họ tên: " . $cn->hoten . "<br>";
        echo "Đơn vị: " . $cn->donvi . "<br>";
        echo "Lương: " . $cn->luong . "<br>";
    }
}
?>