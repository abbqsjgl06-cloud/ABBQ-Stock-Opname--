```javascript
// =====================================
// AMBIL DATA AKTIF
// =====================================

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

// =====================================
// JUDUL HALAMAN
// =====================================

const judulHalaman =
    document.getElementById("judulHalaman");

if (judulHalaman) {

    judulHalaman.innerHTML =
        `${kategori} - ${type} - ${tanggal}`;

}

// =====================================
// MENENTUKAN DATABASE
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

// =====================================
// LOAD DATABASE
// =====================================

if (!databaseFile) {

    tampilNotif(
        "Kategori / Type tidak valid",
        "error"
    );

}
else {

    fetch(databaseFile)

        .then(response => {

            if (!response.ok) {

                throw new Error();

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
                            value="0"
                            min="0">

                    </td>

                </tr>
                `;

            });

            document.getElementById(
                "tableBody"
            ).innerHTML = html;

        })

        .catch(error => {

            tampilNotif(
                "Gagal load database",
                "error"
            );

        });

}

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

    let rows =
        document.querySelectorAll(
            "#tableBody tr"
        );

    if (rows.length === 0) {

        tampilNotif(
            "Data belum dimuat",
            "error"
        );

        return;

    }

    let items = [];

    rows.forEach((row, index) => {

        items.push({

            nomor:
                Number(
                    row.cells[0].textContent
                ),

            kode:
                row.cells[1].textContent,

            item:
                row.cells[2].textContent,

            konv:
                Number(
                    row.cells[3].textContent
                ),

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

        pic: pic,

        kategori: kategori,

        type: type,

        tanggal: tanggal,

        waktuInput: getWaktuInput(),

        items: items

    };

    localStorage.setItem(
        "currentStock",
        JSON.stringify(data)
    );

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

    tampilNotif(
        "✓ Data berhasil disimpan",
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
        "✓ Data berhasil direset",
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

    notif.className = "";

    notif.classList.add("notif");

    if (type === "success") {

        notif.classList.add(
            "success"
        );

    }
    else {

        notif.classList.add(
            "error"
        );

    }

    notif.innerHTML = pesan;

    notif.style.display = "block";

    setTimeout(() => {

        notif.style.display = "none";

    }, 2000);

}
```
