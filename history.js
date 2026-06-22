let allData = JSON.parse(localStorage.getItem("historyStock")) || [];

document.addEventListener("DOMContentLoaded", () => {

    // TIDAK AUTO RENDER SEMUA DATA
    document.getElementById("historyList").innerHTML =
        `<p style="text-align:center;color:gray">
            Silakan pilih tanggal untuk melihat riwayat
        </p>`;

});


// ======================
// RENDER FUNCTION
// ======================

function renderHistory(data) {

    let html = "";

    if (!data || data.length === 0) {

        html = `
        <div class="history-card">
            <h3>Tidak ada data</h3>
        </div>
        `;

    } else {

        data.forEach((item, index) => {

            html += `
            <div class="history-card">

                <h3>${item.kategori} - ${item.type}</h3>

                <p><b>PIC:</b> ${item.pic || item.operator || "-"}</p>

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
}


// ======================
// FILTER
// ======================

function filterHistory() {

    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    if (!start || !end) {
        alert("Pilih tanggal awal dan akhir");
        return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const filtered = allData.filter(item => {

        const itemDate = new Date(item.tanggal);

        return itemDate >= startDate && itemDate <= endDate;

    });

    renderHistory(filtered);
}


// ======================
// RESET
// ======================

function resetFilter() {

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    document.getElementById("historyList").innerHTML =
        `<p style="text-align:center;color:gray">
            Silakan pilih tanggal untuk melihat riwayat
        </p>`;

}


// ======================
// DETAIL
// ======================

function bukaData(index) {

    localStorage.setItem(
        "selectedHistory",
        JSON.stringify(allData[index])
    );

    window.location.href = "detail_history.html";
}
