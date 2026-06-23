document.addEventListener("DOMContentLoaded", () => {

    const activeStock = JSON.parse(localStorage.getItem("activeStock")) || {};

    const kategori = activeStock.kategori || "";
    const type = activeStock.type || "";
    const tanggal = activeStock.tanggal || "";
    const pic = activeStock.pic || "-";

    if (!kategori || !type || !tanggal) {
        alert("Data tidak lengkap, kembali ke menu awal");
        return;
    }

    document.getElementById("judulHalaman").innerText =
        `${kategori} - ${type} - ${tanggal}`;

    let databaseFile = "";

    if (kategori === "Kitchen" && type === "Daily") {
        databaseFile = "database/daily_kitchen.json";
    } else if (kategori === "Frontliner" && type === "Daily") {
        databaseFile = "database/daily_frontliner.json";
    } else if (kategori === "Kitchen" && type === "WM") {
        databaseFile = "database/wm_kitchen.json";
    } else if (kategori === "Frontliner" && type === "WM") {
        databaseFile = "database/wm_frontliner.json";
    }

    const tableBody = document.getElementById("tableBody");

    fetch(databaseFile + "?v=" + Date.now())
        .then(r => r.json())
        .then(data => {

            let html = "";

            data.forEach((item, i) => {
                html += `
                <tr>
                    <td>${item.nomor}</td>
                    <td>${item.kode}</td>
                    <td>${item.item}</td>
                    <td>${item.konv}</td>
                    <td>${item.uom}</td>
                    <td>
                        <input type="number" id="qty_${i}" value="0">
                    </td>
                </tr>`;
            });

            tableBody.innerHTML = html;

        });

    window.simpanData = function () {

        const rows = document.querySelectorAll("#tableBody tr");
        if (!rows.length) return;

        let items = [];

        rows.forEach((row, i) => {
            items.push({
                nomor: row.cells[0].textContent,
                kode: row.cells[1].textContent,
                item: row.cells[2].textContent,
                konv: row.cells[3].textContent,
                uom: row.cells[4].textContent,
                pcs_gr: Number(document.getElementById("qty_" + i).value)
            });
        });

        const data = {
            id: Date.now(),
            pic,
            kategori,
            type,
            tanggal,
            waktuInput: new Date().toLocaleString("id-ID"),
            items
        };

        let history = JSON.parse(localStorage.getItem("historyStock")) || [];
        history.push(data);

        localStorage.setItem("historyStock", JSON.stringify(history));
        localStorage.setItem("currentStock", JSON.stringify(data));

        alert("Data tersimpan");
    };

    window.resetData = function () {
        document.querySelectorAll(".qty-input").forEach(i => i.value = 0);
    };

});
