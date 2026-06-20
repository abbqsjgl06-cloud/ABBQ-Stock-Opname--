function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getCurrentDateTime() {
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

/**
 * MAIN FUNCTION (HARUS GLOBAL)
 */
window.mulaiInput = function () {

    const operator = document.getElementById("operator")?.value?.trim() || "";
    const kategori = document.getElementById("kategori")?.value || "";
    const type = document.getElementById("type")?.value || "";
    const tanggal = document.getElementById("tanggal")?.value || "";

    // validasi wajib isi
    if (!operator || !kategori || !type || !tanggal) {
        return; // silent validation
    }

    // 🔥 waktu realtime saat klik SIMPAN
    const timeNow = getCurrentTime();
    const fullTimestamp = getCurrentDateTime();

    let historyStock = JSON.parse(localStorage.getItem("historyStock")) || [];

    historyStock.push({
        id: Date.now(),

        operator: operator,     // PIC
        kategori: kategori,
        type: type,
        tanggal: tanggal,

        // 🔥 TIME FIELDS (FIX UTAMA)
        time: timeNow,
        timestamp: fullTimestamp,

        items: []
    });

    localStorage.setItem("historyStock", JSON.stringify(historyStock));

    // session aktif stock opname
    localStorage.setItem("activeStock", JSON.stringify({
        operator,
        kategori,
        type,
        tanggal,
        time: timeNow,
        timestamp: fullTimestamp
    }));

    window.location.href = "input.html";
};
