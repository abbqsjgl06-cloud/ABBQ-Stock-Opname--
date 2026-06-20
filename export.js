```javascript
function exportExcel() {

    let rows = document.querySelectorAll("#tableBody tr");

    let excelData = [];

    rows.forEach((row, index) => {

        let nomor = row.cells[0].innerText;

        let kode = row.cells[1].innerText;

        let item = row.cells[2].innerText;

        let konv = row.cells[3].innerText;

        let uom = row.cells[4].innerText;

        let pcs_gr =
            document.getElementById(
                "qty_" + index
            ).value;

        excelData.push({

            "No": nomor,

            "Kode": kode,

            "Item": item,

            "Konv": konv,

            "UOM": uom,

            "PCS/Gr": pcs_gr

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


    let kategori =
        localStorage.getItem(
            "kategori"
        );

    let type =
        localStorage.getItem(
            "type"
        );

    let tanggal =
        localStorage.getItem(
            "tanggal"
        );


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
