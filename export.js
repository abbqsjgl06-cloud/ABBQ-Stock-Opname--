function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportExcel() {

    const data = JSON.parse(localStorage.getItem("currentStock"));

    if (!data || !data.items) return;

    let csv = "STOCK OPNAME\n\n";
    csv += `PIC: ${data.pic}\n`;
    csv += `Kategori: ${data.kategori}\n`;
    csv += `Type: ${data.type}\n`;
    csv += `Tanggal: ${data.tanggal}\n\n`;

    csv += "No,Kode,Item,Konv,UOM,Qty\n";

    data.items.forEach(i => {
        csv += `${i.nomor},${i.kode},${i.item},${i.konv},${i.uom},${i.pcs_gr}\n`;
    });

    downloadCSV(csv, "stock_opname.csv");
}
