document.addEventListener("DOMContentLoaded", () => {

    const data = JSON.parse(localStorage.getItem("historyStock")) || [];

    let html = "";

    if (!Array.isArray(data) || data.length === 0) {

        html = `
            <div class="history-card">
                <h3>Belum ada data</h3>
                <p>Silakan lakukan stock opname terlebih dahulu</p>
            </div>
        `;

    } else {

        data.forEach((item, index) => {

            const kategori = item.kategori || "-";
            const type = item.type || "-";
            const operator = item.operator || "Tidak ada PIC";
            const tanggal = item.tanggal || "-";

            // FIX TIME HANDLING (ANTI UNDEFINED)
            const waktuJam =
                item.time ||
                (item.timestamp ? item.timestamp.split(",")[1]?.trim() : null) ||
                "-";

            const waktuLengkap =
                item.timestamp ||
                item.time ||
                "-";

            const jumlahItem = Array.isArray(item.items)
                ? item.items.length
                : 0;

            html += `
                <div class="history-card">

                    <h3>${kategori} - ${type}</h3>

                    <p><b>PIC:</b> ${operator}</p>

                    <p><b>Tanggal:</b> ${tanggal}</p>

                    <p><b>Waktu Input:</b> ${waktuJam}</p>

                    <p><b>Waktu Lengkap:</b> ${waktuLengkap}</p>

                    <p><b>Jumlah Item:</b> ${jumlahItem}</p>

                    <button onclick="bukaData(${index})">
                        BUKA DATA
                    </button>

                </div>
                <br>
            `;
        });
    }

    const container = document.getElementById("historyList");

    if (container) {
        container.innerHTML = html;
    }
});

function bukaData(index) {

    const data = JSON.parse(localStorage.getItem("historyStock")) || [];

    if (!data[index]) return;

    localStorage.setItem(
        "selectedHistory",
        JSON.stringify(data[index])
    );

    window.location.href = "detail_history.html";
}
