import xml.dom.minidom
print("CHUONG TRINH TAO NUT FILE XML")
doc = xml.dom.minidom.parse("Myxml.xml")
newpertise = doc.createElement("expertise")
newpertise.setAttribute("name", "Pascal")
employee = doc.getElementsByTagName("employee")[0]
employee.appendChild(newpertise)
exp = doc.getElementsByTagName("expertise")
for node in exp:
    print(node.getAttribute("name"))
doc.toprettyxml()
print("Them thanh cong")