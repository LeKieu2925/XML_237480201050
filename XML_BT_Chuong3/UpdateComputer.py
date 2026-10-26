import xml.etree.ElementTree as ET
# Doc file Computer.xml
tree = ET.parse("Computer.xml")

# Lay nut goc
root = tree.getroot()

# Nhap ten may tinh can sua
ten_can_sua = input("Nhap ten may tinh can sua: ")

# Bien kiem tra
tim_thay = False

# Duyet danh sach computer
for computer in root.findall("computer"):
    name = computer.find("name").text.strip()

    # Kiem tra ten may tinh
    if name.lower() == ten_can_sua.lower():

        # Nhap thong tin moi
        ten_moi = input("Nhap ten moi: ")
        cpu_moi = input("Nhap CPU moi: ")
        ram_moi = input("Nhap RAM moi: ")

        # Cap nhat thong tin
        computer.find("name").text = ten_moi
        computer.find("cpu").text = cpu_moi
        computer.find("ram").text = ram_moi

        tim_thay = True
        break

# Luu lai file XML neu tim thay
if tim_thay:
    tree.write("Computer.xml", encoding="utf-8",
               xml_declaration=True)
    print("Da cap nhat may tinh thanh cong!")
else:
    print("Khong tim thay may tinh can sua!")
