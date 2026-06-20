document.addEventListener("DOMContentLoaded", () => {
    const tanggalEl = document.getElementById("tanggal");

    // Set tanggal otomatis hari ini
    if (tanggalEl) {
        tanggalEl.valueAsDate = new Date();
    }
});

/**
 * FORMAT WAKTU LENGKAP (ID Locale)
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
 * helper: highlight error field
 */
function setError(el, isError) {
    if (!el) return;

    if (isError) {
        el.style.border = "2px solid red";
    } else {
        el.style.border = "";
    }
}

/**
 * MAIN FUNCTION
 */
function mulaiInput() {

    const operatorEl = document.getElementById("operator");
    const kategoriEl = document.getElementById("kategori");
    const typeEl = document.getElementById("type");
    const tanggalEl = document.getElementById("tanggal");

    const operator = operatorEl?.value.trim() || "";
    const kategori = kategoriEl?.value.trim() || "";
    const type = typeEl?.value.trim() || "";
    const tanggal = tanggalEl?.value || "";

    // reset error state
    setError(operatorEl, false);
    setError(kategoriEl, false);
    setError(typeEl, false);
    setError(tanggalEl, false);

    let hasError = false;

    // VALIDASI SILENT (tanpa alert)
    if (!operator) {
        setError(operatorEl, true);
        hasError = true;
    }

    if (!kategori) {
        setError(kategoriEl, true);
        hasError = true;
    }

    if (!type) {
        setError(typeEl, true);
        hasError = true;
    }

    if (!tanggal) {
        setError(tanggalEl, true);
        hasError = true;
    }

    // stop jika ada error
    if (hasError) return;

    const timestamp = getCurrentTimestamp();

    // simpan session
    localStorage.setItem("operator", operator);
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);
    localStorage.setItem("created_at", timestamp);

    // history / audit trail
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

    // redirect
    window.location.href = "input.html";
}
