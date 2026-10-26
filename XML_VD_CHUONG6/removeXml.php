<?php
$xml = simplexml_load_file('danhsachlop.xml');
$doc = new DOMDocument();
$doc->load('danhsachlop.xml');
$doc->preserveWhiteSpace = true;
$doc->formatOutput = true;

// Giá trị tìm kiếm để xóa
$removeName = "Nguyễn Hoàng Tiến";
$root = $doc->getElementsByTagName('danhsach')->item(0);
$list = $xml->sinhvien;

echo '<h2> XÓA SINH VIÊN </h2>';
for ($i = 0; $i < count($list); $i++) {
    if($list[$i]->hoten == $removeName){
        echo '<b> Họ tên: </b>'. $list[$i]->hoten .'<br>';
        $sinhvien = $doc->getElementsByTagName('sinhvien')->item($i);
        $root->removeChild($sinhvien); 
    }
}

$doc->save('danhsachlop.xml');
echo "Đã xóa sinh viên $removeName.";
?>