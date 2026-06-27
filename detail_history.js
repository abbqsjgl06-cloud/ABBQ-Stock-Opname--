// =====================================
// DETAIL_HISTORY.JS FINAL STABLE
// =====================================

let data =
    JSON.parse(
        localStorage.getItem("selectedHistory")
    ) || null;

// =====================================
// LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    if (!data) {

        window.location.href =
            "history.html";

        return;

    }

    const judul =
        document.getElementById("judulHistory");

    if (judul) {

        judul.innerHTML =

            data.kategori +

            " - " +

            data.type +

            " - " +

            data.tanggal;

    }

    renderTable();

});

// =====================================
// TABEL
// =====================================

function renderTable() {

    let html = "";

    data.items.forEach((item, index) => {

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
                    value="${item.pcs_gr}">

            </td>

        </tr>

        `;

    });

    document.getElementById(
        "tableBody"
    ).innerHTML = html;

}

// =====================================
// UPDATE
// =====================================

function updateData() {

    data.items.forEach((item, index) => {

        item.pcs_gr = Number(

            document.getElementById(
                "qty_" + index
            ).value

        );

    });

    let history =

        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];

    // Cari berdasarkan ID
    const idx =
        history.findIndex(

            item => item.id === data.id

        );

    if (idx !== -1) {

        history[idx] = data;

    }

    localStorage.setItem(

        "historyStock",

        JSON.stringify(history)

    );

    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(data)

    );

    tampilNotif(

        "✓ Data berhasil diperbarui",

        "success"

    );

}

// =====================================
// EXPORT
// =====================================

function exportHistoryExcel() {

    if (typeof XLSX === "undefined") {

        tampilNotif(
            "Library Excel belum dimuat",
            "error"
        );

        return;

    }

    let excelData = [];

    data.items.forEach(item => {

        excelData.push({

            "No": item.nomor,

            "Kode": item.kode,

            "Item": item.item,

            "Konv": item.konv,

            "UOM": item.uom,

            "PCS/Gr": item.pcs_gr

        });

    });

    const workbook =
        XLSX.utils.book_new();

    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Stock Opname"

    );

    const namaFile =

        "SO_" +

        data.kategori +

        "_" +

        data.type +

        "_" +

        data.tanggal +

        ".xlsx";

    XLSX.writeFile(

        workbook,

        namaFile

    );

    tampilNotif(

        "✓ Excel berhasil dibuat",

        "success"

    );

}

// =====================================
// NOTIF
// =====================================

function tampilNotif(
    pesan,
    type = "success"
) {

    const notif =
        document.getElementById(
            "notif"
        );

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
