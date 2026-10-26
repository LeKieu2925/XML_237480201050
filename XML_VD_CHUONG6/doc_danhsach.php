<?php
$sxml = simplexml_load_file('danhsachlop.xml');
echo '<h2> DANH SÁCH SINH VIÊN </h2>';
$slist = $sxml->sinhvien;
for ($i = 0; $i < count($slist); $i++) {
    echo '<b> Họ tên:</b>'. $slist[$i]->hoten .'<br>';
    echo 'Tuổi: '. $slist[$i]->tuoi .'<br>';
    echo 'Ngành: '. $slist[$i]->nganh .'<br><br>';
}
?>