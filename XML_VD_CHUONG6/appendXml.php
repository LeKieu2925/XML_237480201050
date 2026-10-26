<?php
$doc = new DOMDocument();
$doc->load('danhsachlop.xml');
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

$studentName = "Nguyễn Hoàng Tiến";
$studentAge = "20";
$studentNganh = "Quản trị kinh doanh";

$root = $doc->getElementsByTagName('danhsach')->item(0);
$root->append("\t"); 
$sinhvien = $doc->createElement('sinhvien');
    $sinhvien->append("\n\t\t"); 
    $hoten = $doc->createElement('hoten', $studentName);
    $sinhvien->appendChild($hoten);
    
    $sinhvien->append("\n\t\t"); 
    $nganh = $doc->createElement('nganh', $studentNganh);
    $sinhvien->appendChild($nganh);
    
    $sinhvien->append("\n\t\t"); 
    $tuoi = $doc->createElement('tuoi', $studentAge);
    $sinhvien->appendChild($tuoi);
$sinhvien->append("\n\t"); 

$root->appendChild($sinhvien);
$root->append("\n"); 

$doc->save('danhsachlop.xml');
echo "File danhsachlop.xml has been successfully appended";
?>