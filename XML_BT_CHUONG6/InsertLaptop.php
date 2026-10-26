<?php
$doc = new DOMDocument();
$doc->load('Laptop.xml');
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

$root = $doc->getElementsByTagName('laptops')->item(0);

$laptop = $doc->createElement('laptop');

$name = $doc->createElement('name', 'Asus 2021');
$laptop->appendChild($name);

$cpu = $doc->createElement('donvi', 'Core i5 3.0Ghz');
$laptop->appendChild($cpu);

$ram = $doc->createElement('ram', '16GB');
$laptop->appendChild($ram);

$root->appendChild($laptop);
$doc->save('Laptop.xml');

echo "Thêm laptop Asus 2021 thành công!";
?>