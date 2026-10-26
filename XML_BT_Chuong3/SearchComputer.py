import xml.etree.ElementTree as ET
# Doc file Computer.xml
tree = ET.parse("Computer.xml")

# Lay nut goc
root = tree.getroot()

# Nhap ten may tinh can tim
ten_can_tim = input("Nhap ten may tinh can tim: ")

# Bien kiem tra
tim_thay = False

# Duyet danh sach computer
for computer in root.findall("computer"):
    name = computer.find("name").text.strip()
    cpu = computer.find("cpu").text.strip()
    ram = computer.find("ram").text.strip()

    # Kiem tra ten may tinh
    if ten_can_tim.lower() in name.lower():
        print("Ten may tinh:", name)
        print("CPU:", cpu)
        print("RAM:", ram)
        print()

        tim_thay = True

# Thong bao ket qua
if not tim_thay:
    print("Khong tim thay may tinh!")
