<?php
$xml = simplexml_load_file('Laptop.xml');
$doc = new DOMDocument();
$doc->load('Laptop.xml');
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

$removeName = "Asus 2021";
$root = $doc->getElementsByTagName('laptops')->item(0);

// Lấy tất cả các thẻ laptop bằng DOMDocument trực tiếp để dễ xóa
$laptopList = $doc->getElementsByTagName('laptop');

// Duyệt ngược từ dưới lên để tránh lỗi dịch chuyển index khi xóa node
for ($i = $laptopList->length - 1; $i >= 0; $i--) {
    $laptopNode = $laptopList->item($i);
    // Kiểm tra xem thẻ name con bên trong có khớp với tên cần xóa không
    $nameNode = $laptopNode->getElementsByTagName('name')->item(0);
    
    if ($nameNode && trim($nameNode->nodeValue) == $removeName) {
        $root->removeChild($laptopNode);
    }
}

$doc->save('Laptop.xml');
echo "Đã xóa laptop $removeName thành công!";
?>