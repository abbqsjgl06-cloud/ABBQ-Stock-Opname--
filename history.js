document.addEventListener("DOMContentLoaded", () => {

    const data = JSON.parse(localStorage.getItem("historyStock")) || [];

    let html = "";

    if (!data.length) {

        html = `
            <div class="history-card">
                <h3>Belum ada data</h3>
                <p>Silakan lakukan stock opname terlebih dahulu</p>
            </div>
        `;

    } else {

        data.forEach((item, index) => {

            html += `
                <div class="history-card">

                    <h3>${item.kategori} - ${item.type}</h3>

                    <p><b>PIC:</b> ${item.pic || "Tidak ada PIC"}</p>

                    <p><b>Tanggal:</b> ${item.tanggal}</p>

                    <p><b>Waktu Input:</b> ${item.waktuInput || "-"}</p>

                    <p><b>Jumlah Item:</b> ${item.items?.length || 0}</p>

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
