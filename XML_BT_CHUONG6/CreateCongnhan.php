<?php
$dom = new DOMDocument();
$dom->encoding = 'utf-8';
$dom->xmlVersion = '1.0';
$dom->formatOutput = true;
$file_name = 'nhansu.xml';

$root = $dom->createElement('danhsach');

$data = [
    ["001", "Nguyễn Thế Anh", "Hành chính", "5.000.000"],
    ["002", "Nguyễn Thanh Bình", "Kỹ thuật", "7.000.000"],
    ["003", "Vương Thúy Phượng", "Tổ chức", "8.000.000"]
];

foreach ($data as $row) {
    $cn = $dom->createElement('congnhan');
    
    $maso = $dom->createElement('maso', $row[0]);
    $cn->appendChild($maso);
    
    $hoten = $dom->createElement('hoten', $row[1]);
    $cn->appendChild($hoten);
    
    $donvi = $dom->createElement('donvi', $row[2]);
    $cn->appendChild($donvi);
    
    $luong = $dom->createElement('luong', $row[3]);
    $cn->appendChild($luong);
    
    $root->appendChild($cn);
}

$dom->appendChild($root);
$dom->save($file_name);
echo "Tạo file $file_name thành công!";
?>