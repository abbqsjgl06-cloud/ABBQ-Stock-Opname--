```javascript
// =====================================
// INPUT.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // AMBIL DATA AKTIF
    // ======================
    const activeStock =
        JSON.parse(localStorage.getItem("activeStock")) || {};

    const kategori =
        activeStock.kategori ||
        localStorage.getItem("kategori") ||
        "";

    const type =
        activeStock.type ||
        localStorage.getItem("type") ||
        "";

    const tanggal =
        activeStock.tanggal ||
        localStorage.getItem("tanggal") ||
        "";

    const pic =
        activeStock.pic ||
        activeStock.operator ||
        "-";

    // validasi
    if (!kategori || !type || !tanggal) {

        tampilNotif(
            "Data tidak lengkap",
            "error"
        );

        return;
    }

    // ======================
    // JUDUL HALAMAN
    // ======================
    const judulHalaman =
        document.getElementById("judulHalaman");

    if (judulHalaman) {

        judulHalaman.innerHTML =
            `${kategori} - ${type} - ${tanggal}`;

    }

    // ======================
    // PILIH DATABASE
    // ======================
    let databaseFile = "";

    if (
        kategori === "Kitchen" &&
        type === "Daily"
    ) {

        databaseFile =
            "database/daily_kitchen.json";

    }
    else if (
        kategori === "Frontliner" &&
        type === "Daily"
    ) {

        databaseFile =
            "database/daily_frontliner.json";

    }
    else if (
        kategori === "Kitchen" &&
        type === "WM"
    ) {

        databaseFile =
            "database/wm_kitchen.json";

    }
    else if (
        kategori === "Frontliner" &&
        type === "WM"
    ) {

        databaseFile =
            "database/wm_frontliner.json";

    }

    console.log("Database :", databaseFile);

    const tableBody =
        document.getElementById("tableBody");

    if (!tableBody) return;

    if (!databaseFile) {

        tampilNotif(
            "Kategori atau type tidak valid",
            "error"
        );

        return;

    }

    // ======================
    // LOAD DATABASE JSON
    // ======================
    fetch(databaseFile)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Database tidak ditemukan"
                );

            }

            return response.json();

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

                        <input
                            type="number"
                            class="qty-input"
                            id="qty_${index}"
                            min="0"
                            value="0">

                    </td>

                </tr>

                `;

            });

            tableBody.innerHTML = html;

        })

        .catch(error => {

            console.error(error);

            tampilNotif(
                "Gagal load database",
                "error"
            );

        });

    // simpan meta
    window._stockMeta = {

        kategori,
        type,
        tanggal,
        pic

    };

});


// =====================================
// WAKTU INPUT
// =====================================
function getWaktuInput() {

    return new Date().toLocaleString(

        "id-ID",

        {

            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        }

    );

}


// =====================================
// SIMPAN DATA
// =====================================
function simpanData() {

    const tableBody =
        document.getElementById("tableBody");

    const rows =
        tableBody.querySelectorAll("tr");

    if (rows.length === 0) {

        tampilNotif(
            "Data belum siap",
            "error"
        );

        return;

    }

    const meta =
        window._stockMeta || {};

    let items = [];

    rows.forEach((row, index) => {

        items.push({

            nomor:
                Number(row.cells[0].textContent),

            kode:
                row.cells[1].textContent,

            item:
                row.cells[2].textContent,

            konv:
                Number(row.cells[3].textContent),

            uom:
                row.cells[4].textContent,

            pcs_gr:
                Number(
                    document.getElementById(
                        "qty_" + index
                    ).value
                )

        });

    });

    const data = {

        id: Date.now(),

        pic:
            meta.pic || "-",

        kategori:
            meta.kategori || "-",

        type:
            meta.type || "-",

        tanggal:
            meta.tanggal || "-",

        waktuInput:
            getWaktuInput(),

        items:
            items

    };

    // current stock
    localStorage.setItem(

        "currentStock",

        JSON.stringify(data)

    );

    // history stock
    let historyData =

        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];

    historyData.push(data);

    localStorage.setItem(

        "historyStock",

        JSON.stringify(historyData)

    );

    console.log(historyData);

    tampilNotif(
        "Data berhasil disimpan",
        "success"
    );

}


// =====================================
// RESET
// =====================================
function resetData() {

    document
        .querySelectorAll(".qty-input")
        .forEach(input => {

            input.value = 0;

        });

    tampilNotif(
        "Data berhasil direset",
        "success"
    );

}


// =====================================
// NOTIFIKASI
// =====================================
function tampilNotif(
    pesan,
    type = "success"
) {

    const notif =
        document.getElementById("notif");

    if (!notif) return;

    notif.className =
        "notif " + type;

    notif.innerHTML =
        pesan;

    notif.style.display =
        "block";

    setTimeout(() => {

        notif.style.display =
            "none";

    }, 2000);

}
```
