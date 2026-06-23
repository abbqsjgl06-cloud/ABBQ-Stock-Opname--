document.addEventListener("DOMContentLoaded", () => {

    renderHistory();
});

// =====================================
// AMBIL DATA HISTORY
// =====================================
function getHistoryData() {
    return JSON.parse(localStorage.getItem("historyStock")) || [];
}

// =====================================
// RENDER SEMUA / FILTER HASIL
// =====================================
function renderHistory(data = null) {

    const list = document.getElementById("historyList");
    if (!list) return;

    const history = data || getHistoryData();

    if (history.length === 0) {
        list.innerHTML = `
            <div class="history-card">
                <h3>Belum ada data</h3>
                <p>Silakan lakukan stock opname terlebih dahulu</p>
            </div>
        `;
        return;
    }

    let html = "";

    history.forEach((item, index) => {

        const pic = item.pic || item.operator || "-";
        const waktu = item.waktuInput || item.timestamp || "-";

        html += `
            <div class="history-card">

                <h3>${item.kategori || "-"} - ${item.type || "-"}</h3>

                <p><b>PIC:</b> ${pic}</p>

                <p><b>Tanggal:</b> ${item.tanggal || "-"}</p>

                <p><b>Waktu Input:</b> ${waktu}</p>

                <p><b>Jumlah Item:</b> ${item.items ? item.items.length : 0}</p>

                <button onclick="bukaData(${index})">
                    BUKA DATA
                </button>

            </div>
        `;
    });

    list.innerHTML = html;
}

// =====================================
// FILTER TANGGAL
// =====================================
function filterHistory() {

    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    const history = getHistoryData();

    if (!start || !end) {
        tampilNotif("Pilih tanggal mulai dan akhir", "error");
        return;
    }

    const filtered = history.filter(item => {

        if (!item.tanggal) return false;

        return item.tanggal >= start && item.tanggal <= end;
    });

    renderHistory(filtered);

    tampilNotif("Filter berhasil", "success");
}

// =====================================
// RESET FILTER
// =====================================
function resetFilter() {

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    renderHistory();

    tampilNotif("Filter direset", "success");
}

// =====================================
// BUKA DETAIL DATA
// =====================================
function bukaData(index) {

    const history = getHistoryData();

    if (!history[index]) {
        tampilNotif("Data tidak ditemukan", "error");
        return;
    }

    localStorage.setItem(
        "selectedHistory",
        JSON.stringify(history[index])
    );

    window.location.href = "detail_history.html";
}

// =====================================
// NOTIFIKASI
// =====================================
function tampilNotif(pesan, type = "success") {

    let notif = document.getElementById("notif");
    if (!notif) return;

    notif.className = "notif " + type;
    notif.innerText = pesan;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}
