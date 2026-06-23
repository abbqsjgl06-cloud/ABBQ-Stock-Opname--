// =====================================
// EXPORT EXCEL (CSV SIMPLE - STABIL)
// =====================================

function exportExcel() {

    const data =
        JSON.parse(localStorage.getItem("currentStock"));

    if (!data || !data.items || data.items.length === 0) {
        alert("Tidak ada data untuk di-export");
        return;
    }

    const header = [
        "No",
        "Kode",
        "Item",
        "Konv",
        "UOM",
        "Qty",
        "PIC",
        "Kategori",
        "Type",
        "Tanggal",
        "Waktu Input"
    ];

    let rows = [];

    data.items.forEach((item, index) => {

        rows.push([
            item.nomor,
            item.kode,
            item.item,
            item.konv,
            item.uom,
            item.pcs_gr,
            data.pic,
            data.kategori,
            data.type,
            data.tanggal,
            data.waktuInput
        ]);

    });

    let csvContent = "";

    csvContent += header.join(",") + "\n";

    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    // buat file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `stock_opname_${Date.now()}.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
