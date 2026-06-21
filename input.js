// =====================================
// Ambil data dari localStorage
// =====================================

const activeStock =
JSON.parse(
    localStorage.getItem("activeStock")
) || {};

const kategori = activeStock.kategori || "";
const type = activeStock.type || "";
const tanggal = activeStock.tanggal || "";
const pic = activeStock.pic || "-";

const activeStock =
JSON.parse(localStorage.getItem("activeStock")) || {};

const pic =
activeStock.pic ||
activeStock.operator ||
"-";

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

console.log("Kategori :", kategori);
console.log("Type :", type);
console.log("Database :", databaseFile);


// =====================================
// Membaca database
// =====================================

if (databaseFile !== "") {

    fetch(databaseFile)

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "File tidak ditemukan : " + databaseFile
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

        document.getElementById(
            "tableBody"
        ).innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        tampilNotif(
            "Database tidak ditemukan"
        );

    });

}
else{

    tampilNotif(
        "Kategori atau type tidak valid"
    );

}


// =====================================
// Waktu input
// =====================================

function getWaktuInput(){

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
// Simpan data
// =====================================

function simpanData(){

    let rows =
    document.querySelectorAll(
        "#tableBody tr"
    );

    let items = [];

    rows.forEach((row,index)=>{

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


    let data = {

        id: Date.now(),

        pic: pic,

        tanggal: tanggal,

        kategori: kategori,

        type: type,

        waktuInput: getWaktuInput(),

        items: items

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


    tampilNotif(
        "✓ Data berhasil disimpan"
    );

}


// =====================================
// Reset data
// =====================================

function resetData(){

    let inputQty =
    document.querySelectorAll(
        ".qty-input"
    );

    inputQty.forEach(input=>{

        input.value = 0;

    });

    tampilNotif(
        "✓ Data berhasil direset"
    );

}


// =====================================
// Notifikasi
// =====================================

function tampilNotif(pesan){

    let notif =
    document.getElementById(
        "notif"
    );

    if(!notif) return;

    notif.innerHTML = pesan;

    notif.style.display = "block";

    setTimeout(()=>{

        notif.style.display = "none";

    },2000);

}
