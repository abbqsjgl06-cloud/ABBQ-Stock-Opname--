document.addEventListener("DOMContentLoaded", () => {

    const activeStock = JSON.parse(localStorage.getItem("activeStock"));

    if (!activeStock) {
        alert("Data session hilang, kembali ke menu awal");
        window.location.href = "index.html";
        return;
    }

    const kategori = activeStock.kategori;
    const type = activeStock.type;
    const tanggal = activeStock.tanggal;
    const pic = activeStock.pic;

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

    console.log("DB:", databaseFile);

    if (!databaseFile) {
        alert("Kategori tidak valid");
        return;
    }

    fetch(databaseFile)
        .then(res => {
            if (!res.ok) throw new Error("DB tidak ditemukan");
            return res.json();
        })
        .then(data => {

            const tableBody = document.getElementById("tableBody");

            if (!tableBody) {
                console.error("tableBody tidak ditemukan");
                return;
            }

            let html = "";

            data.forEach((item, index) => {

                html += `
                    <tr>
                        <td>${item.nomor}</td>
                        <td>${item.kode}</td>
                        <td>${item.item}</td>
                        <td>${item.konv}</td>
                        <td>${item.uom}</td>
                        <td>
                            <input type="number"
                                   id="qty_${index}"
                                   value="0"
                                   min="0"
                                   class="qty-input">
                        </td>
                    </tr>
                `;
            });

            tableBody.innerHTML = html;

            console.log("TABLE LOADED:", data.length);

        })
        .catch(err => {
            console.error(err);
            alert("Gagal load database");
        });

});
