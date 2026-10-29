"use strict";
// A. KHOI TAO BIEN DUNG CHUNG
const parser = new DOMParser();
let xmlDoc = null;                    // Tai lieu XML dang xu ly
let selectedFileName = "dulieu.xml";  // Ten file da chon
let recordTag = "";                   // Ten the ban ghi
let editingRecord = null;             // Ban ghi dang sua
let fieldNames = [];                  // Danh sach ten the du lieu
// Ham rut gon viec tim phan tu HTML theo id
const $ = id => document.getElementById(id);
// B. CAC HAM HO TRO XU LY XML
// Lay cac the con truc tiep cua mot phan tu
function getElementChildren(element) {
    return Array.from(element.children || []);
}
// Lay cac ban ghi nam truc tiep trong the goc
function getRecords() {
    return xmlDoc ? getElementChildren(xmlDoc.documentElement) : [];
}
// Lay ten cac the du lieu va loai bo ten trung nhau
function getAllFieldNames() {
    return [...new Set(
        getRecords().flatMap(record =>
            getElementChildren(record).map(child => child.tagName)
        )
    )];
}
// Kiem tra tai lieu XML co hop le hay khong
function isValidXML(doc) {
    return !!doc?.documentElement &&
        doc.getElementsByTagName("parsererror").length === 0;
}
// Lay noi dung the con theo ten the
function getChildText(record, tagName) {
    const child = getElementChildren(record)
        .find(node => node.tagName === tagName);

    return child ? child.textContent : "";
}
// Tao phan tu HTML, co the gan class va noi dung
function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}
// C. DOC FILE XML
function importXML() {
    const file = $("xml-file").files[0];
    // Kiem tra nguoi dung da chon file
    if (!file) {
        alert("Vui lòng chọn một file XML trước.");
        return;
    }
    const reader = new FileReader();
    // Xu ly sau khi doc xong file
    reader.onload = function () {
        const doc = parser.parseFromString(reader.result, "text/xml");
        // Kiem tra cu phap XML
        if (!isValidXML(doc)) {
            alert("File không đúng cú pháp XML.");
            return;
        }
        const records = getElementChildren(doc.documentElement);
        // The goc phai co it nhat mot ban ghi
        if (!records.length) {
            alert("Thẻ gốc không có bản ghi dữ liệu.");
            return;
        }
        // Luu tai lieu va thong tin file dang xu ly
        xmlDoc = doc;
        selectedFileName = file.name;
        recordTag = records[0].tagName;
        editingRecord = null;
        fieldNames = getAllFieldNames();
        // Cap nhat ten file va xoa tu khoa tim kiem cu
        $("file-info").textContent = "File đang dùng: " + file.name;
        $("search-input").value = "";
        cancelEdit();
        refreshDisplay();
        showMessage("Đã đọc file " + file.name + " thành công.");
    };
    // Bao loi neu khong doc duoc file
    reader.onerror = () => alert("Không thể đọc file XML.");
    // Doc file voi bang ma UTF-8
    reader.readAsText(file, "UTF-8");
}
// D. CAP NHAT THONG KE VA GIAO DIEN
function refreshDisplay() {
    if (!xmlDoc) return;
    fieldNames = getAllFieldNames();
    // Cap nhat tong ban ghi va so loai the
    $("total-records").textContent = getRecords().length;
    $("total-fields").textContent = fieldNames.length;
    // Hien thi cau truc XML dang su dung
    $("xml-structure").textContent =
        "Thẻ gốc: <" + xmlDoc.documentElement.tagName + "> | " +
        "Thẻ bản ghi: <" + recordTag + "> | " +
        "Các thẻ dữ liệu: " +
        (fieldNames.join(", ") || "không có");
    updateFieldFilter();
    buildForm();
    renderRecords();
}
// Tao danh sach loc theo ten cac the du lieu
function updateFieldFilter() {
    const select = $("field-filter");
    const oldValue = select.value;
    select.replaceChildren(
        createElement("option", "", "Tất cả thẻ dữ liệu")
    );
    select.options[0].value = "ALL";
    // Them tung ten the vao danh sach
    fieldNames.forEach(name => {
        const option = createElement("option", "", name);
        option.value = name;
        select.appendChild(option);
    });
    // Giu lua chon cu neu ten the van ton tai
    select.value = fieldNames.includes(oldValue) ? oldValue : "ALL";
}
// E. TAO FORM NHAP LIEU TU DONG
function buildForm(record = null) {
    const container = $("dynamic-fields");
    container.replaceChildren();
    // Moi ten the du lieu tao mot o nhap
    fieldNames.forEach(name => {
        const group = createElement("div", "form-group");
        const inputId = "field-" + name;
        const label = createElement("label", "", name + ":");
        const input = createElement("input");

        label.htmlFor = inputId;
        input.id = inputId;
        input.dataset.tag = name;
        input.type = "text";
        input.placeholder = "Nhập " + name;
        input.value = record ? getChildText(record, name) : "";
        input.maxLength = 1000;

        group.append(label, input);
        container.appendChild(group);
    });
    // Chi cho phep luu khi da doc file va co truong du lieu
    $("btn-save").disabled = !xmlDoc || !fieldNames.length;
}
// F. TIM KIEM, LOC VA HIEN THI BAN GHI
function renderRecords() {
    const list = $("record-list");
    list.replaceChildren();
    // Thong bao neu chua doc file XML
    if (!xmlDoc) {
        list.appendChild(createElement(
            "p", "empty", "Vui lòng chọn và đọc một file XML."
        ));
        return;
    }
    const keyword = $("search-input").value.trim().toLowerCase();
    const selectedField = $("field-filter").value;
    // Loc theo noi dung, thuoc tinh va ten the
    const records = getRecords().filter(record => {
        const textMatch =
            record.textContent.toLowerCase().includes(keyword) ||
            Array.from(record.attributes).some(attr =>
                (attr.name + " " + attr.value)
                    .toLowerCase().includes(keyword)
            );
        const fieldMatch = selectedField === "ALL" ||
            getElementChildren(record).some(
                child => child.tagName === selectedField
            );
        return textMatch && fieldMatch;
    });
    // Thong bao neu khong tim thay ban ghi
    if (!records.length) {
        list.appendChild(createElement(
            "p", "empty", "Không tìm thấy dữ liệu phù hợp."
        ));
        return;
    }
    // Tao khung hien thi cho tung ban ghi
    records.forEach((record, index) => {
        const card = createElement("div", "card");
        const id = record.getAttribute("id");
        // Hien thi ten the va id cua ban ghi
        card.appendChild(createElement(
            "div", "record-title",
            "<" + record.tagName + ">" +
            (id !== null
                ? " (id: " + id + ")"
                : " (bản ghi " + (index + 1) + ")")
        ));
        // Hien thi cac thuoc tinh cua ban ghi
        Array.from(record.attributes).forEach(attr => {
            const line = createElement("div", "field-line");
            line.append(
                createElement("span", "field-name", "@" + attr.name + ": "),
                document.createTextNode(attr.value)
            );
            card.appendChild(line);
        });
        // Hien thi cac the con, ke ca the long nhau
        getElementChildren(record).forEach(child => {
            const line = createElement("div", "field-line");
            line.appendChild(createElement(
                "span", "field-name", child.tagName + ": "
            ));
            if (getElementChildren(child).length) {
                // Goi ham de quy neu co the long nhau
                const nested = createElement("div");
                nested.style.marginLeft = "18px";
                nested.appendChild(renderNestedXML(child));
                line.appendChild(nested);
            } else {
                // Hien thi noi dung cua the khong co the con
                line.appendChild(document.createTextNode(child.textContent));
            }
            card.appendChild(line);
        });
        // Nut sua ban ghi
        const edit = createElement("button", "btn-edit", "Sửa");
        edit.onclick = () => editRecord(record);
        // Nut xoa ban ghi
        const del = createElement("button", "btn-delete", "Xóa");
        del.onclick = () => deleteRecord(record);
        card.append(edit, del);
        list.appendChild(card);
    });
}
// Hien thi cac the XML long nhau bang de quy
function renderNestedXML(element) {
    const wrapper = createElement("div");
    getElementChildren(element).forEach(child => {
        const line = createElement("div");
        line.appendChild(createElement(
            "span", "field-name", child.tagName + ": "
        ));
        if (getElementChildren(child).length) {
            // Goi lai chinh ham nay de hien thi cap long tiep theo
            line.appendChild(renderNestedXML(child));
        } else {
            line.appendChild(document.createTextNode(child.textContent));
        }
        wrapper.appendChild(line);
    });
    return wrapper;
}
// G. THEM MOI HOAC CAP NHAT BAN GHI
function saveRecord(event) {
    event.preventDefault();
    // Kiem tra dieu kien truoc khi luu
    if (!xmlDoc) {
        alert("Vui lòng chọn file XML trước.");
        return;
    }
    if (!fieldNames.length) {
        alert("Không tìm thấy thẻ dữ liệu để tạo biểu mẫu.");
        return;
    }
    // Thu thap gia tri tu cac o nhap lieu
    const values = {};
    document.querySelectorAll("#dynamic-fields input").forEach(input => {
        values[input.dataset.tag] = input.value.trim();
    });
    let record = editingRecord;
    // Neu khong sua ban ghi cu thi tao ban ghi moi
    if (!record) {
        record = xmlDoc.createElement(recordTag || "record");
        // Neu XML dang co id thi tao id tiep theo
        const records = getRecords();
        if (records.some(item => item.hasAttribute("id"))) {
            const ids = records
                .map(item => Number(item.getAttribute("id")))
                .filter(Number.isFinite);
            record.setAttribute("id", Math.max(0, ...ids) + 1);
        }
    }
    // Cap nhat the con hoac tao them the con moi
    fieldNames.forEach(name => {
        let child = getElementChildren(record)
            .find(node => node.tagName === name);
        if (!child) {
            child = xmlDoc.createElement(name);
            record.appendChild(child);
        }
        child.textContent = values[name] || "";
    });
    // Them ban ghi vao XML neu dang tao moi
    if (!editingRecord) {
        xmlDoc.documentElement.appendChild(record);
        showMessage("Đã thêm bản ghi mới.");
    } else {
        showMessage("Đã cập nhật bản ghi.");
    }
    cancelEdit();
    refreshDisplay();
}
// H. SUA VA HUY SUA BAN GHI
function editRecord(record) {
    editingRecord = record;

    // Dua du lieu cu vao form
    buildForm(record);

    $("form-title").textContent = "Cập nhật bản ghi";
    $("btn-save").textContent = "Lưu thay đổi";
    $("btn-save").className = "btn-edit";
    $("btn-cancel").hidden = false;

    // Cuon den khu vuc nhap lieu
    $("record-form").scrollIntoView({ behavior: "smooth" });
}
function cancelEdit() {
    editingRecord = null;
    // Dua form ve trang thai them moi
    $("form-title").textContent = "Thêm bản ghi";
    $("btn-save").textContent = "Thêm bản ghi";
    $("btn-save").className = "btn-add";
    $("btn-cancel").hidden = true;
    // Xoa gia tri cu khoi cac o nhap
    if (xmlDoc) buildForm();
}
// I. XOA BAN GHI
function deleteRecord(record) {
    const id = record.getAttribute("id");
    const label = id !== null ? " có id=" + id : "";
    // Xac nhan truoc khi xoa
    if (!confirm("Bạn có chắc muốn xóa bản ghi" + label + "?")) return;
    // Huy sua neu ban ghi dang bi xoa la ban ghi dang sua
    if (editingRecord === record) cancelEdit();
    // Xoa ban ghi khoi tai lieu XML
    record.parentNode.removeChild(record);
    refreshDisplay();
    showMessage("Đã xóa bản ghi.");
}
// J. XUAT VA TAI FILE XML
function downloadXML() {
    if (!xmlDoc) {
        alert("Vui lòng chọn và đọc file XML trước khi tải.");
        return;
    }
    // Chuyen tai lieu XML thanh chuoi
    const xmlText =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        new XMLSerializer().serializeToString(xmlDoc);
    // Tao file tam de trinh duyet tai xuong
    const blob = new Blob([xmlText], {
        type: "application/xml;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = createElement("a");
    link.href = url;
    // Dat ten file tai xuong theo ten file da chon
    link.download = selectedFileName.toLowerCase().endsWith(".xml")
        ? selectedFileName
        : selectedFileName + ".xml";
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Giai phong URL tam sau khi tai
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showMessage("Đã tải dữ liệu XML.");
}
// K. HIEN THI THONG BAO
function showMessage(message) {
    $("message").textContent = message;
}
