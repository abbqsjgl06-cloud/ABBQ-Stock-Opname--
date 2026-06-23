document.addEventListener("DOMContentLoaded", () => {

    const data = JSON.parse(localStorage.getItem("selectedHistory"));

    if (!data) {
        tampilNotif("Data tidak ditemukan", "error");
        return;
    }

    // =====================================
    // HEADER INFO
    // =====================================

    document.getElementById("judul").innerText =
        `${data.kategori || "-"} - ${data.type || "-"}`;

    document.getElementById("pic").innerText =
        data.pic || data.operator || "-";

    document.getElementById("tanggal").innerText =
        data.tanggal || "-";

    document.getElementById("waktu").innerText =
        data.waktuInput || data.timestamp || "-";

    // =====================================
    // TABLE DETAIL ITEM
    // =====================================

    const body = document.getElementById("detailBody");

    let html = "";

    (data.items || []).forEach((item, index) => {

        html += `
        <tr>
            <td>${item.nomor || index + 1}</td>
            <td>${item.kode || "-"}</td>
            <td>${item.item || "-"}</td>
            <td>${item.konv || "-"}</td>
            <td>${item.uom || "-"}</td>
            <td>${item.pcs_gr ?? 0}</td>
        </tr>
        `;
    });

    body.innerHTML = html;

});

// =====================================
// NOTIFIKASI
// =====================================
function tampilNotif(pesan, type = "success") {

    const notif = document.getElementById("notif");
    if (!notif) return;

    notif.className = "notif " + type;
    notif.innerText = pesan;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}
