<?php
$dom = new DOMDocument();
$dom->encoding = 'utf-8';
$dom->xmlVersion = '1.0';
$dom->formatOutput = true;
$file_name = 'Laptop.xml';

$root = $dom->createElement('laptops');

$laptops = [
    ["Dell Inpiron 2020", "Core i5 2.6Ghz", "8GB"],
    ["Lenovo ThinPack 2022", "Core i7 3.6Ghz", "16GB"]
];

foreach ($laptops as $lap) {
    $item = $dom->createElement('laptop');
    
    $name = $dom->createElement('name', $lap[0]);
    $item->appendChild($name);
    
    $cpu = $dom->createElement('donvi', $lap[1]); // Đề ghi thẻ donvi cho cpu
    $item->appendChild($cpu);
    
    $ram = $dom->createElement('ram', $lap[2]);
    $item->appendChild($ram);
    
    $root->appendChild($item);
}

$dom->appendChild($root);
$dom->save($file_name);
echo "Tạo file Laptop.xml thành công!";
?>