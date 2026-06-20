document.addEventListener("DOMContentLoaded", () => {

    const data = JSON.parse(localStorage.getItem("historyStock")) || [];

    let html = "";

    if (!data.length) {

        html = `
            <div class="history-card">
                <h3>Belum ada data</h3>
            </div>
        `;

    } else {

        data.forEach((item, index) => {

            // 🔥 FIX COMPATIBILITY SEMUA VERSI DATA
            const pic =
                item.pic ||
                item.operator ||
                "-";

            const waktu =
                item.waktuInput ||
                item.timestamp ||
                "-";

            const kategori = item.kategori || "-";
            const type = item.type || "-";
            const tanggal = item.tanggal || "-";

            const jumlah = Array.isArray(item.items)
                ? item.items.length
                : 0;

            html += `
                <div class="history-card">

                    <h3>${kategori} - ${type}</h3>

                    <p><b>PIC:</b> ${pic}</p>

                    <p><b>Tanggal:</b> ${tanggal}</p>

                    <p><b>Waktu Input:</b> ${waktu}</p>

                    <p><b>Jumlah Item:</b> ${jumlah}</p>

                    <button onclick="bukaData(${index})">
                        BUKA DATA
                    </button>

                </div>
                <br>
            `;
        });
    }

    document.getElementById("historyList").innerHTML = html;
});

function bukaData(index) {

    const data = JSON.parse(localStorage.getItem("historyStock")) || [];

    if (!data[index]) return;

    localStorage.setItem("selectedHistory", JSON.stringify(data[index]));

    window.location.href = "detail_history.html";
}
