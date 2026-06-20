document.addEventListener("DOMContentLoaded", () => {
    const tanggalEl = document.getElementById("tanggal");

    // set tanggal hari ini otomatis
    if (tanggalEl) {
        tanggalEl.valueAsDate = new Date();
    }
});

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

function mulaiInput() {
    const kategoriEl = document.getElementById("kategori");
    const typeEl = document.getElementById("type");
    const tanggalEl = document.getElementById("tanggal");

    const kategori = kategoriEl?.value || "";
    const type = typeEl?.value || "";
    const tanggal = tanggalEl?.value || "";

    // VALIDASI (penting untuk stock opname)
    if (!kategori || !type || !tanggal) {
        alert("Kategori, Type, dan Tanggal wajib diisi!");
        return;
    }

    // simpan ke localStorage
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);

    // tambahan untuk tracing (RECOMMENDED)
    localStorage.setItem("created_at", getCurrentTimestamp());

    // optional: log aktivitas awal
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push({
        action: "mulai input stock opname",
        kategori,
        type,
        tanggal,
        timestamp: getCurrentTimestamp()
    });

    localStorage.setItem("history", JSON.stringify(history));

    // redirect
    window.location.href = "input.html";
}
