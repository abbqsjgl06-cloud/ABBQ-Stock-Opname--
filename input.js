// =====================================
// INPUT.JS FINAL (STABIL + CLEAN)
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // AMBIL DATA AKTIF
    // ======================
    const activeStock =
        JSON.parse(localStorage.getItem("activeStock")) || {};

    const kategori =
        activeStock.kategori || localStorage.getItem("kategori") || "";

    const type =
        activeStock.type || localStorage.getItem("type") || "";

    const tanggal =
        activeStock.tanggal || localStorage.getItem("tanggal") || "";

    const pic =
        activeStock.pic || activeStock.operator || "-";

    // VALIDASI
    if (!kategori || !type || !tanggal) {
        tampilNotif("Data tidak lengkap", "error");
        return;
    }

    // ======================
    // JUDUL HALAMAN
    // ======================
    const judul = document.getElementById("judulHalaman");
    if (judul) {
        judul.innerText = `${kategori} - ${type} - ${tanggal}`;
    }

    // ======================
    // DATABASE SELECTOR
    // ======================
    let databaseFile = "";

    if (kategori === "Kitchen" && type === "Daily") {
        databaseFile = "database/daily_kitchen.json";
    }
    else if (kategori === "Frontliner" && type === "Daily") {
        databaseFile = "database/daily_frontliner.json";
    }
    else if (kategori === "Kitchen" && type === "WM") {
        databaseFile = "database/wm_kitchen.json";
    }
    else if (kategori === "Frontliner" && type === "WM") {
        databaseFile = "database/wm_frontliner.json";
    }

    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;

    if (!databaseFile) {
        tampilNotif("Kategori/Type tidak valid", "error");
        return;
    }

    // ======================
    // LOAD DATABASE
    // ======================
    fetch(databaseFile)
        .then(res => {
            if (!res.ok) throw new Error("Database error");
            return res.json();
        })
        .then(data => {

            let html = "";

            data.forEach((item, index) => {
                html += `
                <tr>
                    <td>${item.nomor}</td>
                    <td>${item.kode}</td>
                    <td>${item.item}</td>
                    <td>${item.konv}</td>
                    <td>${item.uom}</td>
                    <td>
                        <input type="number"
                               class="qty-input"
                               id="qty_${index}"
                               value="0"
                               min="0">
                    </td>
                </tr>
                `;
            });

            tableBody.innerHTML = html;
        })
        .catch(err => {
            console.log(err);
            tampilNotif("Gagal load database", "error");
        });

    // simpan global meta
    window._stockMeta = { kategori, type, tanggal, pic };

});


// =====================================
// WAKTU REALTIME
// =====================================
function getWaktuInput() {
    const now = new Date();
    return now.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}


// =====================================
// SIMPAN DATA
// =====================================
function simpanData() {

    const tableBody = document.getElementById("tableBody");

    if (!tableBody || tableBody.querySelectorAll("tr").length === 0) {
        tampilNotif("Data belum dimuat", "error");
        return;
    }

    const meta = window._stockMeta || {};

    let items = [];

    tableBody.querySelectorAll("tr").forEach((row, index) => {

        items.push({
            nomor: Number(row.cells[0].innerText),
            kode: row.cells[1].innerText,
            item: row.cells[2].innerText,
            konv: Number(row.cells[3].innerText),
            uom: row.cells[4].innerText,
            pcs_gr: Number(
                document.getElementById("qty_" + index)?.value || 0
            )
        });

    });

    const data = {
        id: Date.now(),
        pic: meta.pic || "-",
        kategori: meta.kategori || "-",
        type: meta.type || "-",
        tanggal: meta.tanggal || "-",
        waktuInput: getWaktuInput(),
        items: items
    };

    let historyStock =
        JSON.parse(localStorage.getItem("historyStock")) || [];

    historyStock.push(data);

    localStorage.setItem("historyStock", JSON.stringify(historyStock));
    localStorage.setItem("currentStock", JSON.stringify(data));

    tampilNotif("Data berhasil disimpan", "success");
}


// =====================================
// RESET
// =====================================
function resetData() {

    document.querySelectorAll(".qty-input").forEach(i => i.value = 0);

    tampilNotif("Data berhasil direset", "success");
}


// =====================================
// NOTIFIKASI FINAL FIX
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
