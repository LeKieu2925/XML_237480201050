<?php
$xml = simplexml_load_file('danhsachlop.xml');
$doc = new DOMDocument();
$doc->load('danhsachlop.xml');
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

// Giá trị tìm kiếm để cập nhật
$searchName = "Huỳnh Trâm Anh";
$newName = "Huỳnh Huy Tuấn";
$newAge = "52";
$newNganh = "Khoa học máy tính";

$tenMoi = $doc->createElement('hoten', $newName);
$tuoiMoi = $doc->createElement('tuoi', $newAge);
$nganhMoi = $doc->createElement('nganh', $newNganh);

$root = $doc->getElementsByTagName('danhsach')->item(0);
$list = $xml->sinhvien;

echo '<h2> CẬP NHẬT SINH VIÊN </h2>';
for ($i = 0; $i < count($list); $i++) {
    if($list[$i]->hoten == $searchName){
        echo '<b> Họ tên: </b>'. $list[$i]->hoten .'<br>';
        $sinhvien = $doc->getElementsByTagName('sinhvien')->item($i);
        $hoten = $doc->getElementsByTagName('hoten')->item($i);
        $tuoi = $doc->getElementsByTagName('tuoi')->item($i);
        $nganh = $doc->getElementsByTagName('nganh')->item($i);

        $sinhvien->replaceChild($tenMoi, $hoten); 
        $sinhvien->replaceChild($tuoiMoi, $tuoi); 
        $sinhvien->replaceChild($nganhMoi, $nganh); 
    }
}

$doc->save('danhsachlop.xml');
echo "Tập tin danhsachlop.xml đã cập nhật thành công";
?>