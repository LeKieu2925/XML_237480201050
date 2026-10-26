<?php
$xml = simplexml_load_file('sinhvien.xml') or die("Không thể mở file sinhvien.xml");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Danh sách sinh viên</title>
    <style>
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h2 style="text-align: center;">DANH SÁCH MÔN HỌC / SINH VIÊN</h2>
    <table>
        <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Tên môn học / Tên sinh viên</th>
            <th>Ngày sinh</th>
            <th>Thành phố</th>
        </tr>
        <?php
        $stt = 1;
        foreach ($xml->student as $sv) {
            echo "<tr>";
            echo "<td>" . $stt++ . "</td>";
            echo "<td>" . trim($sv->id) . "</td>";
            echo "<td style='text-align: left; padding-left: 15px;'>" . trim($sv->name) . "</td>";
            echo "<td>" . trim($sv->date) . "</td>";
            echo "<td>" . trim($sv->city) . "</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>