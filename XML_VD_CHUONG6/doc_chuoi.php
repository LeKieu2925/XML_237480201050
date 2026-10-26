<?php
$vídu = 
"<mail>
    <hello>Xin chao</hello>
    <body>Lap trinh PHP!</body>
</mail>";
$vídu2 = simplexml_load_string($vídu) or die("Lỗi");
print_r($vídu2);
?>