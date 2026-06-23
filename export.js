// =====================================
// EXPORT EXCEL
// =====================================
function exportExcel() {

    // cek library XLSX
    if (typeof XLSX === "undefined") {

        alert(
            "Library XLSX belum dimuat"
        );

        return;
    }

    // ambil semua row
    const rows =
        document.querySelectorAll(
            "#tableBody tr"
        );

    if (rows.length === 0) {

        tampilNotif(
            "Tidak ada data untuk diexport",
            "error"
        );

        return;
    }

    let excelData = [];

    rows.forEach((row, index) => {

        const qtyInput =
            document.getElementById(
                "qty_" + index
            );

        excelData.push({

            "No":
                row.cells[0].textContent,

            "Kode":
                row.cells[1].textContent,

            "Item":
                row.cells[2].textContent,

            "Konv":
                row.cells[3].textContent,

            "UOM":
                row.cells[4].textContent,

            "PCS/Gr":
                qtyInput
                    ? qtyInput.value
                    : 0

        });

    });


    // ==========================
    // Workbook
    // ==========================
    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Stock Opname"

    );


    // ==========================
    // Nama file
    // ==========================
    const activeStock =
        JSON.parse(
            localStorage.getItem(
                "activeStock"
            )
        ) || {};

    const kategori =
        activeStock.kategori ||
        localStorage.getItem("kategori") ||
        "Stock";

    const type =
        activeStock.type ||
        localStorage.getItem("type") ||
        "-";

    const tanggal =
        activeStock.tanggal ||
        localStorage.getItem("tanggal") ||
        "-";

    const namaFile =

        "SO_" +

        kategori +

        "_" +

        type +

        "_" +

        tanggal +

        ".xlsx";


    // ==========================
    // Download
    // ==========================
    XLSX.writeFile(

        workbook,

        namaFile

    );

    tampilNotif(
        "Excel berhasil dibuat",
        "success"
    );

}
```
