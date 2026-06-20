function exportExcel() {

    let rows = document.querySelectorAll("#tableBody tr");

    if(rows.length === 0){
        alert("Tidak ada data untuk diexport");
        return;
    }

    let excelData = [];

    rows.forEach((row,index)=>{

        let nomor = row.cells[0].innerText;
        let kode = row.cells[1].innerText;
        let item = row.cells[2].innerText;
        let konv = row.cells[3].innerText;
        let uom = row.cells[4].innerText;

        let qty = document.getElementById(
            "qty_" + index
        ).value;

        excelData.push({

            "No": nomor,
            "Kode": kode,
            "Item": item,
            "Konv": konv,
            "UOM": uom,
            "PCS/Gr": qty

        });

    });

    const worksheet =
        XLSX.utils.json_to_sheet(excelData);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Stock Opname"
    );

    let kategori =
        localStorage.getItem("kategori");

    let type =
        localStorage.getItem("type");

    let tanggal =
        localStorage.getItem("tanggal");

    let namaFile =
        "SO_" +
        kategori +
        "_" +
        type +
        "_" +
        tanggal +
        ".xlsx";

    XLSX.writeFile(
        workbook,
        namaFile
    );

}
