import xml.etree.ElementTree as ET

# Doc file Computer.xml
tree = ET.parse("Computer.xml")

# Lay nut goc
root = tree.getroot()

# Nhap ten may tinh can xoa
ten_can_xoa = input("Nhap ten may tinh can xoa: ")

# Bien kiem tra
tim_thay = False

# Duyet danh sach computer
for computer in root.findall("computer"):
    name = computer.find("name").text.strip()

    # Kiem tra ten may tinh
    if name.lower() == ten_can_xoa.lower():
        root.remove(computer)
        tim_thay = True
        break

# Luu lai file XML neu tim thay
if tim_thay:
    tree.write("Computer.xml", encoding="utf-8",
               xml_declaration=True)
    print("Da xoa may tinh thanh cong!")
else:
    print("Khong tim thay may tinh can xoa!")
