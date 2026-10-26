<?php
$doc = new DOMDocument();
$doc->load('nhansu.xml');
echo "<h2>CÁC THẺ TRONG TẬP TIN NHANSU.XML</h2>";
$elements = $doc->getElementsByTagName('*');
foreach ($elements as $element) {
    echo "Tên thẻ: <b>" . $element->nodeName . "</b> - Giá trị: " . $element->nodeValue . "<br>";
}
?>