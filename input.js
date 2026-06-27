// =====================================
// INPUT.JS FINAL STABLE
// =====================================

let stockMeta = {};
let databaseData = [];

// =====================================
// LOAD HALAMAN
// =====================================
document.addEventListener("DOMContentLoaded", () => {

    // Ambil data aktif
    const activeStock =
        JSON.parse(localStorage.getItem("activeStock")) || {};

    stockMeta = {

        pic:
            activeStock.pic || "-",

        kategori:
            activeStock.kategori ||
            localStorage.getItem("kategori") ||
            "",

        type:
            activeStock.type ||
            localStorage.getItem("type") ||
            "",

        tanggal:
            activeStock.tanggal ||
            localStorage.getItem("tanggal") ||
            ""

    };

    // Validasi
    if (
        !stockMeta.kategori ||
        !stockMeta.type ||
        !stockMeta.tanggal
    ) {

        tampilNotif(
            "Data input tidak ditemukan",
            "error"
        );

        setTimeout(() => {

            window.location.href =
                "index.html";

        },1500);

        return;

    }

    // Judul
    document.getElementById(
        "judulHalaman"
    ).innerHTML =

        stockMeta.kategori +
        " - " +
        stockMeta.type +
        " - " +
        stockMeta.tanggal;

    loadDatabase();

});

// =====================================
// LOAD DATABASE
// =====================================

function loadDatabase(){

    let databaseFile = "";

    if(
        stockMeta.kategori === "Kitchen" &&
        stockMeta.type === "Daily"
    ){

        databaseFile =
            "database/daily_kitchen.json";

    }

    else if(
        stockMeta.kategori === "Frontliner" &&
        stockMeta.type === "Daily"
    ){

        databaseFile =
            "database/daily_frontliner.json";

    }

    else if(
        stockMeta.kategori === "Kitchen" &&
        stockMeta.type === "WM"
    ){

        databaseFile =
            "database/wm_kitchen.json";

    }

    else if(
        stockMeta.kategori === "Frontliner" &&
        stockMeta.type === "WM"
    ){

        databaseFile =
            "database/wm_frontliner.json";

    }

    console.log(databaseFile);

    fetch(
        databaseFile + "?v=" + Date.now()
    )

    .then(response=>{

        if(!response.ok){

            throw new Error(
                "Database tidak ditemukan"
            );

        }

        return response.json();

    })

    .then(data=>{

        databaseData = data;

        renderTable();

    })

    .catch(error=>{

        console.error(error);

        tampilNotif(
            "Gagal membuka database",
            "error"
        );

    });

}

// =====================================
// TABEL
// =====================================

function renderTable(){

    let html = "";

    databaseData.forEach((item,index)=>{

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

}

// =====================================
// WAKTU
// =====================================

function getWaktuInput(){

    return new Date().toLocaleString(
        "id-ID",
        {

            year:"numeric",
            month:"2-digit",
            day:"2-digit",
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"

        }
    );

}

// =====================================
// SIMPAN
// =====================================

function simpanData(){

    let items = [];

    databaseData.forEach((item,index)=>{

        items.push({

            nomor:item.nomor,

            kode:item.kode,

            item:item.item,

            konv:item.konv,

            uom:item.uom,

            pcs_gr:Number(

                document.getElementById(
                    "qty_"+index
                ).value

            )

        });

    });

    const data = {

        id:Date.now(),

        pic:stockMeta.pic,

        kategori:stockMeta.kategori,

        type:stockMeta.type,

        tanggal:stockMeta.tanggal,

        waktuInput:getWaktuInput(),

        items:items

    };

    let history =

        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];

    history.push(data);

    localStorage.setItem(
        "historyStock",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "currentStock",
        JSON.stringify(data)
    );

    tampilNotif(
        "✓ Data berhasil disimpan",
        "success"
    );

}

// =====================================
// RESET
// =====================================

function resetData(){

    document
        .querySelectorAll(".qty-input")
        .forEach(input=>{

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
    type="success"
){

    const notif =
        document.getElementById(
            "notif"
        );

    if(!notif) return;

    notif.className =
        "notif " + type;

    notif.innerHTML =
        pesan;

    notif.style.display =
        "block";

    setTimeout(()=>{

        notif.style.display =
            "none";

    },2000);

}
