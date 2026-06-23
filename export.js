// =====================================
// EXPORT EXCEL (INPUT DATA)
// =====================================

function exportExcel() {

    const data = JSON.parse(localStorage.getItem("currentStock"));

    if (!data || !data.items || data.items.length === 0) {
        alert("Tidak ada data untuk di-export");
        return;
    }

    let csv = "";

    // HEADER
    csv += "STOCK OPNAME ABBQ\n";
    csv += `PIC: ${data.pic || "-"}\n`;
    csv += `Kategori: ${data.kategori || "-"}\n`;
    csv += `Type: ${data.type || "-"}\n`;
    csv += `Tanggal: ${data.tanggal || "-"}\n`;
    csv += `Waktu: ${data.waktuInput || "-"}\n\n`;

    // TABLE HEADER
    csv += "No,Kode,Item,Konv,UOM,Qty\n";

    // DATA
    data.items.forEach(item => {
        csv +=
            `${item.nomor},` +
            `${item.kode},` +
            `${item.item},` +
            `${item.konv},` +
            `${item.uom},` +
            `${item.pcs_gr || 0}\n`;
    });

    downloadCSV(csv, "stock_opname_input.csv");
}


// =====================================
// EXPORT HISTORY
// =====================================

function exportHistory(dataList = null) {

    const data = dataList || JSON.parse(localStorage.getItem("historyStock")) || [];

    if (data.length === 0) {
        alert("Tidak ada history untuk di-export");
        return;
    }

    let csv = "";

    csv += "HISTORY STOCK OPNAME ABBQ\n\n";

    data.forEach((transaksi, index) => {

        csv += `TRANSAKSI ${index + 1}\n`;
        csv += `PIC: ${transaksi.pic || "-"}\n`;
        csv += `Kategori: ${transaksi.kategori || "-"}\n`;
        csv += `Type: ${transaksi.type || "-"}\n`;
        csv += `Tanggal: ${transaksi.tanggal || "-"}\n`;
        csv += `Waktu: ${transaksi.waktuInput || "-"}\n\n`;

        csv += "No,Kode,Item,Konv,UOM,Qty\n";

        (transaksi.items || []).forEach(item => {
            csv +=
                `${item.nomor},` +
                `${item.kode},` +
                `${item.item},` +
                `${item.konv},` +
                `${item.uom},` +
                `${item.pcs_gr || 0}\n`;
        });

        csv += "\n\n";
    });

    downloadCSV(csv, "history_stock_opname.csv");
}


// =====================================
// EXPORT DETAIL
// =====================================

function exportDetail() {

    const data = JSON.parse(localStorage.getItem("selectedHistory"));

    if (!data) {
        alert("Tidak ada data detail untuk di-export");
        return;
    }

    let csv = "";

    csv += "DETAIL STOCK OPNAME ABBQ\n";
    csv += `PIC: ${data.pic || "-"}\n`;
    csv += `Kategori: ${data.kategori || "-"}\n`;
    csv += `Type: ${data.type || "-"}\n`;
    csv += `Tanggal: ${data.tanggal || "-"}\n`;
    csv += `Waktu: ${data.waktuInput || "-"}\n\n`;

    csv += "No,Kode,Item,Konv,UOM,Qty\n";

    (data.items || []).forEach(item => {
        csv +=
            `${item.nomor},` +
            `${item.kode},` +
            `${item.item},` +
            `${item.konv},` +
            `${item.uom},` +
            `${item.pcs_gr || 0}\n`;
    });

    downloadCSV(csv, "detail_stock_opname.csv");
}


// =====================================
// DOWNLOAD CSV
// =====================================

function downloadCSV(csv, filename) {

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
