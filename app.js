function initTanggal() {
    const tanggalEl = document.getElementById("tanggal");

    if (tanggalEl) {
        tanggalEl.valueAsDate = new Date();
    }
}

document.addEventListener("DOMContentLoaded", initTanggal);

/**
 * FORMAT WAKTU
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
 * helper error border
 */
function setError(el, isError) {
    if (!el) return;
    el.style.border = isError ? "2px solid red" : "";
}

/**
 * MAIN FUNCTION (HARUS GLOBAL)
 */
window.mulaiInput = function () {

    const operatorEl = document.getElementById("operator");
    const kategoriEl = document.getElementById("kategori");
    const typeEl = document.getElementById("type");
    const tanggalEl = document.getElementById("tanggal");

    const operator = operatorEl?.value.trim() || "";
    const kategori = kategoriEl?.value.trim() || "";
    const type = typeEl?.value.trim() || "";
    const tanggal = tanggalEl?.value || "";

    // reset error
    setError(operatorEl, false);
    setError(kategoriEl, false);
    setError(typeEl, false);
    setError(tanggalEl, false);

    let hasError = false;

    if (!operator) { setError(operatorEl, true); hasError = true; }
    if (!kategori) { setError(kategoriEl, true); hasError = true; }
    if (!type) { setError(typeEl, true); hasError = true; }
    if (!tanggal) { setError(tanggalEl, true); hasError = true; }

    if (hasError) return;

    const timestamp = getCurrentTimestamp();

    localStorage.setItem("operator", operator);
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);
    localStorage.setItem("created_at", timestamp);

    let history = JSON.parse(localStorage.getItem("historyStock")) || [];

    history.push({
        operator,
        kategori,
        type,
        tanggal,
        timestamp,
        items: []
    });

    localStorage.setItem("historyStock", JSON.stringify(history));

    window.location.href = "input.html";
};
