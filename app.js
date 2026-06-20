function getCurrentTimestamp() {
    const now = new Date();

    return now.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

window.mulaiInput = function () {

    const operator = document.getElementById("operator")?.value.trim();
    const kategori = document.getElementById("kategori")?.value;
    const type = document.getElementById("type")?.value;
    const tanggal = document.getElementById("tanggal")?.value;

    if (!operator || !kategori || !type || !tanggal) {
        return; // silent validation
    }

    // 🔥 INI WAKTU REALTIME SAAT CLICK
    const timestamp = getCurrentTimestamp();

    let historyStock = JSON.parse(localStorage.getItem("historyStock")) || [];

    historyStock.push({
        id: Date.now(),              // penting untuk tracking unik
        operator,
        kategori,
        type,
        tanggal,
        timestamp,                  // 🔥 INI WAJIB
        items: []
    });

    localStorage.setItem("historyStock", JSON.stringify(historyStock));

    localStorage.setItem("activeStock", JSON.stringify({
        operator,
        kategori,
        type,
        tanggal,
        timestamp
    }));

    window.location.href = "input.html";
};
