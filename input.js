// =====================================
// Ambil data aktif
// =====================================

const activeStock = JSON.parse(localStorage.getItem("activeStock")) || {};

const kategori = activeStock.kategori || localStorage.getItem("kategori") || "";
const type = activeStock.type || localStorage.getItem("type") || "";
const tanggal = activeStock.tanggal || localStorage.getItem("tanggal") || "";

// 🔥 SATUKAN PIC (ANTI BUG)
const pic = activeStock.pic || activeStock.operator || "-";

// =====================================
// Validasi awal (WAJIB)
// =====================================

if (!kategori || !type || !tanggal) {
    tampilNotif("Data tidak lengkap, kembali ke menu awal");
}

// =====================================
// Judul halaman
// =====================================

document.getElementById("judulHalaman").innerHTML =
`${kategori} - ${type} - ${tanggal}`;

// =====================================
// Menentukan database
// =====================================

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

console.log("Kategori:", kategori);
console.log("Type:", type);
console.log("Database:", databaseFile);

// =====================================
// LOAD DATABASE
// =====================================

if (!databaseFile) {
    tampilNotif("Kategori / Type tidak valid");
} else {

    fetch(databaseFile)
        .then(res => {
            if (!res.ok) throw new Error("File database tidak ditemukan");
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

            document.getElementById("tableBody").innerHTML = html;

        })
        .catch(err => {
            console.error(err);
            tampilNotif("Gagal load database");
        });
}

// =====================================
// WAKTU INPUT
// =====================================

function getWaktuInput() {
    return new Date().toLocaleString("id-ID", {
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

    let rows = document.querySelectorAll("#tableBody tr");

    if (!rows.length) {
        tampilNotif("Data belum dimuat");
        return;
    }

    let items = [];

    rows.forEach((row, index) => {

        items.push({
            nomor: Number(row.cells[0].textContent),
            kode: row.cells[1].textContent,
            item: row.cells[2].textContent,
            konv: Number(row.cells[3].textContent),
            uom: row.cells[4].textContent,
            pcs_gr: Number(
                document.getElementById("qty_" + index).value
            )
        });

    });

    let data = {
        id: Date.now(),
        pic: pic,
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        waktuInput: getWaktuInput(),
        items: items
    };

    let historyData = JSON.parse(localStorage.getItem("historyStock")) || [];

    historyData.push(data);

    localStorage.setItem("historyStock", JSON.stringify(historyData));
    localStorage.setItem("currentStock", JSON.stringify(data));

    tampilNotif("✓ Data berhasil disimpan");
}

// =====================================
// RESET
// =====================================

function resetData() {

    document.querySelectorAll(".qty-input").forEach(input => {
        input.value = 0;
    });

    tampilNotif("✓ Data berhasil direset");
}

// =====================================
// NOTIFIKASI
// =====================================

function tampilNotif(pesan) {

    let notif = document.getElementById("notif");

    if (!notif) return;

    notif.innerHTML = pesan;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);

}
