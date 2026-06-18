function exportExcel(){

    let rows = document.querySelectorAll("#tableBody tr");

    let excelData = [];

    rows.forEach((row,index)=>{

        let nama_item = row.cells[0].innerText;

        let cs = document.getElementById(
            "cs_"+index
        ).value;

        let pcs = document.getElementById(
            "pcs_"+index
        ).value;

        excelData.push({

            "Nama Barang": nama_item,
            "CS": cs,
            "PCS/Gr": pcs

        });

    });

    let wb = XLSX.utils.book_new();

    let ws = XLSX.utils.json_to_sheet(
        excelData
    );

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Stock Opname"
    );

    let kategori = localStorage.getItem("kategori");
    let type = localStorage.getItem("type");
    let tanggal = localStorage.getItem("tanggal");

    let namaFile =
        "SO_" +
        kategori +
        "_" +
        type +
        "_" +
        tanggal +
        ".xlsx";

    XLSX.writeFile(
        wb,
        namaFile
    );

}
