document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // AMBIL DATA AKTIF
    // =========================
    const activeStock =
        JSON.parse(localStorage.getItem("activeStock")) || {};

    const kategori =
        activeStock.kategori || "";

    const type =
        activeStock.type || "";

    const tanggal =
        activeStock.tanggal || "";

    const pic =
        activeStock.pic || activeStock.operator || "-";

    // =========================
    // VALIDASI
    // =========================
    const judul = document.getElementById("judulHalaman");

    if (judul) {
        judul.innerText = `${kategori} - ${type} - ${tanggal}`;
    }

    if (!kategori || !type || !tanggal) {
        console.error("DATA ACTIVE STOCK KOSONG");
        return;
    }

    // =========================
    // DATABASE SELECT
    // =========================
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

    console.log("LOAD:", databaseFile);

    const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        console.error("tableBody TIDAK DITEMUKAN");
        return;
    }

    if (!databaseFile) {
        alert("Kategori/type tidak valid");
        return;
    }

    // =========================
    // FETCH DATA
    // =========================
    fetch(databaseFile + "?v=" + Date.now()) // anti cache android
        .then(res => {
            if (!res.ok) throw new Error("File tidak ditemukan");
            return res.json();
        })
        .then(data => {

            console.log("table load :", data.length);

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
                               value="0">
                    </td>
                </tr>`;
            });

            tableBody.innerHTML = html;

        })
        .catch(err => {
            console.error(err);
            alert("Gagal load database");
        });

    // =========================
    // GLOBAL META
    // =========================
    window._stockMeta = { kategori, type, tanggal, pic };

});
