<?php
$doc = new DOMDocument();
$doc->load('Laptop.xml');
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

$oldName = "Dell Inpiron 2020";
$newName = "Toshiba 2021";
// Tạo phần tử tên mới
$nameMoi = $doc->createElement('name', $newName);
// Lấy danh sách tất cả các thẻ laptop
$laptopList = $doc->getElementsByTagName('laptop');
for ($i = 0; $i < $laptopList->length; $i++) {
    $laptopNode = $laptopList->item($i);
    $nameNode = $laptopNode->getElementsByTagName('name')->item(0);
    // Kiểm tra nếu tên khớp với cần tìm thì tiến hành thay thế
    if ($nameNode && trim($nameNode->nodeValue) == $oldName) {
        $laptopNode->replaceChild($nameMoi, $nameNode);
        break; // Thoát vòng lặp sau khi cập nhật xong
    }
}
$doc->save('Laptop.xml');
echo "Cập nhật tên laptop thành công!";
?>