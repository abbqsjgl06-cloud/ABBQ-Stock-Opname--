document.addEventListener("DOMContentLoaded", renderHistory);

function renderHistory() {

    let historyData = JSON.parse(localStorage.getItem("historyStock")) || [];

    let html = "";

    if (historyData.length === 0) {

        html = `
            <div class="history-card">
                <h3>Belum ada data</h3>
                <p>Silakan lakukan stock opname terlebih dahulu.</p>
            </div>
        `;

    } else {

        historyData.forEach((data, index) => {

            const kategori = data.kategori || "-";
            const type = data.type || "-";
            const tanggal = data.tanggal || "-";
            const timestamp = data.timestamp || "-";

            const jumlahItem = Array.isArray(data.items)
                ? data.items.length
                : 0;

            html += `
                <div class="history-card">

                    <h3>${kategori} - ${type}</h3>

                    <p>Tanggal : ${tanggal}</p>

                    <p>Waktu Input : ${timestamp}</p>

                    <p>Jumlah Item : ${jumlahItem}</p>

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
}

function bukaData(index) {

    let historyData = JSON.parse(localStorage.getItem("historyStock")) || [];

    if (!historyData[index]) return;

    localStorage.setItem(
        "selectedHistory",
        JSON.stringify(historyData[index])
    );

    window.location.href = "detail_history.html";
}
