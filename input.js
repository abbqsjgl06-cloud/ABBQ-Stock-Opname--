// ======================
// Ambil data dari localStorage
// ======================

const kategori = localStorage.getItem("kategori");
const type = localStorage.getItem("type");
const tanggal = localStorage.getItem("tanggal");

// ambil PIC dari activeStock
const activeStock =
JSON.parse(localStorage.getItem("activeStock")) || {};

const pic =
activeStock.pic ||
activeStock.operator ||
"-";

document.getElementById("judulHalaman").innerHTML =
kategori + " - " + type + " - " + tanggal;

// ======================
// Menentukan database
// ======================

let databaseFile = "";

if (kategori === "Kitchen" && type === "Daily") {
databaseFile = "database/daily_kitchen.json";
}

if (kategori === "Frontliner" && type === "Daily") {
databaseFile = "database/daily_frontliner.json";
}

if (kategori === "Kitchen" && type === "WM") {
databaseFile = "database/wm_kitchen.json";
}

if (kategori === "Frontliner" && type === "WM") {
databaseFile = "database/wm_frontliner.json";
}

// ======================
// Membaca database
// ======================

fetch(databaseFile)

.then(response => response.json())

.then(data => {

```
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

document.getElementById("tableBody").innerHTML = html;
```

})

.catch(error => {

```
tampilNotif("Database tidak ditemukan");
```

});

// ======================
// Fungsi waktu realtime
// ======================

function getWaktuInput() {

```
return new Date().toLocaleString("id-ID", {

    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"

});
```

}

// ======================
// Simpan data
// ======================

function simpanData() {

```
let rows =
    document.querySelectorAll("#tableBody tr");

let items = [];

rows.forEach((row, index) => {

    items.push({

        nomor: Number(
            row.cells[0].innerText
        ),

        kode:
            row.cells[1].innerText,

        item:
            row.cells[2].innerText,

        konv: Number(
            row.cells[3].innerText
        ),

        uom:
            row.cells[4].innerText,

        pcs_gr: Number(

            document.getElementById(
                "qty_" + index
            ).value

        )

    });

});


let data = {

    id: Date.now(),

    pic: pic,

    tanggal: tanggal,

    kategori: kategori,

    type: type,

    waktuInput: getWaktuInput(),

    items: items

};


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


localStorage.setItem(

    "currentStock",

    JSON.stringify(data)

);


tampilNotif(
    "✓ Data berhasil disimpan"
);
```

}

// ======================
// Reset
// ======================

function resetData() {

```
let inputQty =
    document.querySelectorAll(
        ".qty-input"
    );

inputQty.forEach(input => {

    input.value = 0;

});

tampilNotif(
    "✓ Data berhasil direset"
);
```

}

// ======================
// Notifikasi
// ======================

function tampilNotif(pesan) {

```
let notif =
    document.getElementById(
        "notif"
    );

if (!notif) return;

notif.innerHTML = pesan;

notif.style.display = "block";

setTimeout(function () {

    notif.style.display = "none";

}, 2000);
}
