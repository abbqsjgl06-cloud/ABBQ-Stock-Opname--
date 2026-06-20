document.addEventListener("DOMContentLoaded", () => {
    const tanggalEl = document.getElementById("tanggal");

    // Set tanggal hari ini otomatis
    if (tanggalEl) {
        tanggalEl.valueAsDate = new Date();
    }
});

/**
 * FORMAT TIMESTAMP (tanggal + jam)
 */
function getCurrentTimestamp() {
    return new Date().toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

/**
 * MULAI INPUT STOCK OPNAME
 */
function mulaiInput() {

    const kategoriEl = document.getElementById("kategori");
    const typeEl = document.getElementById("type");
    const tanggalEl = document.getElementById("tanggal");
    const operatorEl = document.getElementById("operator");

    const kategori = kategoriEl?.value.trim() || "";
    const type = typeEl?.value.trim() || "";
    const tanggal = tanggalEl?.value || "";
    const operator = operatorEl?.value.trim() || "";

    // VALIDASI WAJIB
    if (!operator || !kategori || !type || !tanggal) {
        alert("PIC (Operator), Kategori, Type, dan Tanggal wajib diisi!");
        return;
    }

    const timestamp = getCurrentTimestamp();

    // SIMPAN SESSION (untuk halaman input)
    localStorage.setItem("operator", operator);
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);
    localStorage.setItem("created_at", timestamp);

    // HISTORY / AUDIT TRAIL
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push({
        action: "mulai input stock opname",
        operator: operator,
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        timestamp: timestamp
    });

    localStorage.setItem("history", JSON.stringify(history));

    // LANJUT KE HALAMAN INPUT
    window.location.href = "input.html";
}
